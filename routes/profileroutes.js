const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../config/db'); 

// ==========================================
// 1. GET ALL PROFILES (For History Sidebar)
// ==========================================
router.get('/profiles', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM profiles ORDER BY created_at DESC');
        return res.status(200).json(rows);
    } catch (error) {
        console.error("Fetch history system error:", error.message);
        return res.status(500).json({ success: false, message: "Failed to read database records." });
    }
});

// ==========================================
// 2. GET SINGLE CACHED PROFILE BY USERNAME
// ==========================================
router.get('/profiles/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM profiles WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Profile entry not found in database registry." });
        }
        return res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Database read timeout error." });
    }
});

// ==========================================
// 3. POST ANALYZE WITH WEIGHTED RANK ALGORITHM & CACHE
// ==========================================
router.post('/analyze/:username', async (req, res) => {
    const { username } = req.params;

    try {
        // 1. Check if the user profile already exists inside local MySQL tables
        const [existingUser] = await db.execute('SELECT * FROM profiles WHERE username = ?', [username]);

        if (existingUser.length > 0) {
            const cachedProfile = existingUser[0];
            const lastUpdated = new Date(cachedProfile.updated_at || cachedProfile.created_at);
            const timeDifferenceMinutes = (new Date() - lastUpdated) / (1000 * 60);

            // Bypasses external API networks if data is fresh (under 15 minutes)
            if (timeDifferenceMinutes < 15) {
                console.log(`⚡ [Cache Hit] Serving cached score metrics for @${username}.`);
                return res.status(200).json({ success: true, data: cachedProfile });
            }
            console.log(`⏱️ [Cache Expired] Stale data found for @${username}. Re-fetching...`);
        } else {
            console.log(`🔍 [Cache Miss] No records found for @${username}. Initiating live stream...`);
        }

        // 2. Fallthrough/Cache Miss: Fetch fresh metrics from live GitHub API
        const gitHubResponse = await axios.get(`https://api.github.com/users/${username}`);
        const data = gitHubResponse.data;

        const reposResponse = await axios.get(data.repos_url);
        const repos = reposResponse.data;

        let totalStars = 0;
        let languages = new Set();

        repos.forEach(repo => {
            totalStars += repo.stargazers_count;
            if (repo.language) languages.add(repo.language);
        });

        const topLanguages = Array.from(languages).slice(0, 3).join(', ') || 'None';

        // 3. Process database record adjustments mutations
        if (existingUser.length > 0) {
            await db.execute(
                `UPDATE profiles 
                 SET name = ?, bio = ?, public_repos = ?, followers = ?, following = ?, total_stars = ?, top_languages = ?, updated_at = NOW() 
                 WHERE username = ?`,
                [data.name, data.bio, data.public_repos, data.followers, data.following, totalStars, topLanguages, username]
            );
        } else {
            await db.execute(
                `INSERT INTO profiles (username, name, bio, public_repos, followers, following, total_stars, top_languages) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [username, data.name, data.bio, data.public_repos, data.followers, data.following, totalStars, topLanguages]
            );
        }

        const [updatedUser] = await db.execute('SELECT * FROM profiles WHERE username = ?', [username]);
        return res.status(200).json({ success: true, data: updatedUser[0] });

    } catch (error) {
        console.error("Pipeline failure event triggered:", error.message);
        return res.status(500).json({ success: false, message: "System core routing algorithm timeout error." });
    }
});

// ==========================================
// 4. DELETE PROFILE ARCHIVE REGISTER
// ==========================================
router.delete('/profiles/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const [result] = await db.execute('DELETE FROM profiles WHERE username = ?', [username]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Profile execution parameter not found in local MySQL records." });
        }
        console.log(`🗑️ [Database Sync] Successfully purged @${username} from MySQL core layers.`);
        return res.status(200).json({ success: true, message: `Profile @${username} completely cleared from storage cache.` });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal database pipeline clearing constraint failure." });
    }
});

module.exports = router;
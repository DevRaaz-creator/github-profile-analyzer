const pool = require('../config/db');
const axios = require('axios');

const githubApi = axios.create({
    baseURL: 'https://api.github.com',
    headers: process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {}
});

// POST: Analyze profile and save
exports.analyzeProfile = async (req, res) => {
    const { username } = req.params;
    try {
        const userResponse = await githubApi.get(`/users/${username}`);
        const reposResponse = await githubApi.get(`/users/${username}/repos?per_page=100`);

        const profileData = userResponse.data;
        const reposData = reposResponse.data;

        let totalStars = 0;
        const languagesCount = {};

        reposData.forEach(repo => {
            totalStars += repo.stargazers_count;
            if (repo.language) {
                languagesCount[repo.language] = (languagesCount[repo.language] || 0) + 1;
            }
        });

        const topLanguages = Object.keys(languagesCount)
            .sort((a, b) => languagesCount[b] - languagesCount[a])
            .slice(0, 3)
            .join(', ');

        const insights = {
            username: profileData.login,
            name: profileData.name || null,
            bio: profileData.bio || null,
            public_repos: profileData.public_repos,
            followers: profileData.followers,
            following: profileData.following,
            total_stars: totalStars,
            top_languages: topLanguages || 'None'
        };

        const query = `
            INSERT INTO github_profiles (username, name, bio, public_repos, followers, following, total_stars, top_languages)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                name = VALUES(name), bio = VALUES(bio), public_repos = VALUES(public_repos),
                followers = VALUES(followers), following = VALUES(following),
                total_stars = VALUES(total_stars), top_languages = VALUES(top_languages);
        `;

        await pool.query(query, [
            insights.username, insights.name, insights.bio, insights.public_repos,
            insights.followers, insights.following, insights.total_stars, insights.top_languages
        ]);

        res.status(200).json({ message: "Profile successfully analyzed.", data: insights });
    } catch (error) {
        if (error.response && error.response.status === 404) return res.status(404).json({ error: "User not found." });
        res.status(500).json({ error: "Internal server error." });
    }
};

// GET: Fetch all profiles
exports.getAllProfiles = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM github_profiles ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
};

// GET: Fetch single profile
exports.getProfileByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM github_profiles WHERE username = ?', [username]);
        if (rows.length === 0) return res.status(404).json({ error: "Profile not found in database." });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
};
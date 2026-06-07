# GitHub Profile Analyzer API

A modular Node.js and Express.js backend application that fetches user insights via the public GitHub API and caches them securely inside a MySQL database.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (XAMPP)

## Features Built
- `POST /api/analyze/:username` - Fetches live data from GitHub, calculates custom metrics, and stores/updates records.
- `GET /api/profiles` - Returns an array list of all previously analyzed profiles cached in the database.
- `GET /api/profiles/:username` - Retrieves database record metrics for a single specific user.

## Local Installation Setup
1. Clone the repository or download the source files.
2. Open your terminal in the root folder and run:
```bash
   npm install

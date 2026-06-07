<div align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman" />
  <img src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge" alt="Build Status" />
</div>

---
# 📊 GitHub Profile Insights Dashboard

A full-stack DevOps data pipeline built with Node.js, Express, and a local MySQL archiving engine. This application queries live developer metrics using the upstream GitHub API, implements an optimized time-based caching matrix, evaluates runtime profiles using a custom algorithmic capability formula, and delivers a sleek, responsive administrative dashboard interface.

---

## ⚡ Core Engineering Features

* **Interactive Search History Sidebar:** Automatically renders a dynamic layout panel capturing your database tracking registry logs, allowing instant local record lookups with zero network latency.
* **Smart 15-Minute Cache Optimization Layer:** Bypasses live external network stream overhead entirely if a profile search is executed within 15 minutes of its last database sync, dramatically reducing API rate-limiting constraints.
* **Algorithmic Capability Scoring Matrix:** Runs a backend mathematical extraction that processes profile metrics into a weighted competency score and assigns distinct developer rank badges.
* **Archive Data Purge Mechanism:** Implements a direct RESTful `DELETE` request routing module enabling permanent row clearing operations straight from the user interface.

---

## 📐 Algorithmic Scoring Weighting Formula

Every profile handled by the core analytical data pipeline is evaluated through the following algorithmic matrix logic:

$$\text{Rank Score} = (\text{Public Repositories} \times 2) + (\text{Followers} \times 5) + (\text{Total Stars} \times 10)$$

Based on the numerical extraction product, accounts are mapped dynamically into these engineering tier classifications:
* **Score < 10:** `Junior Contributor`
* **Score 10 - 49:** `Advanced Full-Stack Engineer`
* **Score 50 - 199:** `Polymath Core Architect`
* **Score ≥ 200:** `Elite Legendary Developer 👑`

---

## 🛠️ Technology Stack & Architecture

* **Frontend Layout Workspace:** HTML5, Tailwind CSS, FontAwesome Icon Framework, Vanilla JavaScript Fetch Streams.
* **Backend Runtime Core:** Node.js, Express.js Router Architecture, Axios Pipeline Stream Layers.
* **Database Relational Storage Layer:** MySQL (XAMPP Client Instance Engine Wrapper), `mysql2/promise` Pool Registries.

---

## 💾 Database Schema Structural Configuration

Execute this layout execution sequence within your MySQL query analyzer workspace tab to initialize the caching schema data rows:

```sql
CREATE TABLE IF NOT EXISTS profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(150),
    bio TEXT,
    public_repos INT DEFAULT 0,
    followers INT DEFAULT 0,
    following INT DEFAULT 0,
    total_stars INT DEFAULT 0,
    top_languages VARCHAR(255) DEFAULT 'None',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

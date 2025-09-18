# Queue API

A lightweight Node.js/Express API demonstrating **background job processing** with [BullMQ](https://docs.bullmq.io/) and Redis.  
Ideal for tasks such as email notifications, image processing, or any workload you don’t want to block HTTP requests.

---

## ✨ Features
- Queue-based job scheduling with **BullMQ**.
- Redis-backed storage for reliability and horizontal scalability.
- REST endpoints to create, list, and monitor jobs.
- Configurable concurrency, retries, and delayed jobs.
- Optional dashboard integration using [bull-board](https://github.com/felixmosh/bull-board).

---

## 🛠 Tech Stack
- **Node.js** 22+
- **Express.js**
- **BullMQ**
- **Redis**

---

## 🚀 Getting Started

### Prerequisites
- Node.js 22 or higher
- Redis server (local or remote)

### Installation
```bash
git clone https://github.com/Smejia11/QueueApi.git
cd QueueApi
npm install
cp .env.example .env    # set your Redis connection string if needed
npm run dev
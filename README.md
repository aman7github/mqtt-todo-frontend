

📋 MQTT Todo App
This is a real-time Todo List application powered by MQTT, Redis, MongoDB, and React. It allows users to add tasks to a Todo list which are processed and stored efficiently using pub/sub architecture and in-memory caching.

Features
1. Real-time task addition using MQTT protocol.

2. Tasks are first stored in Redis (in-memory cache).

3. Once Redis stores more than 50 tasks, they are automatically:

a. Saved into MongoDB (assignment DB, assignment_aman collection).

b. Deleted from Redis (to clear space).

4. Tasks are fetched from both Redis and MongoDB, and shown in the frontend Todo list.

5. React-based frontend allows:

Adding new tasks-

Viewing combined task list from Redis and MongoDB

 Continues this batch-based syncing process for optimized performance.

🛠 Tech Stack
Frontend: React (for UI & input handling)

Backend: Node.js with Express.js

MQTT – for real-time messaging

Redis – fast, temporary in-memory storage

MongoDB – long-term persistent database (Cloud: MongoDB Atlas)

📦 How It Works
User adds a task via the React frontend.

Task is published to an MQTT topic.

Backend MQTT client receives the task and stores it in Redis.

When Redis task list exceeds 50:

Tasks are moved to MongoDB

Redis is cleared

The frontend fetches and displays tasks from both Redis and MongoDB.

📸 Screenshots to Submit

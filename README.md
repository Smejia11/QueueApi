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
```
### Example:
 #Post: localhost:9091/api/v1/bgtask/
```bash
curl -X POST http://localhost:9091/api/v1/bg-tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
        "queue": "testQueue",
        "taskName": "sendWelcomeEmail",
        "data": {
          "to": "user@example.com",
          "subject": "Welcome!"
        },
        "priority": 1,
        "delay": 0,
        "idempotencyKey": "a1b2c3-unique-request-id"
      }'
```
<img width="864" height="720" alt="image" src="https://github.com/user-attachments/assets/afecc0f8-8af1-4d79-854e-5ee25d9946fb" />

### Example POST Request Log

This is an example log showing a POST request to enqueue a job in the queue.

```json
{
  "INFO": 2908,
  "request": {
    "id": "1294236d-31c8-47d2-ba35-1222cf19f3c7",
    "method": "POST",
    "url": "/api/v1/bgtask/",
    "query": {},
    "params": {},
    "headers": {
      "content-type": "application/json",
      "user-agent": "PostmanRuntime/7.46.1",
      "accept": "*/*",
      "host": "localhost:9091",
      "accept-encoding": "gzip, deflate, br",
      "connection": "keep-alive",
      "content-length": "127"
    },
    "remoteAddress": "::1",
    "remotePort": 60974,
    "body": {
      "queue": "testQueue",
      "taskName": "sendWelcomeEmail",
      "data": {
        "to": "user@example.com",
        "subject": "Welcome!"
      }
    }
  },
  "response": {
    "statusCode": 200,
    "headers": {
      "content-type": "application/json; charset=utf-8",
      "x-request-id": "1294236d-31c8-47d2-ba35-1222cf19f3c7",
      "x-response-time": "4500.561ms"
    }
  },
  "timeTaken": 4501
}
```

#Get: !info status queue
```bash
curl -X GET \
  http://localhost:9091/api/v1/bgtask/1/testQueue/sendWelcomeEmail \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>"
```
<img width="861" height="759" alt="image" src="https://github.com/user-attachments/assets/93ffa57b-77db-421f-b114-75a5c82c96f3" />

> ⚠️ **Important Note:**  
> When creating a worker in your code, make sure the queue name matches the `"queue"` value sent in the request.

**Request Example:**
```json
{
  "queue": "testQueue",
  "taskName": "sendWelcomeEmail",
  "data": { 
    "to": "user@example.com", 
    "subject": "Welcome!" 
  }
}
```
```ts
import { Worker } from 'bullmq';
import { connection, workerTest } from './config';

new Worker('testQueue', workerTest, { connection, concurrency: 5 });
```
### Test
<img width="587" height="187" alt="image" src="https://github.com/user-attachments/assets/918185c7-b9e3-41ee-815e-02e7615216a1" />


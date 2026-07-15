# Game Waitlist Portal 🎮

A clean, high-contrast digital waitlist system built to replace manual paper logging and clunky spreadsheets[cite: 1]. It handles real-time player queues securely, with a fully responsive frontend and a solid Express-based backend[cite: 1].

I designed this with a retro-corporate, strictly monochromatic interface (only blacks, whites, and `#f5f5f5` grays) to keep things ultra-clean and distraction-free[cite: 1].

---

## 🔗 Project Links
* **Live App:** [game-waitlist-crud-system.vercel.app](https://game-waitlist-crud-system.vercel.app/)
* **Code Repository:** [github.com/vandanamahant/game-waitlist-crud-system](https://github.com/vandanamahant/game-waitlist-crud-system)

---

## 🛠️ Tech Behind the Project
* **Backend:** Node.js & Express.js (REST API architecture)[cite: 1]
* **Frontend:** Clean Vanilla JavaScript, Semantic HTML5, and Custom CSS (using strict CSS variables)[cite: 1]
* **Hosting:** Vercel (Deployed as serverless functions)[cite: 1]

---

## 🔥 Key Highlights

### ⚡ Smart Edge Case Handling
* **Zero-State Message:** If there are no players left in the waitlist, the UI dynamically displays a clear `"No data found"` message instead of just showing an awkward blank screen[cite: 1].
* **Connection-Friendly UI:** Designed to handle slow 3G networks smoothly with clear visual states during any asynchronous fetch requests[cite: 1].
* **Strict Validation:** No empty inputs allowed. If you try to submit blank fields, the system blocks the action and immediately highlights the offending text inputs in a high-contrast red border[cite: 1].

### 🔒 Security & Telemetry
* **XSS Sanitization:** The server sanitizes every single input before pushing it into the queue array, shielding the backend from malicious HTML/JS injection[cite: 1].
* **Analytics Logging:** Includes active console telemetry that logs exact tracking messages (`[Analytics] User Interacted with...`) whenever a user is added or removed from the system[cite: 1].

---

## 🔌 API Endpoints Reference

This backend speaks standard REST and communicates strictly via JSON payloads[cite: 1]:

* `GET /waitlist` - Pulls the current waitlist queue (returns a list of players or an empty state message)[cite: 1].
* `POST /waitlist` - Adds a new gamer. Expects JSON: `{ "name": "...", "game": "..." }`[cite: 1].
* `DELETE /waitlist/:id` - Removes a player instantly using their unique ID as a route parameter[cite: 1].

---

## 🚀 How to Spin It Up Locally

Want to run this on your local machine? Just follow these simple steps:

1. **Clone this repository:**
   ```bash
   git clone [https://github.com/vandanamahant/game-waitlist-crud-system.git](https://github.com/vandanamahant/game-waitlist-crud-system.git)
   cd game-waitlist-backend
# Game Waitlist Portal 🎮

A clean, high-contrast digital waitlist system built to replace manual paper logging and clunky spreadsheets. It handles real-time player queues securely, with a fully responsive frontend and a solid Express-based backend.

I designed this with a retro-corporate, strictly monochromatic interface (only blacks, whites, and `#f5f5f5` grays) to keep things ultra-clean and distraction-free.

---

## 🔗 Project Links
* **Live App:** [game-waitlist-crud-system.vercel.app](https://game-waitlist-crud-system.vercel.app/)
* **Code Repository:** [github.com/vandanamahant/game-waitlist-crud-system](https://github.com/vandanamahant/game-waitlist-crud-system)

---

## 🛠️ Tech Behind the Project
* **Backend:** Node.js & Express.js (REST API architecture)
* **Frontend:** Clean Vanilla JavaScript, Semantic HTML5, and Custom CSS (using strict CSS variables)
* **Hosting:** Vercel (Deployed as serverless functions)

---

## 🔥 Key Highlights

### ⚡ Smart Edge Case Handling
* **Zero-State Message:** If there are no players left in the waitlist, the UI dynamically displays a clear `"No data found"` message instead of just showing an awkward blank screen.
* **Connection-Friendly UI:** Designed to handle slow 3G networks smoothly with clear visual states during any asynchronous fetch requests.
* **Strict Validation:** No empty inputs allowed. If you try to submit blank fields, the system blocks the action and immediately highlights the offending text inputs in a high-contrast red border.

### 🔒 Security & Telemetry
* **XSS Sanitization:** The server sanitizes every single input before pushing it into the queue array, shielding the backend from malicious HTML/JS injection.
* **Analytics Logging:** Includes active console telemetry that logs exact tracking messages (`[Analytics] User Interacted with...`) whenever a user is added or removed from the system.

---

## 🔌 API Endpoints Reference

This backend speaks standard REST and communicates strictly via JSON payloads:

* `GET /waitlist` - Pulls the current waitlist queue (returns a list of players or an empty state message).
* `POST /waitlist` - Adds a new gamer. Expects JSON: `{ "name": "...", "game": "..." }`.
* `DELETE /waitlist/:id` - Removes a player instantly using their unique ID as a route parameter.

---

## 🚀 How to Spin It Up Locally

Want to run this on your local machine? Just follow these simple steps:

1. **Clone this repository:**
   ```bash
   git clone [https://github.com/vandanamahant/game-waitlist-crud-system.git](https://github.com/vandanamahant/game-waitlist-crud-system.git)
   cd game-waitlist-backend
TapEZ (Tapcart)

Tap-to-Shop Retail Experience with NFC + Mobile App + Backend API

TapEZ (codename Tapcart) is a smart retail system that combines a React Native mobile app with a backend service to enable seamless Tap-to-Shop functionality. Customers can tap an NFC card/device to instantly add products to their cart, checkout via the app, and sync purchases with the backend for real-time inventory and billing.

📌 Repository Structure & Branches

This repo is organized into multiple branches:

main → Stable codebase (production-ready).

frontend → React Native mobile app (iOS + Android).

backend → Backend API & database logic.

Merge → Integration branch for combining frontend & backend changes.

🚀 Features

📱 Frontend (React Native)

Browse products & add to cart

Checkout with “Pay Now”

Cart management via Context API

Navigation with React Navigation

NFC integration (planned)

⚡ Backend (Node.js/Express or similar)

REST API for product catalog & cart sync

User authentication & session management

Order & payment handling

Database integration (MongoDB/Postgres depending on config)

📂 Project Structure
tapcart/
│── frontend/        # React Native app
│   ├── App.js
│   ├── screens/
│   ├── navigation/
│   ├── context/
│   └── package.json
│
│── backend/         # Backend API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── server.js
│   └── package.json
│
└── README.md        # Master documentation

🛠️ Tech Stack

Frontend: React Native, React Navigation, Context API

Backend: Node.js, Express.js, MongoDB/Postgres

Integration: REST API

Other: NFC hardware integration, Payment Gateway

⚡ Setup & Installation
1️⃣ Clone the repo
git clone https://github.com/Jaswanth-K1210/tapcart.git
cd tapcart

2️⃣ Setup Frontend (React Native app)
git checkout frontend
cd frontend

# Install dependencies
npm install

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android

3️⃣ Setup Backend (API server)
git checkout backend
cd backend

# Install dependencies
npm install

# Start server
npm run dev   # or node src/server.js

4️⃣ Run Together

Start backend first (backend/) → runs API on http://localhost:5000 (configurable).

Start frontend (frontend/) → connects to backend API.

🔄 Development Workflow

Create feature branches off frontend or backend.

Open Pull Requests into Merge branch for integration testing.

Merge tested changes into main.

📌 Roadmap

 NFC reader hardware integration

 Payment gateway (UPI / Stripe / Razorpay)

 Push notifications for orders

 Admin dashboard for inventory management

🤝 Contributing

Fork the repo

Create a new branch (feature/my-feature)

Commit changes

Open a Pull Request

📄 License

This project is licensed under the MIT License.

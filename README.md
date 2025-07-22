# TapEZ - Smart Tap-to-Shop Application

A full-stack mobile application that combines NFC technology with e-commerce for seamless shopping experiences. Tap NFC-enabled products to instantly add them to your cart!

## 🏗️ Project Architecture

```
TapEZ/
├── backend/          # Node.js/Express API Server
├── frontend/         # React Native Mobile App
├── README.md         # Project Documentation
└── .gitignore        # Git ignore rules
```

## 🚀 Features

### 📱 **Mobile App (React Native)**
- **Product Browsing**: View products with real-time data from backend
- **NFC Integration**: Tap NFC tags to add products to cart
- **Authentication**: User registration and login with JWT tokens
- **Cart Management**: Add, update, remove items with quantity controls
- **Cross-Platform**: Works on both Android and iOS
- **Offline Support**: Guest mode with local cart functionality

### 🔧 **Backend API (Node.js/Express)**
- **RESTful API**: Complete CRUD operations for products, users, and cart
- **Authentication**: JWT-based user authentication and authorization
- **Database**: MongoDB Atlas integration with Mongoose ODM
- **Security**: CORS enabled, input validation, and secure password hashing
- **Real-time Data**: Live product catalog with 11+ products

### 🗄️ **Database (MongoDB Atlas)**
- **Products Collection**: Product catalog with pricing and details
- **Users Collection**: User accounts with authentication data
- **Cart Collection**: User shopping carts with item quantities

## 🛠️ Technology Stack

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, cors
- **Environment**: dotenv

### **Frontend**
- **Framework**: React Native 0.80
- **Language**: TypeScript
- **Navigation**: React Navigation v7
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **NFC**: react-native-nfc-manager
- **State Management**: React Context API

## 🚦 Getting Started

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- React Native development environment
- Android Studio (for Android) or Xcode (for iOS)

### **1. Clone Repository**
```bash
git clone https://github.com/Jaswanth-K1210/tapcart.git
cd tapcart
```

### **2. Backend Setup**
```bash
cd backend
npm install

# Create .env file with your credentials
echo "PORT=5000
MONGO_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development" > .env

# Start development server
npm run dev
```

### **3. Frontend Setup**
```bash
cd frontend
npm install

# For Android
npm run android

# For iOS (macOS only)
npm run ios
```

## 📡 API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### **Products**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/nfc/:nfcTag` - Get product by NFC tag
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### **Cart**
- `GET /api/cart` - Get user's cart (requires auth)
- `POST /api/cart/add` - Add item to cart (requires auth)
- `PUT /api/cart/update` - Update cart item quantity (requires auth)
- `DELETE /api/cart/remove/:productId` - Remove item from cart (requires auth)
- `DELETE /api/cart/clear` - Clear entire cart (requires auth)

## 📱 App Screens

### **Core Screens**
- **HomeScreen**: Product catalog with add-to-cart functionality
- **CartScreen**: Shopping cart management with quantity controls
- **TapScreen**: NFC scanning interface for tap-to-shop
- **CheckoutScreen**: Order processing and payment
- **AuthScreen**: User registration and login

### **Navigation Flow**
```
Home ↔ Cart ↔ Checkout → Success
  ↓
 Tap (NFC Scanning)
  ↓
Auth (Login/Register)
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **CORS Protection**: Configured for React Native platforms
- **Input Validation**: Server-side validation for all inputs
- **Environment Variables**: Sensitive data stored in .env files

## 🌐 Network Configuration

### **Development URLs**
- **Backend API**: `http://localhost:5000`
- **Android Emulator**: `http://10.0.2.2:5000/api`
- **iOS Simulator**: `http://localhost:5000/api`

### **Production Deployment**
- Update API URLs in `frontend/config/api.ts`
- Configure environment variables for production
- Set up SSL certificates for HTTPS

## 📊 Project Status

### ✅ **Completed Features**
- Backend API with all endpoints
- Frontend mobile app with navigation
- User authentication system
- Product catalog integration
- Shopping cart functionality
- Cross-platform compatibility
- MongoDB Atlas integration

### 🚧 **In Development**
- NFC tag scanning implementation
- Payment gateway integration
- Push notifications
- Admin dashboard
- Order management system

### 📋 **Future Enhancements**
- Product search and filters
- User reviews and ratings
- Wishlist functionality
- Social login (Google, Facebook)
- Analytics and reporting
- Inventory management

## 🧪 Testing

### **Backend Testing**
```bash
cd backend
npm run dev

# Test API endpoints
curl http://localhost:5000/api/products
curl http://localhost:5000/api/auth/register -X POST -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

### **Frontend Testing**
```bash
cd frontend
npm start           # Start Metro bundler
npm run android     # Run on Android
npm run ios         # Run on iOS

# Check logs
npx react-native log-android
npx react-native log-ios
```

## 🔧 Development Commands

### **Backend**
```bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
```

### **Frontend**
```bash
npm start           # Start Metro bundler
npm run android     # Run on Android device/emulator
npm run ios         # Run on iOS device/simulator
npm run lint        # Run ESLint
```

## 🐛 Troubleshooting

### **Common Issues**
1. **MongoDB Connection**: Ensure MongoDB Atlas credentials are correct in `.env`
2. **Metro Bundler**: Clear cache with `npx react-native start --reset-cache`
3. **Android Build**: Ensure Android SDK and tools are properly installed
4. **CORS Errors**: Check API URLs in `frontend/config/api.ts`

### **Debug Commands**
```bash
# Check backend status
curl http://localhost:5000/

# Reset React Native cache
cd frontend && npx react-native start --reset-cache

# Clean Android build
cd frontend/android && ./gradlew clean
```

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Team

- **Backend Developer**: Node.js/Express API with MongoDB Atlas
- **Frontend Developer**: React Native mobile application
- **Integration**: Full-stack connection and deployment

## 📞 Support

For support, create an issue in the GitHub repository.

---

**TapEZ** - Making shopping as simple as a tap! 🛍️✨
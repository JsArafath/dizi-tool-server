# OfficialToolStore - Backend API

This is the backend server for **OfficialToolStore**, a modern digital product and subscription marketplace. The backend is built using Node.js, Express.js, and MongoDB, providing a robust API for user authentication, product management, cart operations, and reviews.

## 🚀 Technologies Used
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB & Mongoose**: NoSQL database and object data modeling (ODM) library for managing structured application data.
- **JSON Web Tokens (JWT)**: Secure authentication mechanism.
- **Bcrypt.js**: Password hashing for secure user credential storage.
- **CORS**: Cross-Origin Resource Sharing middleware.
- **Vercel**: Serverless deployment.

## 📂 Project Structure
```
DIgi Store Server/
├── models/             # Mongoose schemas (User, Product, Review, etc.)
├── routes/             # Express route controllers (authRoutes, productRoutes, etc.)
├── middleware/         # Custom middlewares (e.g., authMiddleware for JWT)
├── data/               # Legacy local JSON databases (pre-MongoDB migration)
├── server.js           # Application entry point and configuration
├── .env                # Environment variables (not committed)
└── package.json        # Dependencies and scripts
```

## ⚙️ Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173,https://officialtoolstore.com,https://www.officialtoolstore.com
```

## 🛠️ Installation & Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:5000` (or the port defined in `.env`).*

## 🔌 API Endpoints
### Authentication (`/api/auth`)
- `POST /login` - Authenticate user and return JWT.

### Products (`/api/products`)
- `GET /` - Fetch all available products.
- `POST /` - Add a new product (Admin Only).
- `PUT /:id` - Update a product (Admin Only).
- `DELETE /:id` - Delete a product (Admin Only).

### Reviews (`/api/reviews`)
- `GET /` - Fetch all reviews.
- `POST /` - Submit a new review (Authenticated Users).
- `DELETE /:id` - Delete a review (Admin Only).

## 🚀 Deployment
This server is optimized for serverless deployment on **Vercel**. 
The `vercel.json` file ensures that all API requests are appropriately routed to `server.js`. Ensure that all environment variables are added to your Vercel project settings before deploying.

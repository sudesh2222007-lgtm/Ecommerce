# MERN E-Commerce Deployment Guide

## Prerequisites
- MongoDB Atlas account (for cloud database)
- Git repository (GitHub, GitLab, etc.)
- Vercel account (for frontend)
- Railway or Render account (for backend)

## Step 1: Prepare Your Environment Variables

### Backend (.env)
Create `.env` in the `backend/` folder:
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=production
PORT=5000
```

### Frontend (.env.local)
Create `.env.local` in the `frontend/` folder:
```
VITE_API_URL=https://your-backend-url.com/api
```

## Step 2: Deploy Backend (Using Railway)

### 2.1 Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 2.2 Deploy on Railway
1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - Service name: `mern-ecommerce-backend`
   - Start command: `npm start`
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your secret key
   - `NODE_ENV`: production
6. Deploy

### 2.3 Get Your Backend URL
After deployment, Railway provides a public URL (e.g., `https://your-app.railway.app`)

## Step 3: Update Backend Configuration

Update `backend/server.js` to allow Vercel frontend:
```javascript
const cors = require('cors');

app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

## Step 4: Deploy Frontend (Using Vercel)

### 4.1 Prepare Frontend
1. Create `.env.local` in `frontend/` folder:
```
VITE_API_URL=https://your-railway-backend-url.railway.app/api
```

2. Update your API calls in `frontend/src/api/axios.js`:
```javascript
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});
```

### 4.2 Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Git Repository"
3. Select your repository
4. Framework: **Vite**
5. Build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `frontend` (if repo has both backend & frontend)
6. Add environment variables:
   - `VITE_API_URL`: Your Railway backend URL
7. Click Deploy

## Step 5: Post-Deployment Checklist

- [ ] Test login/authentication
- [ ] Test product fetching
- [ ] Test cart functionality
- [ ] Test checkout process
- [ ] Test order history
- [ ] Verify CORS is working
- [ ] Check database connections
- [ ] Test file uploads (if applicable)

## Step 6: Custom Domain (Optional)

### Add Domain to Vercel
1. In Vercel project settings
2. Go to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Add Domain to Railway
1. In Railway project settings
2. Add custom domain for API

## Troubleshooting

### CORS Errors
- Check backend CORS configuration
- Ensure frontend URL is whitelisted in backend

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes Railway/your server IP
- Check connection string format

### API Not Responding
- Verify backend is running on Railway
- Check environment variables are set correctly
- Review Railway logs for errors

## Environment Variables Reference

| Variable | Backend | Frontend | Purpose |
|----------|---------|----------|---------|
| `MONGO_URI` | ✓ | | MongoDB connection string |
| `JWT_SECRET` | ✓ | | JWT token secret |
| `NODE_ENV` | ✓ | | production/development |
| `VITE_API_URL` | | ✓ | Backend API URL |

## Additional Resources
- [Railway Docs](https://railway.app/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

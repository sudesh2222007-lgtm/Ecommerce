# Quick Deployment Commands

## Prepare Your Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Push to GitHub
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Backend Deployment (Railway)

### 1. Link Railway to GitHub
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create new project
railway init
```

### 2. Set Environment Variables
```bash
# In Railway dashboard or via CLI:
railway variables set MONGO_URI="your_mongodb_atlas_uri"
railway variables set JWT_SECRET="your_jwt_secret"
railway variables set NODE_ENV="production"
railway variables set FRONTEND_URL="https://your-vercel-app.vercel.app"
```

### 3. Deploy
```bash
railway up
```

## Frontend Deployment (Vercel)

### 1. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2. Deploy via GitHub (Recommended)
- Go to https://vercel.com/new
- Select your GitHub repository
- Choose `frontend` as root directory
- Add environment variables:
  - `VITE_API_URL=https://your-railway-backend.railway.app/api`
- Click Deploy

### 3. Deploy via CLI
```bash
cd frontend
vercel --prod
```

## Local Development

### Setup Backend
```bash
cd backend
npm install
# Create .env file with development variables
npm start
```

### Setup Frontend
```bash
cd frontend
npm install
# Create .env.local file
npm run dev
```

## Useful Commands

### Check Railway Logs
```bash
railway logs
```

### Connect to Railway Database
```bash
railway connect postgres  # if using PostgreSQL
# or
railway connect mongodb   # if using MongoDB
```

### Redeploy on Railway
```bash
railway up
```

### Preview Vercel Deployment
```bash
vercel --prod
```

### Check Vercel Logs
Go to your project dashboard in https://vercel.com and view the logs

## Troubleshooting Commands

### Clear Frontend Build Cache
```bash
cd frontend
rm -rf dist node_modules
npm install
npm run build
```

### Test API Locally
```bash
# Make sure backend is running
curl http://localhost:5000/api/

# Or use this to get a specific endpoint
curl http://localhost:5000/api/products
```

### Verify Environment Variables (Backend)
```bash
# In Railway CLI
railway variables
```

### Reset Vercel Deployment
```bash
vercel --prod --force
```

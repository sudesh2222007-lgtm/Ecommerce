# Deployment Checklist

## Before Deployment

### Backend Setup
- [ ] Create `.env` file with all required variables
- [ ] Test locally: `npm start`
- [ ] Ensure MongoDB Atlas is accessible
- [ ] Add server IP to MongoDB Atlas whitelist (if using IP restriction)
- [ ] Push code to GitHub

### Frontend Setup
- [ ] Create `.env.local` with backend API URL
- [ ] Test locally: `npm run dev`
- [ ] Build test: `npm run build`
- [ ] Verify build succeeds

### Security
- [ ] Set strong JWT_SECRET
- [ ] Never commit `.env` files
- [ ] Verify `.gitignore` includes `.env` files
- [ ] Update CORS allowed origins for production

## Deployment Steps

### Step 1: Deploy Backend to Railway
1. [ ] Go to railway.app and sign in
2. [ ] Create new project from GitHub
3. [ ] Select your repository
4. [ ] Configure environment variables:
   - [ ] `MONGO_URI`
   - [ ] `JWT_SECRET`
   - [ ] `NODE_ENV=production`
   - [ ] `FRONTEND_URL` (your Vercel URL)
5. [ ] Deploy
6. [ ] Note the Railway URL (e.g., `your-app.railway.app`)

### Step 2: Deploy Frontend to Vercel
1. [ ] Go to vercel.com and sign in
2. [ ] Import your GitHub repository
3. [ ] Select `frontend` as root directory (if backend & frontend in same repo)
4. [ ] Build settings:
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `dist`
5. [ ] Set environment variables:
   - [ ] `VITE_API_URL=https://your-railway-url/api`
6. [ ] Deploy
7. [ ] Note the Vercel URL

### Step 3: Update Backend
1. [ ] Go back to Railway dashboard
2. [ ] Update `FRONTEND_URL` to your Vercel URL
3. [ ] Redeploy backend

## Post-Deployment Testing

### API Tests
- [ ] Health check: GET `/api/health` or similar
- [ ] Register new user
- [ ] Login
- [ ] View products
- [ ] Add to cart
- [ ] Checkout
- [ ] View order history

### Frontend Tests
- [ ] Pages load without errors
- [ ] Authentication works
- [ ] API calls succeed
- [ ] Check browser console for errors
- [ ] Test on mobile devices

### Monitoring
- [ ] Check Railway logs for errors
- [ ] Check Vercel build logs
- [ ] Monitor database connections
- [ ] Set up error tracking (optional: Sentry, LogRocket)

## Rollback Plan
- [ ] Keep previous deployment stable until new one verified
- [ ] Have database backups
- [ ] Document any data migrations

## Optional Improvements
- [ ] Add custom domain
- [ ] Set up CI/CD pipeline
- [ ] Add automated testing
- [ ] Set up error monitoring
- [ ] Enable database backups

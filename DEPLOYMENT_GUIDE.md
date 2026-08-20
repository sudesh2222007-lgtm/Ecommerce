# 🚀 MERN E-Commerce Deployment Guide

This guide walks you through deploying your MERN stack application step-by-step using **MongoDB Atlas** (Database), **Render** (Backend API), and **Vercel** (Frontend UI).

---

## 📌 Prerequisites Checklist
- [ ] A GitHub / GitLab account with your repository pushed.
- [ ] A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account.
- [ ] A free [Render](https://render.com/) account.
- [ ] A free [Vercel](https://vercel.com/) account.

---

## Step 1: Set Up MongoDB Atlas (Database)

1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a **Free Shared Cluster (M0)**.
3. **Database Access**: Create a database user with a **Username** and **Password** (save these!).
4. **Network Access**: Add `0.0.0.0/0` to allow connections from Render.
5. Click **Connect** -> **Drivers** -> Copy your Connection String.
   - It will look like:
     `mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/mern_ecommerce?retryWrites=true&w=majority`
   - *Replace `<username>` and `<password>` with your actual credentials!*

---

## Step 2: Deploy Backend to Render

1. Log in to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
2. Connect your GitHub repository containing `mern-ecommerce`.
3. Set the following configuration settings:
   - **Name**: `mern-ecommerce-api` (or any preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Under **Environment Variables**, add:
   - `MONGO_URI`: *Your MongoDB Atlas connection string from Step 1*
   - `JWT_SECRET`: *A strong random secret key*
   - `JWT_EXPIRES_IN`: `7d`
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: *Your Vercel URL (e.g., `https://your-app.vercel.app`) — you can update this after Step 3*
5. Click **Create Web Service**.
6. Once deployed, copy your backend URL (e.g., `https://mern-ecommerce-api.onrender.com`).

---

## Step 3: Deploy Frontend to Vercel

1. Log in to [Vercel](https://vercel.com/) and click **Add New...** -> **Project**.
2. Import your GitHub repository.
3. Configure the deployment settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click *Edit* and select `frontend`.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables** and add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://mern-ecommerce-api.onrender.com/api` *(replace with your Render backend URL from Step 2)*
5. Click **Deploy**.

---

## Step 4: Final Connection (CORS Update)

1. Copy your live Vercel frontend URL (e.g., `https://mern-ecommerce-frontend.vercel.app`).
2. Go back to your **Render Dashboard** -> **mern-ecommerce-api** -> **Environment**.
3. Update the `FRONTEND_URL` environment variable to match your live Vercel URL.
4. Save changes (Render will automatically redeploy).

---

## 🎯 Verification & Seeding

- Test opening your Vercel frontend URL in the browser.
- Try registering a user, browsing products, and adding items to cart!
- If you need to seed initial products into MongoDB Atlas, you can run from your local terminal:
  ```bash
  MONGO_URI="your-atlas-connection-string" node seeder.js
  ```

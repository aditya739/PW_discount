# Deployment Guide - PW Vouchers

## Backend Deployment (Render)

### 1. Create Render Account
- Go to [render.com](https://render.com) and sign up/login with GitHub

### 2. Deploy Backend
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `aditya739/PW_discount`
3. Configure:
   - **Name**: `pw-vouchers-backend` (or any name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `Backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://your-actual-connection-string
   JWT_SECRET=your-secret-key
   FRONTEND_URL=https://your-app.vercel.app
   ```
   ⚠️ **Important**: You'll update `FRONTEND_URL` after deploying frontend

5. Click **"Create Web Service"**
6. Wait for deployment (5-10 minutes)
7. **Copy your backend URL**: `https://pw-vouchers-backend.onrender.com`

---

## Frontend Deployment (Vercel)

### 1. Create Vercel Account
- Go to [vercel.com](https://vercel.com) and sign up/login with GitHub

### 2. Deploy Frontend
1. Click **"Add New..."** → **"Project"**
2. Import your repository: `aditya739/PW_discount`
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variable**:
   - Click **"Environment Variables"**
   - Add:
     ```
     REACT_APP_API_URL=https://pw-vouchers-backend.onrender.com/api
     ```
   - Replace with your actual Render backend URL from Step 1

5. Click **"Deploy"**
6. Wait for deployment (2-3 minutes)
7. **Copy your frontend URL**: `https://your-app.vercel.app`

### 3. Update Backend CORS
1. Go back to **Render Dashboard**
2. Open your backend service
3. Go to **"Environment"** tab
4. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
5. Click **"Save Changes"** (backend will redeploy)

---

## Verification

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Check if the home page loads
3. Try searching for courses in the offers table
4. Test the admin login at `/admin/login`

---

## Important Notes

### Free Tier Limitations
- **Render Free**: Backend sleeps after 15 min of inactivity (first request takes ~30s to wake up)
- **Vercel Free**: 100GB bandwidth/month, unlimited deployments

### Updating Your App
1. Push changes to GitHub: `git push origin main`
2. Vercel auto-deploys on every push
3. Render auto-deploys on every push

### Troubleshooting
- **CORS errors**: Check `FRONTEND_URL` in Render matches your Vercel domain
- **API not responding**: Render free tier sleeps - wait 30s for first request
- **Build fails**: Check build logs in Vercel/Render dashboard

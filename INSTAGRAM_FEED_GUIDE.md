# Instagram Feed Integration Guide (100% FREE)

This guide explains how to add a live Instagram feed to The Club Bali website using Instagram's **FREE** Basic Display API.

## Instagram Handle
Your Instagram account: `@theclub_bali`  
URL: `https://www.instagram.com/theclub_bali/`

---

## Setup Instructions (5-10 minutes)

### Step 1: Create Facebook Developer App

1. Go to [Facebook Developers](https://developers.facebook.com/apps/)
2. Click **"Create App"** or **"My Apps"** → **"Create App"**
3. Choose **"Business"** as the app type
4. Fill in app details:
   - App Name: "The Club Bali Website" (or any name)
   - Contact Email: Your email
   - Click **"Create App"**

### Step 2: Add Instagram Basic Display Product

1. In your app dashboard, go to **"Add Product"** or find **"Instagram Basic Display"**
2. Click **"Set Up"** on Instagram Basic Display
3. Click **"Create New App"** button

### Step 3: Configure OAuth Settings

1. In the left sidebar, click **"Basic Display"**
2. Scroll to **"User Token Generator"**
3. Under **"Valid OAuth Redirect URIs"**, add:
   ```
   https://localhost:3000/
   ```
   (For production, also add your live domain like `https://yourdomain.com/`)
4. Click **"Save Changes"**

### Step 4: Add Instagram Testers (for development)

1. Scroll to **"User Token Generator"**
2. Click **"Add or Remove Instagram Testers"**
3. Add your Instagram account (`theclub_bali`)
4. **Accept the invitation** on your Instagram app (important!)

### Step 5: Generate Access Token

1. Go back to **"User Token Generator"**
2. Click **"Generate Token"**
3. Select permissions: `user_profile`, `user_media`
4. Click **"Generate Token"**
5. **Copy the token** - you'll need this!

### Step 6: Get Your User ID

1. Use the token to get your User ID by visiting:
   ```
   https://graph.instagram.com/me?fields=id,username&access_token=YOUR_TOKEN_HERE
   ```
2. Replace `YOUR_TOKEN_HERE` with your token
3. Copy the `id` value from the response

### Step 7: Exchange for Long-Lived Token (Optional but Recommended)

Short-lived tokens expire in 1 hour. Exchange for a long-lived token (60 days):

1. Make a GET request to:
   ```
   https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=YOUR_APP_SECRET&access_token=YOUR_SHORT_LIVED_TOKEN
   ```
2. Replace:
   - `YOUR_APP_SECRET` - Found in App Settings → Basic
   - `YOUR_SHORT_LIVED_TOKEN` - The token from Step 5
3. Use the returned token (valid for 60 days)

### Step 8: Add to Your Website

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add these variables:
   ```env
   VITE_INSTAGRAM_ACCESS_TOKEN=your_long_lived_token_here
   VITE_INSTAGRAM_USER_ID=your_user_id_here
   ```
3. Restart your development server
4. The InstagramFeed component will automatically fetch and display your posts!

---

## Component Usage

The `InstagramFeed.jsx` component is already created and ready to use. Just add it to your HomePage:

```jsx
import InstagramFeed from '@/components/InstagramFeed';

// In your JSX:
<InstagramFeed />
```

---

## Refresh Long-Lived Token (Before 60 Days Expire)

Instagram long-lived tokens expire after 60 days. Refresh them before expiration:

1. Make a GET request to:
   ```
   https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=YOUR_EXPIRING_TOKEN
   ```
2. Use the new token returned

---

## Troubleshooting

### "Invalid OAuth access token"
- Token may have expired
- Regenerate a new token and update your `.env` file

### "User not found" or "Invalid user ID"
- Make sure you're using the correct User ID
- Verify your Instagram account is connected to the app

### "Rate limit exceeded"
- Instagram API has rate limits
- Consider caching posts and updating every hour

### Token expires quickly
- Make sure you exchanged for a long-lived token
- Check Step 7 above

---

## Alternative: Manual Post Embeds (No API Needed)

If API setup is too complex, you can manually embed individual posts:

1. Get post URL from Instagram
2. Use Instagram's oEmbed:
   ```javascript
   const response = await fetch(
     `https://api.instagram.com/oembed?url=POST_URL&omitscript=true`
   );
   const data = await response.json();
   // Use data.html to embed
   ```

---

## Resources

- [Instagram Basic Display API Docs](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Access Token Guide](https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-access-tokens-and-permissions)
- [Facebook Developers Portal](https://developers.facebook.com/)

---

## Notes

- ✅ **100% FREE** - No payment required
- ✅ Official Instagram API
- ✅ Full control over styling
- ⚠️ Tokens expire (60 days for long-lived tokens)
- ⚠️ Requires token refresh before expiration

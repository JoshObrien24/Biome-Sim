# GitHub Pages Deployment Guide

## Quick Setup (3 minutes)

### Step 1: Create a New Repository
1. Go to GitHub.com
2. Click the **+** button → **New repository**
3. Name it (e.g., `biome-simulator`)
4. Make it **Public**
5. Click **Create repository**

### Step 2: Upload Your Files
Upload these files to your repository:
- `index.html`
- `biome-simulator.jsx`
- `arctic_taiga.json`
- `tropical_rainforest.json`
- `african_savanna.json`
- `README.md` (optional)

**Two ways to upload:**

#### Option A: Via GitHub Web Interface
1. Click **Add file** → **Upload files**
2. Drag all the files into the upload area
3. Click **Commit changes**

#### Option B: Via Git Command Line
```bash
# In your local folder with the files
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/biome-simulator.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository settings
2. Click **Pages** in the left sidebar
3. Under **Source**, select **main** branch
4. Click **Save**

### Step 4: Access Your Site
After 1-2 minutes, your site will be live at:
```
https://YOUR_USERNAME.github.io/biome-simulator/
```

## File Structure
Your repository should look like this:
```
biome-simulator/
├── index.html                    # Main HTML file
├── biome-simulator.jsx           # React component
├── arctic_taiga.json             # Arctic biome config
├── tropical_rainforest.json      # Rainforest biome config
├── african_savanna.json          # Savanna biome config
└── README.md                     # Documentation
```

## Using the Simulator

Once deployed:
1. Visit your GitHub Pages URL
2. The Arctic Taiga biome loads by default
3. Click **PLAY** to start the simulation
4. Use **IMPORT** to load different JSON biomes
5. Create custom biomes and **EXPORT** to save them

## Troubleshooting

### Site not loading?
- Wait 2-3 minutes after enabling GitHub Pages
- Check that all files are in the root directory
- Verify the repository is public

### Blank page?
- Open browser console (F12)
- Check for errors
- Ensure `biome-simulator.jsx` is in the same folder as `index.html`

### Can't import JSON files?
- The JSON files are included for reference
- Use the **IMPORT** button in the app to load them from your computer
- Or modify the code to fetch from GitHub URLs

## Adding More Biomes

1. Create a new JSON file (e.g., `desert.json`)
2. Upload it to your repository
3. Users can import it via the IMPORT button

## Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to your repository
2. Put your domain name in it (e.g., `biome.example.com`)
3. Configure DNS at your domain registrar
4. Point to `YOUR_USERNAME.github.io`

## Updates

To update the simulator:
1. Edit files locally or on GitHub
2. Commit and push changes
3. GitHub Pages auto-updates in 1-2 minutes

---

**That's it!** Your biome simulator is now live on the web. Share the URL with others to let them explore your ecosystems!

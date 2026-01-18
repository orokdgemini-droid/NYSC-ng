# NYSC ng — Static Prototype

This repository is a ready-to-push static website prototype of a government-style NYSC portal with:
- Login page (client-side demo authentication)
- Dashboard (welcome message, profile card, passport preview, call-up number area)
- 404 page

Demo credentials (client-only):
- username: `corper`
- password: `nysc123`

---

Getting started (for beginners)

1. Install Git (if you don't have it)
   - Windows: https://git-scm.com/download/win
   - macOS: install Xcode Command Line Tools or https://git-scm.com/download/mac
   - Linux: use your package manager (e.g., `sudo apt install git`)

2. Create a GitHub repository
   - Visit https://github.com and sign in.
   - Click "New" to create a new repository (e.g., `nysc-ng-site`).
   - Set visibility (Public is fine for this demo).
   - DO NOT initialize with README (we already have one).

3. Push these files to GitHub (step-by-step)
   - Open a terminal or Git Bash, then run:

     ```bash
     # Replace YOUR_GITHUB_USERNAME and YOUR_REPO with your values
     mkdir nysc-ng-site
     cd nysc-ng-site

     # Copy the files from where you stored them into this folder.
     # Then run:
     git init
     git add .
     git commit -m "Initial static NYSC ng site"
     git branch -M main
     git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO.git
     git push -u origin main
     ```

   - If Git prompts for credentials, enter your GitHub username and PAT (or use the web flow / SSH if configured).

4. Publish with GitHub Pages
   - Go to your repository on GitHub → Settings → Pages (left sidebar).
   - Under "Build and deployment" select:
     - Branch: `main`
     - Folder: `/ (root)`
   - Click Save. After a minute or two the site will be available at:
     `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/`

5. Test locally (optional)
   - Serve files locally:
     - Python: `python3 -m http.server 8000` then open `http://localhost:8000`
     - Node: `npx serve .`

Notes & recommendations
- This is a static, client-side demo. Authentication is mocked using localStorage — do not use for real user accounts.
- Replace placeholder images (background, passport) with your own images by editing `styles.css` and HTML where appropriate.
- For nicer UX and privacy, consider adding a cookie banner, privacy policy, and replacing demo credentials with a real auth backend when moving to production.

If you'd like, I can:
- Create a ZIP of this repo for you,
- Create the GitHub repository and push these files for you (you'll need to provide GitHub access/confirm),
- Or convert the static login to use a lightweight serverless auth later.

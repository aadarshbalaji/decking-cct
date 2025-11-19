# Berkeley Consulting Collective

A modern, responsive website for Berkeley Consulting Collective.

## GitHub Pages Setup

This site is configured to work with GitHub Pages. To deploy:

1. Push this repository to GitHub
2. Go to your repository settings on GitHub
3. Navigate to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `main` (or your default branch)
   - Folder: `/ (root)`
5. Click **Save**
6. Your site will be available at `https://[your-username].github.io/decking-cct/` (or your custom domain if configured)

The `.nojekyll` file ensures GitHub Pages serves the site as static files without Jekyll processing.

## Local Development

Simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

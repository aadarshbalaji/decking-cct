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

## Troubleshooting: Local vs GitHub Pages Differences

If your site looks different on GitHub Pages compared to local:

1. **Hard refresh your browser** on GitHub Pages:
   - Chrome/Edge: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Firefox: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
   - Safari: `Cmd+Option+R`

2. **Verify all files are committed and pushed**:
   ```bash
   git status
   git add .
   git commit -m "Update files"
   git push
   ```

3. **Check file names are lowercase** (GitHub Pages is case-sensitive):
   - `styles.css` ✅ (not `Styles.css`)
   - `script.js` ✅ (not `Script.js`)
   - `index.html` ✅ (not `Index.html`)

4. **Wait for GitHub Pages to rebuild** (can take 1-2 minutes after push)

5. **Check browser console** (F12) for 404 errors on GitHub Pages - this indicates missing files

6. **Verify `.nojekyll` file exists** in the root directory

## Custom Domain Setup

To use a custom domain name (e.g., `yourdomain.com`):

### Step 1: Update CNAME File

1. Edit the `CNAME` file in this repository
2. Replace `example.com` with your actual domain name (e.g., `yourdomain.com` or `www.yourdomain.com`)
3. **Important**: Use only ONE domain per line. For both `www` and non-`www`, you'll need to choose one or set up redirects.

### Step 2: Configure DNS Records

Add the following DNS records with your domain registrar (e.g., GoDaddy, Namecheap, Cloudflare):

#### Option A: Apex Domain (yourdomain.com)
Add these **A records**:
```
Type: A
Name: @ (or leave blank)
Value: 185.199.108.153
TTL: 3600 (or default)

Type: A
Name: @ (or leave blank)
Value: 185.199.109.153
TTL: 3600 (or default)

Type: A
Name: @ (or leave blank)
Value: 185.199.110.153
TTL: 3600 (or default)

Type: A
Name: @ (or leave blank)
Value: 185.199.111.153
TTL: 3600 (or default)
```

#### Option B: Subdomain (www.yourdomain.com)
Add this **CNAME record**:
```
Type: CNAME
Name: www
Value: [your-username].github.io
TTL: 3600 (or default)
```

**Note**: GitHub's IP addresses may change. For the most up-to-date IPs, check [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain).

### Step 3: Enable Custom Domain in GitHub

1. Go to your repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain name
3. Check **Enforce HTTPS** (available after DNS propagates, usually within 24 hours)
4. Click **Save**

### Step 4: Verify DNS Propagation

DNS changes can take anywhere from a few minutes to 48 hours to propagate. You can check status using:
- [DNS Checker](https://dnschecker.org/)
- Command line: `dig yourdomain.com` or `nslookup yourdomain.com`

### Troubleshooting

- **Domain not working?** Wait 24-48 hours for DNS propagation
- **HTTPS not available?** Wait for DNS to fully propagate, then enable "Enforce HTTPS"
- **Both www and non-www?** GitHub Pages supports one domain per repository. Use redirects at your DNS provider for the other
- **CNAME conflicts?** If using apex domain, you cannot have a CNAME record. Use A records instead

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

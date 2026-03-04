# Digital Subscriptions Store | متجر الاشتراكات الرقمية

A fully static digital subscriptions store hosted on GitHub Pages with a built-in admin panel.

## Features

- **Bilingual** (Arabic/English) with RTL/LTR support
- **Dark/Light mode** toggle
- **Category filtering** and **search**
- **Admin panel** (`admin.html`) to manage products and settings via GitHub API
- **Payment methods**: PayPal, Stripe Payment Links, WhatsApp, Cryptocurrency
- **Image upload** directly from the admin panel
- **Responsive** mobile-first design

## Setup

1. Create a GitHub repository and push this code
2. Enable **GitHub Pages** (Settings > Pages > Source: main branch)
3. Generate a **Personal Access Token** (Settings > Developer settings > Fine-grained tokens)
   - Repository access: Only select the store repo
   - Permissions: Contents → Read and write
4. Open `https://your-username.github.io/repo-name/admin.html`
5. Enter your GitHub username, repo name, and token to access the admin panel

## File Structure

```
├── index.html          # Main store page
├── admin.html          # Admin panel
├── css/
│   ├── style.css       # Main styles
│   └── admin.css       # Admin panel styles
├── js/
│   ├── app.js          # Store logic
│   └── admin.js        # Admin panel logic (GitHub API)
├── data/
│   ├── products.json   # Products data
│   └── settings.json   # Store settings & payment config
├── images/             # Product images
└── .nojekyll           # Bypass Jekyll processing
```

## Admin Panel

Access at `/admin.html`. Features:
- Add, edit, delete products
- Upload product images
- Configure store name, description, hero text
- Enable/disable payment methods
- Set payment details (PayPal link, WhatsApp number, crypto wallets)

All changes are committed directly to the repository via GitHub API.

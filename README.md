# Digital Subscriptions Store | متجر الاشتراكات الرقمية

A digital subscriptions store hosted on GitHub Pages with Supabase backend, multi-admin system, and referral tracking.

## Features

- **Bilingual** (Arabic/English) with RTL/LTR support
- **Dark/Light mode** toggle
- **Category filtering** and **search**
- **Multi-Admin System** with email-based authentication via Supabase
- **Role-based access**: Super Admin (full control) and Admin (content + referral)
- **Referral System**: unique links, visit tracking, commission calculation
- **Payment methods**: PayPal, Stripe Payment Links, WhatsApp, Cryptocurrency (USDT, BTC, Binance ID)
- **Dynamic currency conversion** based on visitor timezone
- **Image upload** to Supabase Storage
- **Responsive** mobile-first design

## Setup

### 1. Supabase Setup (Free Tier)

1. Create account at [supabase.com](https://supabase.com)
2. Create a new project and save:
   - **Project URL** (e.g. `https://xxxxx.supabase.co`)
   - **Anon Key** (public key, safe for frontend)
3. Go to **SQL Editor** and run these files in order:
   - `supabase-setup.sql` (creates tables, functions, policies, storage)
   - `supabase-migrate-data.sql` (imports sample products and settings)
4. Go to **Authentication → Settings** and disable **Confirm Email** (so admins can log in immediately after signup)
5. Edit `js/supabase-config.js` with your Project URL and Anon Key

### 2. GitHub Pages Hosting

1. Push code to a GitHub repository
2. Enable **GitHub Pages** (Settings → Pages → Source: main branch)
3. Visit your site at `https://username.github.io/repo-name/`

### 3. First Admin Setup

1. Open `https://your-site/admin.html`
2. The first user to sign up automatically becomes **Super Admin**
3. Enter your name, email, password, and a referral code
4. You can then add more admins from the Admin Management tab

## File Structure

```
├── index.html              # Main store page
├── admin.html              # Admin panel (login + dashboard)
├── css/
│   ├── style.css           # Main styles
│   └── admin.css           # Admin panel styles
├── js/
│   ├── supabase-config.js  # Supabase connection settings
│   ├── app.js              # Store logic (Supabase + JSON fallback)
│   ├── admin.js            # Admin panel (Supabase auth + CRUD)
│   └── referral.js         # Referral tracking for visitors
├── data/
│   ├── products.json       # Fallback products data
│   └── settings.json       # Fallback store settings
├── images/                 # Product images
├── supabase-setup.sql      # Database schema setup
├── supabase-migrate-data.sql # Sample data migration
└── .nojekyll               # Bypass Jekyll processing
```

## Admin Roles

| Feature | Super Admin | Admin |
|---------|:-----------:|:-----:|
| Products (CRUD) | ✓ | ✓ |
| Categories (CRUD) | ✓ | ✓ |
| Site Settings | ✓ | — |
| Payment Methods | ✓ | — |
| Admin Management | ✓ | — |
| Order Management | ✓ | — |
| Referral Dashboard | All admins | Own stats |

## Referral System

1. Each admin gets a unique referral link: `https://site.com/?ref=CODE`
2. Visitors arriving via referral link are tracked
3. WhatsApp messages automatically include `[Ref: CODE]`
4. Super admin confirms orders and assigns referral credit
5. Each admin sees their stats: visits, sales, and commission

## Supabase Free Tier Limits

- **500MB** database storage
- **1GB** file storage (images)
- **50,000** monthly active users
- **Unlimited** API requests
- No credit card required

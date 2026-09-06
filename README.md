# R1 LAURA — Construction & Interiors Website

A premium, modern corporate website and admin dashboard built for **R1 LAURA Construction & Interiors** (Visakhapatnam, Andhra Pradesh).

---

## 🏢 Business Details

- **Company Name:** R1 LAURA
- **Branding:** R1 LAURA Construction & Interiors
- **Owner:** B.N. Raju
- **Phone / WhatsApp:** +91 7330840545
- **Location:** Visakhapatnam, Andhra Pradesh, India
- **Experience:** 25+ Years
- **Projects Completed:** 2500+ Projects
- **Venture Association:** 40+ Ventures with Hema Constructions

---

## 🚀 How to Run Locally

### Method 1: Using `app.py` (Recommended)
Open Command Prompt (CMD) in the project directory and run:

```cmd
cd C:\Users\surya\Downloads\website
python app.py
```
*This starts the server and automatically opens the website in your default browser.*

### Method 2: Standard Python Server
```cmd
python -m http.server 8080
```

---

## 🌐 Local Server URLs

- **Public Website:** [http://localhost:8080](http://localhost:8080)
- **Admin Dashboard:** [http://localhost:8080/admin/](http://localhost:8080/admin/)

---

## 📁 Project Directory Structure

```
website/
├── index.html            # Main Landing / Homepage
├── about.html            # About Company & Owner (B.N. Raju)
├── interiors.html        # R1 Laura Interiors Division
├── constructions.html    # R1 Laura Constructions Division
├── projects.html         # Projects Portfolio Gallery
├── services.html         # Detailed Services List
├── contact.html          # Contact Page with WhatsApp & Enquiry
├── app.py                # Python Local Server Launcher
├── css/
│   ├── main.css          # Core Website Styling (Luxury Dark/Gold Theme)
│   └── admin.css         # Admin Portal Styling
├── js/
│   ├── data.js           # Data Storage Layer (localStorage DB)
│   ├── main.js           # Navigation & Interactions
│   ├── projects.js       # Projects Gallery & Lightbox
│   └── enquiry.js        # Enquiry Form & WhatsApp Handler
├── assets/
│   ├── logos/            # Primary & Secondary Branding Logos
│   └── hero.png          # High Resolution Hero Graphic
└── admin/
    ├── index.html        # Direct Access Admin Redirect
    ├── dashboard.html    # Main Admin Analytics Dashboard
    ├── enquiries.html    # Lead & Enquiry Management
    ├── projects.html     # Projects CRUD Manager
    ├── testimonials.html # Testimonials Manager
    ├── services.html     # Services Overview Manager
    └── settings.html     # Company & Site Settings Manager
```

---

## 🛠️ Admin Dashboard Features

- **Lead Management:** View, search, filter, and mark status of customer enquiries.
- **Direct WhatsApp:** Send direct WhatsApp messages to clients with 1-click.
- **Project Portfolio Manager:** Add, edit, or remove project photos and details dynamically.
- **Testimonials Manager:** Publish or unpublish client reviews.
- **Site Settings:** Edit contact phone, WhatsApp number, owner name, and hero text.

---

## 🌐 How to Publish Online

To make the website live on the internet (Hostinger, Netlify, Vercel, or cPanel):
1. Upload all files inside `website/` to your web server host root.
2. Public visitors will access the site at your domain name (e.g., `www.r1laura.com`).
3. Access the admin dashboard anytime at `www.r1laura.com/admin/`.

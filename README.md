# AURA Lifestyle & Tech — Modern E-Commerce Mini Project

A visually stunning, responsive, dual-platform e-commerce project featuring:
1. **Web Application:** Built with Next.js (App Router), React 19, TypeScript, and Tailwind CSS v4.
2. **Mobile Application:** Built with Flutter, Dart, Material 3, Provider State Management, and SharedPreferences persistence.

Both platforms share the same **AURA** brand identity, color palette, curated product catalog, and user flows, tailored to their respective platforms.

---

## 📸 Project Showcase & Key Highlights

* **Brand Aesthetic:** Slate & Emerald luxury tech vibe with amber badges, glassmorphism, subtle borders, and smooth micro-animations.
* **Shared Product Catalog:** 12 curated products across 6 departments (Audio, Smartwatches, Carbon Footwear, Desk Tech, Commuter Bags, Technical Apparel).
* **Full E-Commerce Flow:** Home → Catalog Filters & Search → Product Details & Gallery → Cart & Quantity Steppers → Checkout Form Validation → Simulated Payment → Order Confirmation Receipt.
* **Wishlist System:** Heart toggle, floating badges, move all items to cart.
* **Local Persistence:** Both web (`localStorage`) and mobile (`shared_preferences`) maintain your Cart, Wishlist, and Orders even across app restarts.
* **Promo Code Engine:** Working coupon engine (e.g. `AURA20` for 20% off, `WELCOME10` for $10 off) with live discount calculations and free shipping threshold bar ($100+).

---

## 📁 Repository Structure

```
fstproject/
├── web/                             # Next.js Web Application
│   ├── src/
│   │   ├── app/                     # App Router pages
│   │   │   ├── page.tsx             # Home Screen (Hero, Featured, Categories, Trending)
│   │   │   ├── products/            # Catalog with live search & filters
│   │   │   ├── products/[id]/       # Product Details & Image Gallery
│   │   │   ├── cart/                # Shopping Cart & Coupon Engine
│   │   │   ├── checkout/            # Checkout form & payment simulation
│   │   │   ├── order-success/       # Confirmation Receipt
│   │   │   ├── wishlist/            # Wishlist grid & Move-to-cart
│   │   │   ├── login/               # Authentication (Sign In & Register)
│   │   │   └── profile/             # User Account & Order Tracking
│   │   ├── components/              # Reusable UI components (Navbar, Footer, ProductCard, etc.)
│   │   ├── context/                 # Context Providers (Cart, Wishlist, Auth, Toast)
│   │   ├── data/                    # Sample products and categories
│   │   └── types/                   # TypeScript interfaces
│   ├── package.json
│   └── tailwind.config.ts
│
└── mobile/                          # Flutter Mobile Application
    ├── lib/
    │   ├── data/                    # Dart sample catalog (matching web)
    │   ├── models/                  # Product, CartItem, Order, User models
    │   ├── providers/               # CartProvider, WishlistProvider, AuthProvider
    │   ├── screens/                 # 10 dedicated screens matching the store
    │   ├── theme/                   # Material 3 custom theme & colors
    │   ├── widgets/                 # ProductCard, CategoryCard, CartItemTile, etc.
    │   └── main.dart                # MultiProvider & MaterialApp entry
    └── pubspec.yaml                 # Dependencies (provider, shared_preferences)
```

---

## 🚀 Running the Web Application (Next.js)

### Prerequisites
* Node.js v18+ (tested on Node.js v22)
* npm or pnpm or yarn

### Steps to Run
```bash
# 1. Navigate to the web folder
cd web

# 2. Install dependencies (if not already installed)
npm install

# 3. Start development server
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000).

To build for production:
```bash
npm run build
npm run start
```

---

## 📱 Running the Mobile Application (Flutter)

### Prerequisites
* Flutter SDK 3.0+
* Android Studio / VS Code with Flutter extension
* Android Emulator, iOS Simulator, or Chrome for Flutter Web

### Steps to Run
```bash
# 1. Navigate to mobile folder
cd mobile

# 2. Get dependencies
flutter pub get

# 3. Run on connected device or simulator
flutter run
```

To run on Chrome (Flutter Web):
```bash
flutter run -d chrome
```

---

## 💡 Demo Credentials & Testing Tips

* **Demo User:** Alex Rivera (`alex.rivera@example.com`)
* **Quick Login:** Both Web and Mobile have a one-click **"Quick Demo Login"** button on the Login screen.
* **Promo Codes:**
  * `AURA20`: 20% off entire order
  * `WELCOME10`: $10 discount
  * `STUDENT15`: 15% discount
* **Free Delivery:** Automatic when subtotal exceeds $100.

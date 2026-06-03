# 📊 Data Dummy Seeding Documentation

## Overview
Database seeding telah dikonfigurasi dengan data dummy yang lengkap dan realistis untuk Olvad Coffee & Bakery. Seeding mencakup users, menu kategori, produk dengan variants, dan 30 transaksi order dengan berbagai skenario.

---

## 🚀 Cara Menjalankan Seeding

### Development
```bash
# Terminal 1: Start API development server
cd apps/api
npm run dev

# Terminal 2: Trigger seeding endpoint
curl http://localhost:4000/database/seed
```

### Response Contoh:
```json
{
  "message": "Success! Database has been populated with varied Olvad menu and realistic orders.",
  "stats": {
    "users": 5,
    "orders": 30,
    "products": 21,
    "notes": "Orders include mix of guest/registered users, all order types, and payment statuses"
  }
}
```

---

## 📋 Data Yang Dibuat

### 1️⃣ USERS (5 pengguna)
Untuk testing login dan order tracking:

| Username | Email | Phone | Address |
|----------|-------|-------|---------|
| user1 | user1@example.com | - | Jl. Raya No. 1, Semarang |
| user2 | user2@example.com | - | Jl. Raya No. 2, Semarang |
| user3 | user3@example.com | - | Jl. Raya No. 3, Semarang |
| user4 | user4@example.com | - | Jl. Raya No. 4, Semarang |
| user5 | user5@example.com | - | Jl. Raya No. 5, Semarang |

**Password:** `password123` (same for all users)

---

### 2️⃣ MENU CATEGORIES & PRODUCTS (5 kategori, 21 produk)

#### 🔥 Signature Coffee (2 produk)
1. **Kopi Susu Gula Aren** - Rp 28.000
   - Variants: Temperature (Hot/Ice), Sweetness (Normal/Less Sugar), Add-ons (Extra Shot/Vanilla Syrup)
   
2. **Avocado Coffee** - Rp 32.000
   - Variants: Sweetness (Normal/Less Sugar)

#### ☕ Espresso Based (4 produk)
1. **Latte Premium** - Rp 30.000
   - Variants: Temperature, Milk Choice (Fresh/Oat Milk), Add-ons
   
2. **Cappuccino** - Rp 30.000
   - Variants: Temperature, Milk Choice, Add-ons
   
3. **Mocha** - Rp 30.000
   - Variants: Temperature, Milk Choice
   
4. **Americano** - Rp 25.000
   - Variants: Temperature, Add-ons

#### 🍵 Non Coffee (3 produk)
1. **Matcha Latte** - Rp 30.000
   - Variants: Temperature, Milk Choice, Sweetness
   
2. **Chocolate Premium** - Rp 25.000
   - Variants: Temperature, Milk Choice
   
3. **Teh Tarik** - Rp 22.000
   - Variants: Temperature

#### 🥐 Pastry (4 produk)
1. **Butter Croissant** - Rp 25.000
   - Variants: Preparation (Toasted/Room Temp), Extra Dip (Butter Curls/Jam)
   
2. **Chocolate Croissant** - Rp 28.000
   - Variants: Preparation
   
3. **Sourdough Toast** - Rp 22.000
   - Variants: Spread (Peanut Butter/Cream Cheese)
   
4. **Banana Bread** - Rp 24.000
   - Variants: Preparation

#### 🍽️ Heavy Meal (4 produk)
1. **Chicken Sandwich** - Rp 38.000
   - Variants: Extra (Cheese +Rp5K / Chicken +Rp12K)
   
2. **Pasta Aglio Olio** - Rp 42.000
   - Variants: Spicy Level, Topping (Beef +Rp10K / Mushroom +Rp6K)
   
3. **Nasi Goreng Olvad** - Rp 35.000
   - Variants: Spicy Level, Topping (Telur +Rp5K / Sosis +Rp6K)

---

### 3️⃣ ORDERS (30 transaksi)

#### Distribution:
- ✅ **50% dengan User ID** (registered customers)
- ✅ **50% Guest Checkout** (tanpa user ID)
- ✅ **70% Payment Status: PAID**
- ✅ **30% Payment Status: UNPAID**
- ✅ Campuran semua Order Types
- ✅ Campuran semua Payment Methods

#### Order Type Distribution:
- **DINE_IN** (Makan di Tempat) ~ 33%
  - Includes table numbers: A1, A2, B1, B2, C1, C2, D1, D2
  
- **PICK_UP** (Ambil Sendiri) ~ 33%
  - Pickup times: 09:00, 10:30, 12:00, 14:30, 16:00, 17:30
  
- **DELIVERY** (Antar ke Lokasi) ~ 33%
  - Sample addresses di area Semarang

#### Payment Method Distribution:
- **QRIS** ~ 33%
- **TRANSFER** ~ 33%
- **CASHIER** ~ 33%

#### Order Status Distribution:
- **ON_PROCESS** ~ 33% (sedang dibuat)
- **DONE** ~ 33% (siap diambil/diantar)
- **CANCELED** ~ 33% (dibatalkan)

#### Customer Details:
```
Customer Names: Budi Santoso, Siti Rahayu, Ahmad Wijaya, dll.
Phone: 08123-08789 (realistic Indonesian format)
Notes: 20% pesanan punya catatan khusus untuk dapur
```

---

## 📊 Query Testing

Setelah seeding, Anda bisa test dengan query berikut:

### 1. Lihat semua produk
```bash
curl http://localhost:4000/product
```

### 2. Lihat semua orders
```bash
curl http://localhost:4000/order \
  -H "X-User-Id: 1" \
  -H "X-User-Role: cashier"
```

### 3. Lihat order tertentu
```bash
curl http://localhost:4000/order/1
```

### 4. Filter orders by user
```bash
curl http://localhost:4000/order/user/1
```

### 5. Test frontend checkout
- Akses: `http://localhost:3000/checkout`
- Isi form dan submit untuk buat order baru

### 6. Lihat detail order di tracking
- Akses: `http://localhost:3000/order/1`
- Lihat payment info berdasarkan payment method

---

## 🧪 Testing Scenarios

### Scenario 1: Guest Checkout
```
1. Buka http://localhost:3000/checkout
2. Pilih menu, isi form (tidak perlu login)
3. Submit order
4. Redirect ke /order/[id] dengan payment info
```

### Scenario 2: Dine-in Order
```
1. Seeding sudah create dine-in orders dengan table numbers
2. Buka /order/1 untuk lihat table number + payment status
3. Kitchen bisa lihat di KDS dengan filter dine-in orders
```

### Scenario 3: Payment Tracking
```
1. Orders yang status UNPAID akan tampil di /order/[id]
2. Menampilkan payment instructions:
   - QRIS: QR code + scan instructions
   - TRANSFER: Bank details + WhatsApp instruction
   - CASHIER: Payment at counter + confirmation
```

### Scenario 4: Admin Dashboard
```
1. Akses /order dengan role header:
   curl http://localhost:4000/order \
     -H "X-User-Id: 1" \
     -H "X-User-Role: admin"
2. Lihat semua 30 orders dengan details
3. Update order status dan payment status (PUT /order/:id)
```

---

## 🔄 Re-seeding Database

Untuk reset dan re-seed:

```bash
# Method 1: Via API endpoint
curl http://localhost:4000/database/seed

# Method 2: Manual Prisma
cd apps/api
npx prisma migrate reset --force
```

**Catatan:** 
- `migrate reset` akan drop database, run migrations, dan trigger seeding jika ada seed script
- `database/seed` endpoint hanya clear dan re-populate data saja

---

## 📈 Statistik Data

| Entitas | Jumlah | Catatan |
|---------|--------|---------|
| Users | 5 | Untuk login & registered customers |
| Categories | 5 | Coffee, Non-Coffee, Pastry, Heavy Meal |
| Products | 21 | Spread across 5 categories |
| Product Variants | 15+ | Multiple options per product |
| Orders | 30 | Mix of all order types & payment status |
| Detail Orders | 30 | 1 per order (bisa diperluas untuk multi-items) |

---

## 🎯 Features Testing dari Seeding

✅ **Guest Checkout** - 50% orders tanpa userId  
✅ **All Order Types** - DINE_IN, PICK_UP, DELIVERY dengan data spesifik  
✅ **Payment Status** - PAID dan UNPAID untuk test payment flow  
✅ **Payment Methods** - QRIS, TRANSFER, CASHIER dengan instruksi berbeda  
✅ **Product Variants** - Single selection dan multi selection options  
✅ **Role-Based Access** - Admin/Cashier/KDS bisa lihat semua orders  
✅ **Order Tracking** - Customer bisa lihat status & payment instructions  

---

## 🛠️ Troubleshooting

### Error: "Cannot find module generated/prisma/client"
```bash
cd apps/api
npx prisma generate
```

### Error: Database connection failed
```bash
# Set DATABASE_URL environment variable
export DATABASE_URL="mysql://user:password@localhost:3306/olvad"

# Atau update .env file
```

### Seeding timeout
```bash
# Increase timeout di database controller atau jalankan di terminal:
cd apps/api
npm run dev
# Wait for compile, then hit: http://localhost:4000/database/seed
```

---

## 📝 Notes

- **Password:** Semua user punya password `password123` untuk development
- **Images:** Menggunakan Unsplash API untuk product photos (perlu internet)
- **Phone Numbers:** Format realistis Indonesian (08xxx-xxx-xxxx)
- **Prices:** Realistic coffee shop pricing (Rp 22K - Rp 42K)
- **Variants:** Realistic options (Hot/Ice, Milk choices, Toppings, etc.)

---

**Created:** June 3, 2026  
**Last Updated:** June 3, 2026  
**Status:** ✅ Ready for Development & Testing

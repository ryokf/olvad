# Implementasi Perbaikan Pre-Release Olvad

## 📋 Ringkasan Perubahan

Semua perbaikan prioritas untuk pre-release telah diimplementasikan. Berikut adalah detail perubahan yang dilakukan:

---

## ✅ 1. Rombak Skema Database untuk Form Checkout

### Perubahan Prisma Schema

#### Enum Baru:
- **OrderType**: Ditambahkan `DINE_IN` (sebelumnya hanya DELIVERY, PICK_UP)
- **PaymentMethod**: Diubah ke `QRIS`, `TRANSFER`, `CASHIER` (sebelumnya CASH, CASHLESS)
- **PaymentStatus**: Enum baru dengan nilai `UNPAID`, `PAID` (crucial untuk KDS)
- **UserRole**: Enum baru untuk manajemen akses (`CUSTOMER`, `CASHIER`, `ADMIN`, `KDS`)

#### Model Order:
- `userId` → Menjadi **optional** (`Int?`) untuk mendukung guest checkout
- **Kolom baru:**
  - `customerName` (VARCHAR 100) - Wajib untuk melacak pemesan
  - `customerPhone` (VARCHAR 20) - Wajib untuk notifikasi WhatsApp
  - `tableNumber` (VARCHAR 50, optional) - Untuk dine-in
  - `pickupTime` (VARCHAR 50, optional) - Untuk pickup
  - `deliveryAddress` (TEXT, optional) - Untuk delivery
  - `notes` (TEXT, optional) - Catatan umum
  - `paymentStatus` (ENUM) - **Default: UNPAID** - Sangat penting untuk KDS!
- Kolom `message` **dihapus** dan diganti dengan kolom yang lebih terstruktur

#### Model User:
- `role` (ENUM UserRole) - **Default: CUSTOMER** - Untuk kontrol akses

### File Migrasi:
```
/apps/api/prisma/migrations/20260603_update_order_schema_for_checkout/migration.sql
```

---

## ✅ 2. Hubungkan Fungsi Checkout ke API Backend

### Perubahan Frontend

**File:** `/apps/web/app/checkout/page.tsx`

#### Fitur Baru:
- ✅ Menghubungkan form ke API `POST /order`
- ✅ Mapping order type dari frontend ke backend (`dine-in` → `DINE_IN`)
- ✅ Mapping payment method (`qris` → `QRIS`)
- ✅ Membuat array `detailOrders` dari cart items
- ✅ Error handling dan loading state
- ✅ Redirect ke `/order/[id]` dengan order ID sebenarnya

#### Struktur Payload:
```json
{
  "customerName": "John Doe",
  "customerPhone": "08123456789",
  "type": "PICK_UP",
  "pickupTime": "14:30",
  "paymentMethod": "QRIS",
  "totalPrice": 104500,
  "status": "ON_PROCESS",
  "notes": "Jangan terlalu manis",
  "detailOrders": [
    {
      "productId": 1,
      "qty": 2,
      "subtotalPrice": 70000,
      "variantOptionIds": [1, 2]
    }
  ]
}
```

### Perubahan Backend DTOs

**File:** `/apps/api/src/order/dto/create.dto.ts`
- `userId` → Optional
- Tambahan fields: `customerName`, `customerPhone`, `tableNumber`, `pickupTime`, `deliveryAddress`, `notes`
- Tambahan: `paymentStatus` (optional, default UNPAID)

**File:** `/apps/api/src/order/dto/update.dto.ts`
- Tambahan fields untuk update: `tableNumber`, `pickupTime`, `deliveryAddress`, `notes`, `paymentStatus`
- Hapus field `message`

### Update Order Service

**File:** `/apps/api/src/order/order.service.ts`
- `createOrder()`: Handle semua field baru
- `updateOrder()`: Support update payment status dan field baru

### Update Types Package

**File:** `/packages/types/src/order.ts`
- Update `OrderType` enum
- Update `PaymentMethod` enum
- Tambah `PaymentStatus` enum
- Update `Order` interface dengan field baru
- `userId` menjadi optional

---

## ✅ 3. Alur Konfirmasi Pembayaran Sederhana

### Perubahan Frontend Order Detail Page

**File:** `/apps/web/app/order/[id]/page.tsx`

#### Fitur Baru:
- ✅ Fetch order data dari API berdasarkan order ID
- ✅ Menampilkan status pembayaran
- ✅ **Menampilkan informasi pembayaran berdasarkan metode:**
  - **QRIS**: Barcode placeholder + instruksi scan
  - **TRANSFER**: Detail rekening bank + instruksi + order ID sebagai catatan
  - **CASHIER**: Informasi pembayaran di kasir + instruksi
- ✅ Status stepper yang dinamis berdasarkan `paymentStatus` dan `orderStatus`
- ✅ Menampilkan order details dengan semua field baru
- ✅ Loading state dan error handling

#### Instruksi Pembayaran:
Setiap metode pembayaran menampilkan instruksi jelas kepada pelanggan tentang cara membayar dan apa yang perlu dilakukan selanjutnya.

---

## ✅ 4. Amankan Akses Data Pesanan

### Implementasi Role-Based Access Control

**File Baru:** `/apps/api/src/common/guards/auth.guard.ts`
- Guard untuk verifikasi role user
- Factory function untuk membuat guard dengan specific roles

### Update Order Controller

**File:** `/apps/api/src/order/order.controller.ts`

#### Proteksi Endpoint:

| Endpoint | Method | Role yang Diizinkan | Deskripsi |
|----------|--------|-------------------|-----------|
| `/order` | GET | ADMIN, CASHIER, KDS | Lihat semua pesanan |
| `/order/:id` | GET | PUBLIC | Lihat detail pesanan (guest checkout) |
| `/order/user/:userId` | GET | CUSTOMER (own), ADMIN, CASHIER | Lihat pesanan user |
| `/order` | POST | PUBLIC | Buat pesanan (guest checkout) |
| `/order/:id` | PUT | ADMIN, CASHIER, KDS | Update status & payment status |
| `/order/:id` | DELETE | ADMIN | Hapus pesanan |

### Cara Menggunakan:

**Untuk testing/development**, tambahkan header ke request:
```
X-User-Id: 1
X-User-Role: cashier
```

Contoh cURL:
```bash
curl -X GET http://localhost:4000/order \
  -H "X-User-Id: 1" \
  -H "X-User-Role: cashier"
```

**Untuk production**, integrasikan dengan JWT token validation (WIP).

---

## 📦 File Yang Diubah/Dibuat

### Backend (NestJS API)
1. ✅ `apps/api/prisma/schema.prisma` - Updated schema with new enums and fields
2. ✅ `apps/api/prisma/migrations/20260603_update_order_schema_for_checkout/migration.sql` - Migration file
3. ✅ `apps/api/src/order/dto/create.dto.ts` - Updated CreateOrderDto
4. ✅ `apps/api/src/order/dto/update.dto.ts` - Updated UpdateOrderDto
5. ✅ `apps/api/src/order/order.service.ts` - Updated service methods
6. ✅ `apps/api/src/order/order.controller.ts` - Added role-based guards
7. ✅ `apps/api/src/common/guards/auth.guard.ts` - NEW: Role-based access guard

### Frontend (Next.js)
1. ✅ `apps/web/app/checkout/page.tsx` - Updated with API integration
2. ✅ `apps/web/app/order/[id]/page.tsx` - Complete rewrite with real data + payment info
3. ✅ `apps/web/services/order.ts` - NEW: Complete order service with API calls

### Types Package
1. ✅ `packages/types/src/order.ts` - Updated all order types and enums

---

## 🚀 Langkah Implementasi

### 1. Setup Database

```bash
cd apps/api

# Set DATABASE_URL (sesuaikan dengan setup lokal Anda)
# Contoh untuk MariaDB/MySQL lokal:
export DATABASE_URL="mysql://root:password@localhost:3306/olvad"

# Jalankan migration
npx prisma migrate deploy
```

### 2. Generate Prisma Client

```bash
cd apps/api
npx prisma generate
```

### 3. Update Environment Variables

**Frontend (.env.local atau .env):**
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 4. Test Checkout Flow

1. **Akses checkout page**: `http://localhost:3000/checkout`
2. **Isi form** dengan detail pesanan
3. **Submit** → akan membuat pesanan di database
4. **Redirect** ke `/order/[id]` dengan payment info

### 5. Test Order Detail Page

1. **Akses order detail**: `http://localhost:3000/order/1` (ganti 1 dengan order ID)
2. **Lihat payment info** sesuai payment method
3. **Follow payment instructions**

### 6. Test API Security

**Jalankan perintah untuk test protected endpoints:**

```bash
# Coba akses getAllOrders tanpa header (AKAN GAGAL)
curl http://localhost:4000/order

# Coba dengan header role yang salah (AKAN GAGAL)
curl http://localhost:4000/order \
  -H "X-User-Id: 1" \
  -H "X-User-Role: customer"

# Dengan role yang benar (AKAN BERHASIL)
curl http://localhost:4000/order \
  -H "X-User-Id: 1" \
  -H "X-User-Role: cashier"
```

---

## ⚠️ PENTING: Hal-Hal yang Perlu Diperhatikan

### 1. Database Migration
- **Pastikan backup database sebelum menjalankan migration**
- Kolom `customer_name` dan `customer_phone` dibuat sebagai NOT NULL
  - Jika ada order lama, perlu manually add values atau ubah di schema
  - Atau gunakan `prisma migrate resolve --rolled-back` jika ada error

### 2. Payment Information (Hardcoded)
Informasi pembayaran di order detail page saat ini **hardcoded**:
- Nomor rekening bank
- QRIS code (placeholder)
- Nomor WhatsApp untuk transfer manual

**TODO untuk production:**
- Simpan informasi pembayaran di database/config
- Integrasikan real QRIS code generator
- Implementasi real payment gateway (Stripe, MidTrans, dll)

### 3. Authentication
Guard saat ini menggunakan header sederhana untuk testing:
- `X-User-Id`
- `X-User-Role`

**TODO untuk production:**
- Implementasi JWT token
- Integrasikan dengan login system
- Validasi token di setiap request

### 4. KDS Integration
Update order status harus dari sistem KDS/backend:
- UNPAID → tidak ada yang buat pesanan
- ON_PROCESS → sedang dibuat di dapur
- DONE → siap diambil

---

## 🔄 Next Steps untuk Production

1. **Database Setup**
   - [ ] Setup cloud database (AWS RDS, Google Cloud SQL, dll)
   - [ ] Jalankan migration
   - [ ] Backup database

2. **Payment Gateway**
   - [ ] Integrasikan dengan QRIS provider
   - [ ] Integrasikan dengan payment gateway untuk bank transfer
   - [ ] Setup webhook untuk notifikasi pembayaran

3. **Authentication**
   - [ ] Implementasi proper JWT
   - [ ] Setup OAuth/SSO jika diperlukan
   - [ ] Implement password reset flow

4. **KDS System**
   - [ ] Develop KDS display system
   - [ ] Real-time order updates
   - [ ] Kitchen staff interface

5. **Admin Dashboard**
   - [ ] Order management
   - [ ] Payment verification
   - [ ] Analytics & reporting

6. **Deployment**
   - [ ] Setup CI/CD pipeline
   - [ ] Docker containerization
   - [ ] Production server setup

---

## 📞 Support

Untuk questions atau issues, hubungi dev team.

**Last Updated:** June 3, 2026
**Version:** Pre-Release v1.0

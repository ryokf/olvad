<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Inisialisasi Faker (Lokasi Indonesia)
        $faker = Faker::create('id_ID');

        // ==========================================
        // 1. SEED USERS (20 User Dummy)
        // ==========================================
        echo "Generate 20 Users...\n";
        $userIds = [];

        // Buat Admin/User tetap untuk login testing
        $userIds[] = DB::table('users')->insertGetId([
            'name' => 'admin_tester',
            'email' => 'admin@test.com',
            // 'photo' => 'https://ui-avatars.com/api/?name=Admin+Tester',
            // 'address' => 'Jl. Pemuda No. 1, Semarang',
            'password' => Hash::make('password'), // password login
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        for ($i = 0; $i < 19; $i++) {
            $userIds[] = DB::table('users')->insertGetId([
                'name' => $faker->userName,
                'email' => $faker->unique()->safeEmail,
                // 'photo' => 'https://ui-avatars.com/api/?name=' . urlencode($faker->name),
                // 'address' => $faker->address,
                'password' => Hash::make('password'),
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => Carbon::now(),
            ]);
        }

        // ==========================================
        // 2. SEED CATEGORIES & PRODUCTS
        // ==========================================
        echo "Generate Menu & Variants...\n";

        // Data Mentah Menu
        $menuData = [
            'Coffee' => [
                ['name' => 'Americano', 'price' => 15000],
                ['name' => 'Cappuccino', 'price' => 20000],
                ['name' => 'Caffe Latte', 'price' => 22000],
                ['name' => 'Caramel Macchiato', 'price' => 25000],
                ['name' => 'Kopi Gula Aren', 'price' => 18000],
            ],
            'Non-Coffee' => [
                ['name' => 'Matcha Latte', 'price' => 24000],
                ['name' => 'Red Velvet', 'price' => 23000],
                ['name' => 'Chocolate Signature', 'price' => 22000],
                ['name' => 'Lemon Tea', 'price' => 15000],
            ],
            'Food' => [
                ['name' => 'Nasi Goreng Spesial', 'price' => 25000],
                ['name' => 'Mie Goreng Jawa', 'price' => 23000],
                ['name' => 'Rice Bowl Teriyaki', 'price' => 28000],
                ['name' => 'Spaghetti Bolognese', 'price' => 30000],
            ],
            'Snack' => [
                ['name' => 'French Fries', 'price' => 15000],
                ['name' => 'Mix Platter', 'price' => 25000],
                ['name' => 'Roti Bakar Coklat', 'price' => 18000],
            ]
        ];

        $productIds = []; // Simpan ID produk untuk random order nanti
        $drinkVariantIds = []; // ID Produk kategori minuman
        $foodVariantIds = [];  // ID Produk kategori makanan

        foreach ($menuData as $categoryName => $products) {
            // Insert Kategori
            $catId = DB::table('categories')->insertGetId([
                'name' => $categoryName,
                'created_at' => Carbon::now()
            ]);

            foreach ($products as $prod) {
                // Insert Produk
                $prodId = DB::table('products')->insertGetId([
                    'name' => $prod['name'],
                    'description' => $faker->sentence(10),
                    'category_id' => $catId,
                    'price' => $prod['price'],
                    'photo' => 'https://source.unsplash.com/random/200x200/?' . str_replace(' ', ',', $prod['name']),
                    'tags' => $faker->randomElement(['recommended', 'new', 'bestseller', null]),
                    'created_at' => Carbon::now(),
                ]);

                $productIds[] = $prodId;

                // LOGIKA VARIAN:
                // Jika Kopi/Non-Coffee -> Tambah opsi Gula & Suhu
                // Jika Food -> Tambah opsi Pedas
                if (in_array($categoryName, ['Coffee', 'Non-Coffee'])) {
                    $this->addDrinkVariants($prodId);
                } elseif ($categoryName == 'Food') {
                    $this->addFoodVariants($prodId);
                }
            }
        }

        // ==========================================
        // 3. SEED ORDERS (50 Transaksi Acak)
        // ==========================================
        echo "Generate 50 Random Orders...\n";

        for ($i = 0; $i < 50; $i++) {
            // Pilih User Random
            $randomUser = $faker->randomElement($userIds);
            // Tanggal Order Random (3 bulan terakhir)
            $orderDate = $faker->dateTimeBetween('-3 months', 'now');

            // Buat Order Header (Total 0 dulu)
            $orderId = DB::table('orders')->insertGetId([
                'user_id' => $randomUser,
                'type' => $faker->randomElement(['delivery', 'pick-up']),
                'message' => $faker->optional(0.3)->sentence, // 30% kemungkinan ada pesan
                'payment_method' => $faker->randomElement(['cash', 'cashless']),
                'status' => $faker->randomElement(['onprocess', 'done', 'canceled']),
                'total_price' => 0,
                'created_at' => $orderDate,
                'updated_at' => $orderDate,
            ]);

            // Isi Detail Order (Random 1 s/d 4 item per order)
            $totalOrderPrice = 0;
            $totalItems = rand(1, 4);

            for ($j = 0; $j < $totalItems; $j++) {
                $randomProdId = $faker->randomElement($productIds);
                $productData = DB::table('products')->where('id', $randomProdId)->first();
                $qty = rand(1, 3);

                // Hitung Subtotal Dasar
                $itemSubtotal = $productData->price;

                // Simpan Detail Order
                $detailId = DB::table('detail_orders')->insertGetId([
                    'order_id' => $orderId,
                    'product_id' => $randomProdId,
                    'qty' => $qty,
                    'subtotal_price' => 0, // Update nanti setelah varian
                    'created_at' => $orderDate,
                ]);

                // Ambil Varian dari Produk tersebut (jika ada)
                $variants = DB::table('product_variants')->where('product_id', $randomProdId)->get();

                // Randomly pilih opsi untuk setiap varian yang tersedia
                foreach ($variants as $variant) {
                    // Ambil opsi dari varian ini
                    $options = DB::table('product_variant_options')->where('product_variant_id', $variant->id)->get();

                    if ($options->isNotEmpty()) {
                        // Pilih 1 opsi secara acak
                        $selectedOption = $options->random();

                        // Masukkan ke detail_order_variants
                        DB::table('detail_order_variants')->insert([
                            'detail_order_id' => $detailId,
                            'product_variant_option_id' => $selectedOption->id,
                        ]);

                        // Tambahkan harga varian ke harga item (jika ada add_price)
                        $itemSubtotal += $selectedOption->add_price;
                    }
                }

                // Hitung Final Subtotal (Harga Produk + Harga Varian) * Qty
                $finalSubtotal = $itemSubtotal * $qty;

                // Update subtotal di tabel detail_orders
                DB::table('detail_orders')->where('id', $detailId)->update(['subtotal_price' => $finalSubtotal]);

                $totalOrderPrice += $finalSubtotal;
            }

            // Update Total Price di Header Order
            DB::table('orders')->where('id', $orderId)->update(['total_price' => $totalOrderPrice]);
        }

        echo "Seeding Completed Successfully!\n";
    }

    // --- HELPER FUNCTIONS UNTUK VARIANT ---

    private function addDrinkVariants($productId)
    {
        // Varian 1: Sugar Level
        $varId = DB::table('product_variants')->insertGetId([
            'product_id' => $productId,
            'name' => 'Sugar Level',
            'is_single_selection' => true
        ]);
        DB::table('product_variant_options')->insert([
            ['product_variant_id' => $varId, 'name' => 'Normal Sugar', 'add_price' => 0],
            ['product_variant_id' => $varId, 'name' => 'Less Sugar', 'add_price' => 0],
            ['product_variant_id' => $varId, 'name' => 'No Sugar', 'add_price' => 0],
        ]);

        // Varian 2: Temperature
        $varId2 = DB::table('product_variants')->insertGetId([
            'product_id' => $productId,
            'name' => 'Temperature',
            'is_single_selection' => true
        ]);
        DB::table('product_variant_options')->insert([
            ['product_variant_id' => $varId2, 'name' => 'Ice', 'add_price' => 0],
            ['product_variant_id' => $varId2, 'name' => 'Hot', 'add_price' => 0],
        ]);
    }

    private function addFoodVariants($productId)
    {
        // Varian: Level Pedas
        $varId = DB::table('product_variants')->insertGetId([
            'product_id' => $productId,
            'name' => 'Level Pedas',
            'is_single_selection' => true
        ]);
        DB::table('product_variant_options')->insert([
            ['product_variant_id' => $varId, 'name' => 'Tidak Pedas', 'add_price' => 0],
            ['product_variant_id' => $varId, 'name' => 'Sedang', 'add_price' => 0],
            ['product_variant_id' => $varId, 'name' => 'Pedas', 'add_price' => 0],
            ['product_variant_id' => $varId, 'name' => 'Extra Pedas', 'add_price' => 2000],
        ]);
    }
}

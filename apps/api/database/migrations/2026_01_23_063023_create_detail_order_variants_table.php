<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detail_order_variants', function (Blueprint $table) {
            $table->id();
            // Jika detail order dihapus, varian yang dipilih ikut terhapus
            $table->foreignId('detail_order_id')->constrained('detail_orders')->onDelete('cascade');
            $table->foreignId('product_variant_option_id')->constrained('product_variant_options');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_order_variants');
    }
};

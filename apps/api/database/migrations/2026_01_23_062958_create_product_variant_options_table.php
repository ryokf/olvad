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
        Schema::create('product_variant_options', function (Blueprint $table) {
            $table->id();
            // Jika varian dihapus, opsinya ikut terhapus (cascade)
            $table->foreignId('product_variant_id')->constrained('product_variants')->onDelete('cascade');
            $table->string('name', 50);
            $table->integer('add_price')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variant_options');
    }
};

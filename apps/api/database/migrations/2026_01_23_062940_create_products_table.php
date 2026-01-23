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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->text('description')->nullable();
            // Relasi ke categories. Jika kategori dihapus, set NULL pada produk.
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->text('photo')->nullable();
            $table->integer('price')->default(0);
            $table->string('tags', 15)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

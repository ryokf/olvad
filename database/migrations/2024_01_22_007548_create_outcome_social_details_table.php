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
        Schema::create('outcome_social_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('outcome_detail_id')->constrained()->onDelete('cascade');
            $table->foreignId('outcome_social_id')->constrained()->onDelete('cascade');
            $table->integer('variant_product_id')->constrained()->onDelete('cascade');
            $table->string('product_type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('outcome_social_details');
    }
};

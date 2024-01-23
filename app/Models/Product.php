<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get all of the productSizes for the Product
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function productSizes(): HasMany
    {
        return $this->hasMany(ProductSize::class);
    }

    /**
     * Get all of the productFlavors for the Product
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function productFlavors(): HasMany
    {
        return $this->hasMany(ProductFlavor::class);
    }

    /**
     * Get all of the incomeDetails for the Product
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function incomeDetails(): HasMany
    {
        return $this->hasMany(IncomeDetail::class);
    }

    /**
     * Get the category that owns the Product
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}

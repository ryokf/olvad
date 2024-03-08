<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IncomeDetail extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get the income that owns the IncomeDetail
     */
    public function income(): BelongsTo
    {
        return $this->belongsTo(Income::class);
    }

    // /**
    //  * Get the product that owns the IncomeDetail
    //  */
    // public function product(): BelongsTo
    // {
    //     return $this->belongsTo(Product::class);
    // }

    /**
     * Get the productFlavor that owns the IncomeDetail
     */
    public function productFlavor(): BelongsTo
    {
        return $this->belongsTo(ProductFlavor::class, 'variant_product_id', 'id');
    }

    /**
     * Get the productSize that owns the IncomeDetail
     */
    public function productSize(): BelongsTo
    {
        return $this->belongsTo(ProductSize::class, 'variant_product_id', 'id');
    }
}

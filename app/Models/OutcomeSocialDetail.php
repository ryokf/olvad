<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OutcomeSocialDetail extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get the outcomeDetail that owns the OutcomeSocialDetail
     */
    public function outcomeDetail(): BelongsTo
    {
        return $this->belongsTo(OutcomeDetail::class);
    }

    /**
     * Get the outcomeSocial that owns the OutcomeSocialDetail
     */
    public function outcomeSocial(): BelongsTo
    {
        return $this->belongsTo(OutcomeSocial::class);
    }

    // /**
    //  * Get the product that owns the OutcomeSocialDetail
    //  */
    // public function product(): BelongsTo
    // {
    //     return $this->belongsTo(Product::class);
    // }

    /**
     * Get the productFlavor that owns the OutcomeSocialDetail
     */
    public function productFlavor(): BelongsTo
    {
        return $this->belongsTo(ProductFlavor::class, 'variant_product_id', 'id');
    }

    /**
     * Get the productSize that owns the OutcomeSocialDetail
     */
    public function productSize(): BelongsTo
    {
        return $this->belongsTo(ProductSize::class, 'variant_product_id', 'id');
    }
}

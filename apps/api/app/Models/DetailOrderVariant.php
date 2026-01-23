<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\DetailOrderVariantFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailOrderVariant newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailOrderVariant newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailOrderVariant query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailOrderVariant whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailOrderVariant whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailOrderVariant whereUpdatedAt($value)
 * @property int $detail_order_id
 * @property int $product_variant_option_id
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailOrderVariant whereDetailOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailOrderVariant whereProductVariantOptionId($value)
 * @mixin \Eloquent
 */
class DetailOrderVariant extends Model
{
    /** @use HasFactory<\Database\Factories\DetailOrderVariantFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public function detailOrder(){
        return $this->belongsTo(DetailOrder::class);
    }

    public function productVariantOption(){
        return $this->belongsTo(ProductVariantOption::class);
    }
}

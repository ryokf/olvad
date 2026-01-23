<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\ProductVariantOptionFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariantOption newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariantOption newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariantOption query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariantOption whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariantOption whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariantOption whereUpdatedAt($value)
 * @property int $product_variant_id
 * @property string $name
 * @property int $add_price
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariantOption whereAddPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariantOption whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariantOption whereProductVariantId($value)
 * @mixin \Eloquent
 */
class ProductVariantOption extends Model
{
    /** @use HasFactory<\Database\Factories\ProductVariantOptionFactory> */
    use HasFactory;

    protected $guarded = ['id'];
}

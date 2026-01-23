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
 * @mixin \Eloquent
 */
class DetailOrderVariant extends Model
{
    /** @use HasFactory<\Database\Factories\DetailOrderVariantFactory> */
    use HasFactory;
}

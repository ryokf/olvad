<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\DetailOrderFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailOrder newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailOrder newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailOrder query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailOrder whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailOrder whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|DetailOrder whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class DetailOrder extends Model
{
    /** @use HasFactory<\Database\Factories\DetailOrderFactory> */
    use HasFactory;
}

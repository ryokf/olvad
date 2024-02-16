<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Store extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get all of the outcomeBuys for the Store
     */
    public function outcomeBuys(): HasMany
    {
        return $this->hasMany(OutcomeBuy::class);
    }
}

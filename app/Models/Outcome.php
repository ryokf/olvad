<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Outcome extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get all of the outcomeBuys for the Outcome
     */
    public function outcomeBuys(): HasMany
    {
        return $this->hasMany(OutcomeBuy::class);
    }

    /**
     * Get all of the outcomeSocials for the Outcome
     */
    public function outcomeSocials(): HasMany
    {
        return $this->hasMany(OutcomeSocial::class);
    }
}

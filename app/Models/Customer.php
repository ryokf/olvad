<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get all of the incomes for the Customer
     */
    public function incomes(): HasMany
    {
        return $this->hasMany(Income::class);
    }

    /**
     * Get all of the outcomeSocials for the Customer
     */
    public function outcomeSocials(): HasMany
    {
        return $this->hasMany(OutcomeSocial::class);
    }
}

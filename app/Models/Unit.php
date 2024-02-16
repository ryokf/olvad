<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Unit extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get all of the outcomeDetails for the Unit
     */
    public function outcomeDetails(): HasMany
    {
        return $this->hasMany(OutcomeDetail::class);
    }
}

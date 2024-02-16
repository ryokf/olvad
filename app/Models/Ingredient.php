<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ingredient extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get all of the outcomeBuyDetails for the Ingredient
     */
    public function outcomeBuyDetails(): HasMany
    {
        return $this->hasMany(OutcomeBuyDetail::class);
    }
}

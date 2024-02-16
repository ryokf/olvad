<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OutcomeBuy extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get the outcome that owns the OutcomeBuy
     */
    public function outcome(): BelongsTo
    {
        return $this->belongsTo(Outcome::class);
    }

    /**
     * Get the store that owns the OutcomeBuy
     */
    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    /**
     * Get all of the outcomeBuyDetails for the OutcomeBuy
     */
    public function outcomeBuyDetails(): HasMany
    {
        return $this->hasMany(OutcomeBuyDetail::class);
    }
}

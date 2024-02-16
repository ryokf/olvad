<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OutcomeDetail extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get the unit that owns the OutcomeDetail
     */
    public function unit(): BelongsTo
    {
        return $this->belongsTo(Unit::class);
    }

    /**
     * Get all of the outcomeBuyDetails for the OutcomeDetail
     */
    public function outcomeBuyDetails(): HasMany
    {
        return $this->hasMany(OutcomeBuyDetail::class);
    }

    /**
     * Get all of the outcomeSocialDetails for the OutcomeDetail
     */
    public function outcomeSocialDetails(): HasMany
    {
        return $this->hasMany(OutcomeSocialDetail::class);
    }
}

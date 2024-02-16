<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OutcomeSocial extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get all of the outcomeSocialDetails for the OutcomeSocial
     */
    public function outcomeSocialDetails(): HasMany
    {
        return $this->hasMany(OutcomeSocialDetail::class);
    }

    /**
     * Get the outcome that owns the OutcomeSocial
     */
    public function outcome(): BelongsTo
    {
        return $this->belongsTo(Outcome::class);
    }

    /**
     * Get the customer that owns the OutcomeSocial
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}

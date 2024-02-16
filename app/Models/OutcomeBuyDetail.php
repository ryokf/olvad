<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OutcomeBuyDetail extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get the outcomeDetail that owns the OutcomeBuyDetail
     */
    public function outcomeDetail(): BelongsTo
    {
        return $this->belongsTo(OutcomeDetail::class);
    }

    /**
     * Get the outcomeBuy that owns the OutcomeBuyDetail
     */
    public function outcomeBuy(): BelongsTo
    {
        return $this->belongsTo(OutcomeBuy::class);
    }

    /**
     * Get the ingredient that owns the OutcomeBuyDetail
     */
    public function ingredient(): BelongsTo
    {
        return $this->belongsTo(Ingredient::class);
    }
}

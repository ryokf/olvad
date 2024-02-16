<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IncomeDetail extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get the income that owns the IncomeDetail
     */
    public function income(): BelongsTo
    {
        return $this->belongsTo(Income::class);
    }

    /**
     * Get the product that owns the IncomeDetail
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}

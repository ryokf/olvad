<?php

namespace App\Http\Resources\Income;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IncomeDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'detail_item' => $this->product_type == 'flavor' ? new ProductFlavorResource($this->productFlavor) : new ProductSizeResource($this->productSize),
        ];
    }
}

// new ProductFlavorResource($this->productFlavor),
// new ProductSizeResource($this->productSize),

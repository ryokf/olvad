<?php

namespace App\Http\Resources\Outcome;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class outcomeSocialDetailResource extends JsonResource
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
            'product' => $this->product_type == 'flavor' ? new ProductFlavorResource($this->productFlavor) : new ProductSizeResource($this->productSize),
            'detail_item' => new OutcomeDetailResource($this->outcomeDetail, $this->product_type == 'flavor' ? $this->productFlavor->price : $this->productSize->price),
        ];
    }
}

<?php

namespace App\Http\Resources\Income;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductFlavorResource extends JsonResource
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
            'product_id' => $this->product_id,
            'name' => $this->product->name.' ('.$this->flavor.')',
            'price' => $this->price,
            'type' => 'flavor',
        ];
    }
}

<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'name' => $this->name,
            'category' => $this->category->name,
            'category_id' => $this->category->id,
            'image' => $this->image,
            'description' => $this->description,
            'flavor' => $this->productFlavors->count() > 0 ? ProductFlavorResource::collection($this->productFlavors->where('is_archived', false)) : null,
            'size' => $this->productSizes->count() > 0 ? ProductSizeResource::collection($this->productSizes->where('is_archived', false)) : null,
        ];
    }
}

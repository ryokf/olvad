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
            'product' => $this->product,
            'detail_item' => new OutcomeDetailResource($this->outcomeDetail, $this->product->price),
        ];
    }
}

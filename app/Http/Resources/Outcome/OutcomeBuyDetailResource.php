<?php

namespace App\Http\Resources\Outcome;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OutcomeBuyDetailResource extends JsonResource
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
            'name' => $this->ingredient->name,
            'price' => $this->price,
            'detail_item' => new OutcomeDetailResource($this->outcomeDetail, $this->price),
        ];
    }
}

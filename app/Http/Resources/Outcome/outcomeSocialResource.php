<?php

namespace App\Http\Resources\Outcome;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class outcomeSocialResource extends JsonResource
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
            'outcome_id' => $this->outcome_id,
            'date' => date_format($this->created_at, 'D, d M Y H:i:s'),
            'description' => $this->outcome->description,
            'customer' => $this->customer->name,
            'cost' => $this->outcome->total_cost,
            'item' => OutcomeSocialDetailResource::collection($this->outcomeSocialDetails),
        ];
    }
}

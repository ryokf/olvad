<?php

namespace App\Http\Resources\Income;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IncomeResource extends JsonResource
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
            'description' => $this->description,
            'date' => date_format($this->created_at, 'D, d M Y H:i:s'),
            'customer' => new IncomeCustomerResource($this->customer),
            'total' => $this->total_cost,
            'items' => IncomeDetailResource::collection($this->incomeDetails),
        ];
    }
}

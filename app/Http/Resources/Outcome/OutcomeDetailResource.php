<?php

namespace App\Http\Resources\Outcome;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OutcomeDetailResource extends JsonResource
{
    private $price;

    public function __construct($resource, $price)
    {
        parent::__construct($resource);
        $this->price = $price;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'amount' => $this->amount,
            'unit' => $this->unit->unit,
            'total' => $this->price * $this->amount,
        ];
    }
}

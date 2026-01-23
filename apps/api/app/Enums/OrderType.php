<?php

namespace App\Enums;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript] // <--- Penting! Agar Enum ini juga digenerate ke TS
enum OrderType: string
{
    case DELIVERY = 'delivery';
    case PICK_UP = 'pick-up';
}

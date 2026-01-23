declare namespace App.Models {
export type Category = {
id: number
name: string
created_at: string | null
updated_at: string | null
};
export type DetailOrder = {
id: number
order_id: number
product_id: number
qty: unknown /* int */
subtotal_price: unknown /* int */
created_at: string | null
updated_at: string | null
};
export type DetailOrderVariant = {
id: number
detail_order_id: number
product_variant_option_id: number
created_at: string | null
updated_at: string | null
};
export type Order = {
id: number
user_id: number
type: unknown /* enum */
message: string | null
payment_method: unknown /* enum */
total_price: unknown /* int */
status: unknown /* enum */
created_at: string | null
updated_at: string | null
};
export type Product = {
id: number
name: string
description: string | null
category_id: number
photo: string | null
price: unknown /* int */
tags: string | null
created_at: string | null
updated_at: string | null
};
export type ProductVariant = {
id: number
product_id: number
name: string
is_single_selection: unknown /* tinyint */
created_at: string | null
updated_at: string | null
};
export type ProductVariantOption = {
id: number
product_variant_id: number
name: string
add_price: unknown /* int */
created_at: string | null
updated_at: string | null
};
export type User = {
id: number
name: string
email: string
email_verified_at: string | null
created_at: string | null
updated_at: string | null
};
}

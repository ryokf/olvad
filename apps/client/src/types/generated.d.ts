declare namespace App.Models {
export type Category = {
id: number
created_at: string | null
updated_at: string | null
};
export type DetailOrder = {
id: number
created_at: string | null
updated_at: string | null
};
export type DetailOrderVariant = {
id: number
created_at: string | null
updated_at: string | null
};
export type Order = {
id: number
created_at: string | null
updated_at: string | null
};
export type Product = {
id: number
created_at: string | null
updated_at: string | null
};
export type ProductVariant = {
id: number
created_at: string | null
updated_at: string | null
};
export type ProductVariantOption = {
id: number
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

/**
 * Category Types
 * Generated from Laravel migration: 2026_01_23_062928_create_categories_table.php
 */

export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  name?: string;
}

export type CategoryResponse = Category;
export type CategoriesResponse = Category[];

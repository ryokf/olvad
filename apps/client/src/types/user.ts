/**
 * User Types
 * Generated from Laravel migration: 0001_01_01_000000_create_users_table.php
 */

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  password: string;
  remember_token?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

export type UserResponse = User;

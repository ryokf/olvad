-- AlterEnum - Add DINE_IN to OrderType
ALTER TABLE `orders` MODIFY `type` ENUM('delivery', 'pick-up', 'dine-in') NOT NULL;

-- AlterEnum - Update PaymentMethod enum
ALTER TABLE `orders` MODIFY `payment_method` ENUM('qris', 'transfer', 'cashier') NOT NULL;

-- AlterTable orders - Add new columns and modify userId
ALTER TABLE `orders` 
  MODIFY `user_id` INT,
  ADD COLUMN `customer_name` VARCHAR(100) NOT NULL,
  ADD COLUMN `customer_phone` VARCHAR(20) NOT NULL,
  ADD COLUMN `table_number` VARCHAR(50),
  ADD COLUMN `pickup_time` VARCHAR(50),
  ADD COLUMN `delivery_address` TEXT,
  ADD COLUMN `notes` TEXT,
  ADD COLUMN `payment_status` ENUM('unpaid', 'paid') NOT NULL DEFAULT 'unpaid';

-- AddForeignKey for nullable userId
ALTER TABLE `orders` DROP FOREIGN KEY `orders_user_id_fkey`;
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable users - Add role field
ALTER TABLE `users` ADD COLUMN `role` ENUM('customer', 'cashier', 'admin', 'kds') NOT NULL DEFAULT 'customer';


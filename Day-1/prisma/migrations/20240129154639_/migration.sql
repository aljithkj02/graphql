-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `sendBy` INTEGER NOT NULL,

    UNIQUE INDEX `Message_id_key`(`id`),
    UNIQUE INDEX `Message_group_key`(`group`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_sendBy_fkey` FOREIGN KEY (`sendBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

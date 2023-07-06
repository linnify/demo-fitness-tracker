/*
  Warnings:

  - You are about to drop the column `active` on the `PersonalDetails` table. All the data in the column will be lost.
  - Added the required column `lifestyle` to the `PersonalDetails` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserLifestyle" AS ENUM ('sedentary', 'active_low', 'active', 'active_high');

-- AlterTable
ALTER TABLE "PersonalDetails" DROP COLUMN "active",
ADD COLUMN     "lifestyle" "UserLifestyle" NOT NULL;

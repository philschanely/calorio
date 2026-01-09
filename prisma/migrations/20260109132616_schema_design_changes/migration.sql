/*
  Warnings:

  - Added the required column `day` to the `FoodLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `StepLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `WaterLog` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EntryMethod" AS ENUM ('delta', 'total');

-- AlterTable
ALTER TABLE "FoodLog" ADD COLUMN     "day" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "StepLog" ADD COLUMN     "day" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "entryMethod" "EntryMethod" NOT NULL DEFAULT 'delta';

-- AlterTable
ALTER TABLE "UserPreferences" ADD COLUMN     "defaultFoodUnit" "AmountUnit" NOT NULL DEFAULT 'g',
ADD COLUMN     "defaultLiquidUnit" "AmountUnit" NOT NULL DEFAULT 'ml',
ADD COLUMN     "timeZone" TEXT NOT NULL DEFAULT 'America/New_York';

-- AlterTable
ALTER TABLE "WaterLog" ADD COLUMN     "day" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "entryMethod" "EntryMethod" NOT NULL DEFAULT 'delta',
ALTER COLUMN "cupsDelta" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "DailySummary" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "caloriesTotal" INTEGER NOT NULL DEFAULT 0,
    "stepsTotal" INTEGER NOT NULL DEFAULT 0,
    "waterCupsTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "caloriesPct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stepsPct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "waterPct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "overallPct" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "densityScore" DOUBLE PRECISION,
    "densityRating" "DensityRating",
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailySummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailySummary_userId_day_idx" ON "DailySummary"("userId", "day");

-- CreateIndex
CREATE UNIQUE INDEX "DailySummary_userId_day_key" ON "DailySummary"("userId", "day");

-- CreateIndex
CREATE INDEX "FoodLog_userId_day_idx" ON "FoodLog"("userId", "day");

-- CreateIndex
CREATE INDEX "StepLog_userId_day_idx" ON "StepLog"("userId", "day");

-- CreateIndex
CREATE INDEX "WaterLog_userId_day_idx" ON "WaterLog"("userId", "day");

-- AddForeignKey
ALTER TABLE "DailySummary" ADD CONSTRAINT "DailySummary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

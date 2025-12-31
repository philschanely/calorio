-- CreateEnum
CREATE TYPE "AmountUnit" AS ENUM ('g', 'oz', 'ml', 'floz', 'cup');

-- CreateEnum
CREATE TYPE "NormalizationMethod" AS ENUM ('exact', 'density_assumed_1g_per_ml');

-- CreateEnum
CREATE TYPE "DensityRating" AS ENUM ('green', 'yellow', 'red');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stepsGoal" INTEGER NOT NULL DEFAULT 8000,
    "waterCupsGoal" INTEGER NOT NULL DEFAULT 8,
    "caloriesGoal" INTEGER NOT NULL DEFAULT 2000,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "stepsDelta" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StepLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "cupsDelta" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaterLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "calories" INTEGER NOT NULL,
    "isLiquid" BOOLEAN NOT NULL,
    "label" TEXT,
    "amountValue" DOUBLE PRECISION,
    "amountUnit" "AmountUnit",
    "gramsNormalized" DOUBLE PRECISION,
    "mlNormalized" DOUBLE PRECISION,
    "normalizationMethod" "NormalizationMethod",
    "densityCalPerGram" DOUBLE PRECISION,
    "densityRating" "DensityRating",
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "savedFoodId" TEXT,

    CONSTRAINT "FoodLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedFood" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isLiquid" BOOLEAN NOT NULL,
    "defaultCalories" INTEGER,
    "defaultAmountValue" DOUBLE PRECISION,
    "defaultAmountUnit" "AmountUnit",
    "defaultGramsNormalized" DOUBLE PRECISION,
    "defaultMlNormalized" DOUBLE PRECISION,
    "defaultNormalizationMethod" "NormalizationMethod",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedFood_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- CreateIndex
CREATE INDEX "StepLog_userId_occurredAt_idx" ON "StepLog"("userId", "occurredAt");

-- CreateIndex
CREATE INDEX "WaterLog_userId_occurredAt_idx" ON "WaterLog"("userId", "occurredAt");

-- CreateIndex
CREATE INDEX "FoodLog_userId_occurredAt_idx" ON "FoodLog"("userId", "occurredAt");

-- CreateIndex
CREATE INDEX "FoodLog_userId_label_idx" ON "FoodLog"("userId", "label");

-- CreateIndex
CREATE INDEX "FoodLog_userId_savedFoodId_idx" ON "FoodLog"("userId", "savedFoodId");

-- CreateIndex
CREATE INDEX "SavedFood_userId_idx" ON "SavedFood"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedFood_userId_name_key" ON "SavedFood"("userId", "name");

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepLog" ADD CONSTRAINT "StepLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaterLog" ADD CONSTRAINT "WaterLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodLog" ADD CONSTRAINT "FoodLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodLog" ADD CONSTRAINT "FoodLog_savedFoodId_fkey" FOREIGN KEY ("savedFoodId") REFERENCES "SavedFood"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedFood" ADD CONSTRAINT "SavedFood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

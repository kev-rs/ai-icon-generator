-- AlterTable
ALTER TABLE "User" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "CreditsPayment" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 100,
    "receipt_email" TEXT NOT NULL,
    "paidOut" BOOLEAN NOT NULL DEFAULT false,
    "paidAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "CreditsPayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CreditsPayment" ADD CONSTRAINT "CreditsPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

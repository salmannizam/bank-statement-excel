-- CreateTable
CREATE TABLE "bankStatement" (
    "id" SERIAL NOT NULL,
    "transId" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "transactionPostedDate" TIMESTAMP(3),
    "valueDate" TIMESTAMP(3),
    "chequeOrRefNo" TEXT,
    "withdrawalAmt" TEXT,
    "depositAmt" TEXT,
    "closingBalance" TEXT,
    "transactionRemarks" TEXT,
    "bankId" INTEGER NOT NULL,

    CONSTRAINT "bankStatement_pkey" PRIMARY KEY ("id")
);

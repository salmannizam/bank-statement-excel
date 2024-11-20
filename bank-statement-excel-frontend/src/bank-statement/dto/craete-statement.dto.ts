class BankStatementDTO {
    id?: number;
    transId: string;
    transactionDate: Date;
    transactionPostedDate?: Date | null;
    valueDate?: Date | null;
    chequeOrRefNo?: string | null;
    withdrawalAmt?: string | null;
    depositAmt?: string | null;
    closingBalance?: string | null;
    transactionRemarks?: string | null;
    bankId: number;
  }
  
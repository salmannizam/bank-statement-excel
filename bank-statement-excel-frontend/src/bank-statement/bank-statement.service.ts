import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BankStatementService {
    private bankColumns = {
        hdfc: [
            { name: 'transId', type: 'String?' },
            { name: 'transactionDate', type: 'DateTime?' }
            
        ],
        icici: [
            { name: 'transId', type: 'String?' },
            { name: 'transactionDate', type: 'DateTime?' },
            { name: 'settle', type: 'DateTime?' }
            
        ],
       
    };

    constructor(private prisma: PrismaService) {}


    async createStatementTable(bankName: string, tableName: string) {
        // Generate Prisma model definition
        const prismaClient: PrismaClient = this.prisma;
        try {
           const columnName = "avv";
         
          const schema = `model ${tableName} {
            id      Int      @id @default(autoincrement())
            ${columnName} String
          }`;
    
          // Apply the schema
          await prismaClient.$executeRaw`prisma generate`;

    
          // Deploy the schema
          await prismaClient.$executeRaw`prisma migrate deploy`;
            
        } catch (error) {
           console.log(error)
        }
    }


    generatePrismaModel(bankName: string, tableName: string) {
        const modelName = this.capitalizeFirstLetter(tableName);
        const bankColumns = this.bankColumns[bankName];
        
        // Generate model fields based on bank columns
        const modelFields = bankColumns.map((column) => `"${column.name}" ${column.type}`).join(', ');
        return modelFields;
    }


    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}



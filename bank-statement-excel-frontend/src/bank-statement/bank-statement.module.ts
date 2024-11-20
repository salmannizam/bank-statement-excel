import { Module } from '@nestjs/common';
import { BankStatementController } from './bank-statement.controller';
import { BankStatementService } from './bank-statement.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [BankStatementController],
  providers: [BankStatementService,PrismaService]
})
export class BankStatementModule {}

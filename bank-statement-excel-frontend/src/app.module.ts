import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankStatementModule } from './bank-statement/bank-statement.module';

@Module({
  imports: [BankStatementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { BankStatementService } from './bank-statement.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('bank-statement')
export class BankStatementController {

    constructor(private readonly bankStatementService:BankStatementService){}

    @Get()
    getSatement(){
        return "statement datafgfg"
    }


    // @Post()
    // saveStatement(@Body() statement){
    //     return this.bankStatementService.createStatementTable(statement.bank,statement.bankname); 
    // }
    
    @Post('create')
    createStatementTable(@Body() statement){
        return this.bankStatementService.createStatementTable(statement.bank,statement.bankname); 
    }
    
}

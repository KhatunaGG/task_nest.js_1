import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExpensesService, IExpenses } from './expenses.service';
import { IExpenseDto } from './expenses.dto';

@Controller('/expenses')
export class ExpensesController {
    constructor(private expensesService: ExpensesService) { }

    @Get()
    getAllExpenses() {
        return this.expensesService.getAllExpenses()
    }


    @Get('/:id')
    getEpenseById(@Param('id') id) {
        return this.expensesService.getEpenseById(Number(id))
    }

    @Post()
    createExpense(@Body() expense: IExpenseDto) {
        return this.expensesService.createExpense(expense)
    }

    @Delete('/:id')
    deleteExpense(@Param('id') id) {
        return this.expensesService.deleteExpense(Number(id))
    }

    @Put('/:id')
    updateExpense(@Body() expense: IExpenseDto, @Param('id') id) {
        return this.expensesService.updateExpense(expense, Number(id))
    }



}

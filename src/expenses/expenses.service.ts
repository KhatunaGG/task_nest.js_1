import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IExpenseDto } from './expenses.dto';


export interface IExpenses {
    id: number;
    name: string;
    type: string;
    price: number;
}



@Injectable()
export class ExpensesService {

    private expenses = [{ id: 1, name: 'giorgi', type: 'tv', price: 1200 }, { id: 2, name: 'nika', type: 'phone', price: 1000 }]


    getAllExpenses(): IExpenses[] {
        return this.expenses
    }

    getEpenseById(id: number) {
        const expense = this.expenses.find(el => el.id === id)
        if (!expense) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        return expense
    }


    createExpense(body: IExpenseDto) {
        if (!body.name || !body.price || !body.type) throw new HttpException('Name, price and type required', HttpStatus.BAD_REQUEST)
        const lastId = this.expenses[this.expenses.length - 1].id || 0
        const newExpense = {
            id: lastId + 1,
            ...body
        }
        this.expenses.push(newExpense)
        return newExpense
    }


    deleteExpense(id: number) {
        const index = this.expenses.findIndex(el => el.id === id)
        if (index === -1) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        const deleteidExpense = this.expenses.splice(index, 1)
        return deleteidExpense
    }


    updateExpense(expense: IExpenseDto, id: number) {
        const index = this.expenses.findIndex(el => el.id === id)
        if (index === -1) throw new HttpException('Not found', HttpStatus.NOT_FOUND)
        const updatedExpense = {
            ...this.expenses[index],
            ...expense
        }
        this.expenses[index] = updatedExpense
        return updatedExpense
    }

}

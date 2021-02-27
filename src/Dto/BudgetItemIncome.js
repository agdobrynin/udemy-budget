import {BudgetItemAbstract} from "@/Dto/BudgetItemAbstract";

export class BudgetItemIncome extends BudgetItemAbstract {

    get value() {
        return this._value;
    }
}

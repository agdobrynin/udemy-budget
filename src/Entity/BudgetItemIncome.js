import {BudgetItemAbstract} from "@/Entity/BudgetItemAbstract";

export class BudgetItemIncome extends BudgetItemAbstract {

    get value() {
        return this._value;
    }
}

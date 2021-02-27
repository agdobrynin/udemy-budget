import {BudgetItemAbstract} from "@/Entity/BudgetItemAbstract";

export class BudgetItemIncome extends BudgetItemAbstract {
    static _type = "Доход";

    get value() {
        return this._value;
    }
}

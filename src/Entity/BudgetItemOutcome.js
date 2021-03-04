import {BudgetItemAbstract} from "@/Entity/BudgetItemAbstract";

export class BudgetItemOutcome extends BudgetItemAbstract {
    static _typeTitle = "Расход";
    className = "BudgetItemOutcome";

    get value() {
        return -this._value;
    }
}

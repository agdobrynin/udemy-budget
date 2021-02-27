import {BudgetItemAbstract} from "@/Entity/BudgetItemAbstract";

export class BudgetItemOutcome extends BudgetItemAbstract {
    static _typeTitle = "Расход";

    get value() {
        return -this._value;
    }
}

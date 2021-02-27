import {BudgetItemAbstract} from "@/Entity/BudgetItemAbstract";

export class BudgetItemOutcome extends BudgetItemAbstract {
    static _type = "Расход";

    get value() {
        return -this._value;
    }
}

import {BudgetItemAbstract} from "@/Entity/BudgetItemAbstract";

export class BudgetItemOutcome extends BudgetItemAbstract {

    get value() {
        return -this._value;
    }
}

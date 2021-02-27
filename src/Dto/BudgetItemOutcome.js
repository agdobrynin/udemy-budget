import {BudgetItemAbstract} from "@/Dto/BudgetItemAbstract";

export class BudgetItemOutcome extends BudgetItemAbstract {

    get value() {
        return -this._value;
    }
}

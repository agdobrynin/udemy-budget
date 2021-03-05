import BudgetItemAbstract from "@/Entity/BudgetItemAbstract";

export default class BudgetItemOutcome extends BudgetItemAbstract {
    static _typeTitle = "Расход";

    get value() {
        return -this._value;
    }
}

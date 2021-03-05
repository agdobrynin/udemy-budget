import BudgetItemIncome from "@/Entity/BudgetItemIncome";
import BudgetItemOutcome from "@/Entity/BudgetItemOutcome";

export default class BudgetItemFabric {
    static make({className, comment, _value, id}) {
        if (className === BudgetItemIncome.name) {
            return new BudgetItemIncome(comment, _value, id);
        }
        if (className === BudgetItemOutcome.name) {
            return new BudgetItemOutcome(comment, _value, id);
        }

        throw new Error(`Unknown class "${className}"`);
    }
}

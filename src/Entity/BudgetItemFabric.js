import {BudgetItemIncome} from "@/Entity/BudgetItemIncome";
import {BudgetItemOutcome} from "@/Entity/BudgetItemOutcome";

export default class BudgetItemFabric {
    static make({className, comment, _value, id}) {
        if (className === "BudgetItemIncome") {
            return new BudgetItemIncome(comment, _value, id);
        }
        if (className === "BudgetItemOutcome") {
            return new BudgetItemOutcome(comment, _value, id);
        }

        throw new Error(`Unknown class "${className}"`);
    }
}

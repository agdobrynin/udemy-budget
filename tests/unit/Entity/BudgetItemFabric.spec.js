import storageItems from "../storageItems.json";
import BudgetItemFabric from "@/Entity/BudgetItemFabric";
import {BudgetItemIncome} from "@/Entity/BudgetItemIncome";
import {BudgetItemOutcome} from "@/Entity/BudgetItemOutcome";

describe("BudgetItemIncome entity", () => {
    it("Test BudgetItemFabric", () => {
        const {budget: {items}} = storageItems;
        Object.values(items).forEach((item) => {
            const budgetItem = BudgetItemFabric.make(item);

            expect([BudgetItemIncome.name, BudgetItemOutcome.name].includes(budgetItem.constructor.name)).toBeTruthy();

            const {id, comment, _value} = item;
            expect(budgetItem.id).toEqual(id);
            expect(budgetItem.comment).toEqual(comment);

            if (budgetItem instanceof BudgetItemIncome) {
                expect(budgetItem.value).toEqual(_value);
            }

            if (budgetItem instanceof BudgetItemOutcome) {
                expect(-budgetItem.value).toEqual(_value);
            }
        });
    });
});

import {parseStorageItems} from "@/store/budget/persistedstate";
import storageItems from "../storageItems.json";
import BudgetItemIncome from "@/Entity/BudgetItemIncome";
import BudgetItemOutcome from "@/Entity/BudgetItemOutcome";

describe("Vuex-persistedstate Test", () => {
    it("Json parser from localStorage to BudgetItems", () => {
        const store = parseStorageItems(JSON.stringify(storageItems));

        expect(store).toEqual(storageItems);

        expect(Object.values(store.budget.items).length).toEqual(2);

        Object.values(store.budget.items).forEach((budgetItem) => {
            expect([BudgetItemIncome.name, BudgetItemOutcome.name].includes(budgetItem.constructor.name)).toBeTruthy();
        });
    });
});

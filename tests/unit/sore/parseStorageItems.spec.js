import {parseStorageItems} from "@/store/budget/persistedstate";
import storageItems from "../storageItems.json";
import {BudgetItemIncome} from "@/Entity/BudgetItemIncome";
import {BudgetItemOutcome} from "@/Entity/BudgetItemOutcome";

describe("Vuex-persistedstate Test", () => {
    it("Json parser from localStorage to BudgetItems", () => {
        const sourceString = parseStorageItems(JSON.stringify(storageItems));
        const {budget:{items}} = parseStorageItems(sourceString);

        Object.values(items).forEach((budgetItem) => {
            expect([BudgetItemIncome.name, BudgetItemOutcome.name].includes(budgetItem.constructor.name)).toBeTruthy();
        });
    });
});

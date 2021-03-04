import {parseStorageItems} from "@/store/budget/persistedstate";
import storageItems from "../storageItems.json";

describe("Vuex-persistedstate Test", () => {
    it("Json parser from localStorage to BudgetItems", () => {
        const sourceString = parseStorageItems(JSON.stringify(storageItems));
        const {budget:{items}} = parseStorageItems(sourceString);

        Object.values(items).forEach((budgetItem) => {
            expect(["BudgetItemIncome", "BudgetItemOutcome"].includes(budgetItem.className)).toBeTruthy();
        });
    });
});

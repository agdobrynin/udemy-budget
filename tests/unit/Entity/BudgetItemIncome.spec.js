const {BudgetItemIncome} = require("@/Entity/BudgetItemIncome");

describe("BudgetItemIncome entity", () => {
    it("Init with empty constructor", () => {
        const budgetIncome = new BudgetItemIncome();

        expect(budgetIncome.id).toMatch(/([a-z0-9]{10,})/i);
        expect(budgetIncome.typeTitle).toEqual("Доход");
        expect(budgetIncome.comment).toEqual(undefined);
        expect(budgetIncome.value).toEqual(NaN);
    });

    it("Init with not empty constructor", () => {
        const comment = "Привет";
        const value = 150;
        const budgetIncome = new BudgetItemIncome(comment, value);

        expect(budgetIncome.comment).toEqual(comment);
        expect(budgetIncome.value).toEqual(value);
    });

    it("Set negative value", () => {
        const value = 150;
        const budgetIncome = new BudgetItemIncome("", -value);

        expect(budgetIncome.value).toEqual(value);
    });
});
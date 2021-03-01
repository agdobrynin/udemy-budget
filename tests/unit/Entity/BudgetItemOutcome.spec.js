const {BudgetItemOutcome} = require("@/Entity/BudgetItemOutcome");

describe("BudgetItemOutcome entity", () => {
    it("Init with empty constructor", () => {
        const budgetItemOutcome = new BudgetItemOutcome();

        expect(budgetItemOutcome.id).toMatch(/([a-z0-9]{10,})/i);
        expect(budgetItemOutcome.typeTitle).toEqual("Расход");
        expect(budgetItemOutcome.comment).toEqual(undefined);
        expect(budgetItemOutcome.value).toEqual(NaN);
    });

    it("Init with not empty constructor", () => {
        const comment = "Привет";
        const value = 150;
        const budgetIncome = new BudgetItemOutcome(comment, value);

        expect(budgetIncome.comment).toEqual(comment);
        expect(budgetIncome.value).toEqual(-value);
    });

    it("Set negative value", () => {
        const value = -150;
        const budgetIncome = new BudgetItemOutcome("", value);

        expect(budgetIncome.value).toEqual(value);
    });

    it("Set positive value", () => {
        const value = 150;
        const budgetIncome = new BudgetItemOutcome("", value);

        expect(budgetIncome.value).toEqual(-value);
    });

});

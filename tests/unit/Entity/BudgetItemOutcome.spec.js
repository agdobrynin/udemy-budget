import BudgetItemOutcome from "@/Entity/BudgetItemOutcome";

describe("BudgetItemOutcome entity", () => {
    it("Init with empty constructor", () => {
        const budgetItem = new BudgetItemOutcome();

        expect(budgetItem.id).toMatch(/([a-z0-9]{10,})/i);
        expect(budgetItem.typeTitle).toEqual("Расход");
        expect(budgetItem.comment).toEqual(undefined);
        expect(budgetItem.value).toEqual(NaN);
    });

    it("Init with not empty constructor", () => {
        const comment = "Привет";
        const value = 150;
        const budgetItem = new BudgetItemOutcome(comment, value);

        expect(budgetItem.comment).toEqual(comment);
        expect(budgetItem.value).toEqual(-value);
    });

    it("Init with constructor and id", () => {
        const comment = "Привет";
        const value = 150;
        const id = "KLV1FBTZL0TW9";
        const budgetItem = new BudgetItemOutcome(comment, value, id);

        expect(budgetItem.comment).toEqual(comment);
        expect(budgetItem.value).toEqual(-value);
        expect(budgetItem.id).toEqual(id);
    });

    it("Set negative value", () => {
        const value = -150;
        const budgetItem = new BudgetItemOutcome("", value);

        expect(budgetItem.value).toEqual(value);
    });

    it("Set positive value", () => {
        const value = 150;
        const budgetItem = new BudgetItemOutcome("", value);

        expect(budgetItem.value).toEqual(-value);
    });

});

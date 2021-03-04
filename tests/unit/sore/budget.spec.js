import {createLocalVue} from "@vue/test-utils";
import Vuex from "vuex";
import budget from "@/store/budget";
import {BudgetItemOutcome} from "@/Entity/BudgetItemOutcome";
import {BudgetItemIncome} from "@/Entity/BudgetItemIncome";

describe("Base test store for budget", () => {
    let store;
    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        store = new Vuex.Store({
            modules: {
                budget,
            },
        })
    });

    it("Test action addItem, deleteItem", () => {
        const budgetOut = new BudgetItemOutcome("A", 10);
        expect(store.getters["budget/getTotal"]).toBe(0);
        store.dispatch("budget/addItem", budgetOut)
        expect(store.getters["budget/getTotal"]).toBe(budgetOut.value);
        store.dispatch("budget/deleteItem", budgetOut.id);
        expect(store.getters["budget/getTotal"]).toBe(0);
    });

    it("Test getters", () => {
        const budgetOut = new BudgetItemOutcome("A", 10);
        store.dispatch("budget/addItem", budgetOut);
        expect(store.getters["budget/getBudgetItemByType"](budgetOut.typeTitle)).toEqual([budgetOut]);
        expect(store.getters["budget/getBudgetItemByType"](BudgetItemIncome.typeTitle)).toEqual([]);

        const budgetIn = new BudgetItemIncome("B", 10);
        store.dispatch("budget/addItem", budgetIn);
        expect(store.getters["budget/getTotal"]).toEqual(0);
        expect(store.getters["budget/getBudgetItems"]).toEqual([budgetOut, budgetIn]);
    });
});

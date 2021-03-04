import {mount, createLocalVue} from "@vue/test-utils";
import Vuex from "vuex";
import "@/plugins/elements";
import BudgetList, {FILTER_TYPE_ALL_TITLE} from "@/components/BudgetList";
import {BudgetItemOutcome} from "@/Entity/BudgetItemOutcome";
import {BudgetItemIncome} from "@/Entity/BudgetItemIncome";
import budget from "@/store/budget/";

const localVue = createLocalVue()
localVue.use(Vuex);

const selectorAlertEmpty = ".alert-empty";
const selectorBudgetItem = ".budget-item";

describe("BudgetListItem.vue", ()=> {
    let store;

    beforeEach(() => {
        store = new Vuex.Store({
                modules: {
                    budget,
                },
            },
        );
    });

    it("List is empty", () => {
        const wrap = mount(BudgetList, { store, localVue });

        expect(wrap.find(selectorAlertEmpty).exists()).toBeTruthy();
        expect(wrap.find(selectorBudgetItem).exists()).toBeFalsy();
    });

    it("List is not empty", () => {
        const outcome = new BudgetItemOutcome("Расход", 10);
        const income = new BudgetItemIncome("Доход", 10);
        store.state.budget.items = {
            outcome,
            income,
        };
        const wrap = mount(BudgetList, { store, localVue });


        expect(wrap.find(selectorAlertEmpty).exists()).toBeFalsy();
        expect(wrap.find(selectorBudgetItem).exists()).toBeTruthy();
        expect(wrap.findAll(selectorBudgetItem).length).toEqual(2);
    });

    it("Filter income, outcome items", async () => {
        const outcome = new BudgetItemOutcome("Расход", 10);
        const income = new BudgetItemIncome("Доход", 10);
        const income2 = new BudgetItemIncome("Доход 2", 10);

        store.state.budget.items = {
            outcome,
            income,
            income2,
        };
        const wrap = mount(BudgetList, { store, localVue });

        wrap.find(`input[type=radio][value=${FILTER_TYPE_ALL_TITLE}]`).trigger("click");
        expect(wrap.findAll(selectorBudgetItem).length).toEqual(3);

        await wrap.find(`input[type=radio][value=${BudgetItemOutcome.typeTitle}]`).trigger("click");
        expect(wrap.findAll(selectorBudgetItem).length).toEqual(1);

        await wrap.find(`input[type=radio][value=${BudgetItemIncome.typeTitle}]`).trigger("click");
        expect(wrap.findAll(selectorBudgetItem).length).toEqual(2);
    });
});

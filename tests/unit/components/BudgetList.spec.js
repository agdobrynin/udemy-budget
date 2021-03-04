import {createLocalVue, mount, shallowMount} from "@vue/test-utils";
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
        const wrap = shallowMount(BudgetList, { store, localVue });

        expect(wrap.find(selectorAlertEmpty).exists()).toBeTruthy();
        expect(wrap.find(selectorBudgetItem).exists()).toBeFalsy();
    });

    it("List is not empty", () => {
        const outcome = new BudgetItemOutcome("Расход", 10);
        const income = new BudgetItemIncome("Доход", 10);

        store.dispatch("budget/addItem", outcome);
        store.dispatch("budget/addItem", income);
        const wrap = shallowMount(BudgetList, { store, localVue });
        expect(wrap.find(selectorBudgetItem).exists()).toBeTruthy();
        expect(wrap.findAll(selectorBudgetItem).length).toEqual(2);
        expect(wrap.find(selectorAlertEmpty).exists()).toBeFalsy();
    });

    it("Filter income, outcome items", async () => {
        const outcome = new BudgetItemOutcome("Расход", 10);
        const income = new BudgetItemIncome("Доход", 10);
        const income2 = new BudgetItemIncome("Доход 2", 10);

        store.dispatch("budget/clearItems");
        store.dispatch("budget/addItem", outcome);
        store.dispatch("budget/addItem", income);
        store.dispatch("budget/addItem", income2);

        const wrap = mount(BudgetList, { store, localVue });

        wrap.find(`input[type=radio][value=${FILTER_TYPE_ALL_TITLE}]`).trigger("click");
        expect(wrap.findAll(selectorBudgetItem).length).toEqual(3);

        await wrap.find(`input[type=radio][value=${BudgetItemOutcome.typeTitle}]`).trigger("click");
        expect(wrap.findAll(selectorBudgetItem).length).toEqual(1);

        await wrap.find(`input[type=radio][value=${BudgetItemIncome.typeTitle}]`).trigger("click");
        expect(wrap.findAll(selectorBudgetItem).length).toEqual(2);
    });
});

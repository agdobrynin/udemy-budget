import {mount} from "@vue/test-utils";
import "@/plugins/elements";
import BudgetList, {FILTER_TYPE_ALL_TITLE} from "@/components/BudgetList";
import {BudgetItemOutcome} from "@/Entity/BudgetItemOutcome";
import {BudgetItemIncome} from "@/Entity/BudgetItemIncome";

const component = (BudgetItems) => mount(BudgetList, {propsData: {list: BudgetItems},});
const selectorAlertEmpty = ".alert-empty";
const selectorBudgerItem = ".budget-item";

describe("BudgetListItem.vue", ()=> {
    it("List is empty", () => {
        const wrap = component([]);

        expect(wrap.find(selectorAlertEmpty).exists()).toBeTruthy();
        expect(wrap.find(selectorBudgerItem).exists()).toBeFalsy();
    });

    it("List is not empty", () => {
        const outcome = new BudgetItemOutcome("Расход", 10);
        const income = new BudgetItemIncome("Доход", 10);
        const list = [outcome, income];
        const wrap = component(list);


        expect(wrap.find(selectorAlertEmpty).exists()).toBeFalsy();
        expect(wrap.find(selectorBudgerItem).exists()).toBeTruthy();
        expect(wrap.findAll(selectorBudgerItem).length).toEqual(list.length);
    });

    it("Filter income, outcome items", async () => {
        const outcome = new BudgetItemOutcome("Расход", 10);
        const income = new BudgetItemIncome("Доход", 10);
        const income2 = new BudgetItemIncome("Доход 2", 10);
        const list = [outcome, income, income2];
        const wrap = component(list);

        wrap.find(`input[type=radio][value=${FILTER_TYPE_ALL_TITLE}]`).trigger("click");
        expect(wrap.findAll(selectorBudgerItem).length).toEqual(list.length);

        await wrap.find(`input[type=radio][value=${BudgetItemOutcome.typeTitle}]`).trigger("click");
        expect(wrap.findAll(selectorBudgerItem).length).toEqual(1);

        await wrap.find(`input[type=radio][value=${BudgetItemIncome.typeTitle}]`).trigger("click");
        expect(wrap.findAll(selectorBudgerItem).length).toEqual(2);
    });
});

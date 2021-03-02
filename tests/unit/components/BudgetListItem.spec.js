import {mount} from "@vue/test-utils";
import "@/plugins/elements";
import BudgetListItem from "@/components/BudgetListItem";
import {BudgetItemIncome} from "@/Entity/BudgetItemIncome";

const component = (BudgetItem) => mount(BudgetListItem, {propsData: {BudgetItem},});

describe("BudgetListItem.vue", () => {
    it("BudgetItemIncome front interface", async () => {
        const comment = "Привет";
        const value = 50;

        const wrapper = component(new BudgetItemIncome(comment, value));

        expect(wrapper.find(".list-item .icon i").exists()).toBeTruthy();
        expect(wrapper.find(".green.el-icon-top").exists()).toBeTruthy();
        expect(wrapper.find(".comment").text()).toEqual(comment);
        expect(wrapper.find(".value").text()).toEqual("" + value);
        expect(wrapper.find(".value.green").exists()).toBeTruthy();

        await wrapper.find("button").trigger("click", {button: 0});
        // Диалог показан
        expect(wrapper.find(".confirm-dialog").exists()).toBeTruthy();
        // кнопка нет
        await wrapper.find(".confirm-dialog button.confirm-no").trigger("click");
        // событие (emit) удаления не вызвано
        expect(wrapper.emitted().deleteBudgetItem).toBeFalsy();
        // диалог скрыт
        expect(wrapper.find(".confirm-dialog").exists()).toBeFalsy();

        await wrapper.find("button").trigger("click", {button: 0});
        // Диалог показан
        expect(wrapper.find(".confirm-dialog").exists()).toBeTruthy();
        // кнопка нет
        await wrapper.find(".confirm-dialog button.confirm-yes").trigger("click");
        // событие (emit) удаления не вызвано
        expect(wrapper.emitted().deleteBudgetItem).toBeTruthy();
    });
});

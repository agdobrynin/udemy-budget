import {createLocalVue, mount} from "@vue/test-utils";
import "@/plugins/elements";
import BudgetFormItem from "@/components/BudgetFormItem";
import BudgetItemIncome from "@/Entity/BudgetItemIncome";
import Vuex from "vuex";
import budget from "./BudgetList.spec";

const selectorErrorFormItem = ".el-form-item.is-error";

const localVue = createLocalVue()
localVue.use(Vuex);

describe("Form for add new BudgetItem", () => {
    let wrapper, store;

    beforeEach(() => {
        store = new Vuex.Store({
                modules: {
                    budget,
                },
            },
        );
        wrapper = mount(BudgetFormItem, { store, localVue });
    });

    it("Form exist", () => {
        expect(wrapper.find("form.form-new-budget-item").isVisible()).toBeTruthy();
    });

    it("Budget income", async () => {
        // Данные в поле тип операции.
        wrapper.vm.formData.type = BudgetItemIncome.typeTitle;
        const typeBudget = wrapper.find(".form-new-budget-type input");
        await typeBudget.trigger("input");
        expect(wrapper.vm.formData.type).toEqual(typeBudget.element.value);

        // Вводим данные в поле значение (сумма)
        const value = 100;

        const valueInput = wrapper.find("form .form-new-budget-value input");
        valueInput.element.value = value;
        await valueInput.trigger("input");
        expect(wrapper.vm.formData.value).toEqual(value);

        // Вводим данные в поле значение (сумма)
        const comment = "Доход";

        const commentInput = wrapper.find("form .form-new-budget-comment input");
        commentInput.element.value = comment;
        await commentInput.trigger("input");
        expect(wrapper.vm.formData.comment).toEqual(comment);

        const form = wrapper.find("form");
        await form.trigger("submit");
        // Вызвана передача в родительский компонент
        expect(wrapper.emitted().newBudgetItem).toBeTruthy();
        // Ожидаемый тип BudgetItemIncome
        expect(wrapper.emitted().newBudgetItem[0][0]).toBeInstanceOf(BudgetItemIncome);
    });

    it("Validation error - 3 fields with error", async () => {
        // 3 поля, не заполнены 3 ошибки
        await wrapper.find("form").trigger("submit");
        expect(wrapper.findAll(selectorErrorFormItem).length).toEqual(3);
    });

    it("Validation error - 1 fields correct, 2 fields with error", async () => {
        // Поле (data) тип операции заполнено, 2 поля с ошибками
        wrapper.vm.formData.type = BudgetItemIncome.typeTitle;
        await wrapper.find("form").trigger("submit");
        expect(wrapper.findAll(selectorErrorFormItem).length).toEqual(2);
    });

    it("Validation error - 2 fields is valid, 1 fields is wrong", async () => {
        // Поле (data) тип операции и комментарий заполнены, 1 поле с ошибкой
        wrapper.vm.formData.type = BudgetItemIncome.typeTitle;
        wrapper.vm.formData.comment = "Привет!";
        await wrapper.find("form").trigger("submit");
        expect(wrapper.findAll(selectorErrorFormItem).length).toEqual(1);
    });

    it("Validation error, test wrong 'value' (sum of budget)", async () => {
        // 2 поля корректные.
        wrapper.vm.formData.type = BudgetItemIncome.typeTitle;
        wrapper.vm.formData.comment = "Привет!";

        // "value" не число, 1 поле с ошибкой
        wrapper.vm.formData.value = "строка не может быть цифрой";
        await wrapper.find("form").trigger("submit");
        expect(wrapper.findAll(selectorErrorFormItem).length).toEqual(1);

        // "value" отрицательное число, 1 поле с ошибкой
        wrapper.vm.formData.value = -10;
        await wrapper.find("form").trigger("submit");
        expect(wrapper.findAll(selectorErrorFormItem).length).toEqual(1);

        // "value" ноль, 1 поле с ошибкой
        wrapper.vm.formData.value = 0;
        await wrapper.find("form").trigger("submit");
        expect(wrapper.findAll(selectorErrorFormItem).length).toEqual(1);
    });

    it("No error, all fields is valid", async () => {
        // Все поля корректны
        wrapper.vm.formData.type = BudgetItemIncome.typeTitle;
        wrapper.vm.formData.comment = "Привет!";
        wrapper.vm.formData.value = 100;
        await wrapper.find("form").trigger("submit");
        expect(wrapper.findAll(selectorErrorFormItem).length).toEqual(0);
        // Вызвана передача в родительский компонент
        expect(wrapper.emitted().newBudgetItem).toBeTruthy();
        // Ожидаемый тип BudgetItemIncome
        expect(wrapper.emitted().newBudgetItem[0][0]).toBeInstanceOf(BudgetItemIncome);
    });
});

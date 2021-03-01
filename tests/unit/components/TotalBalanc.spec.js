import { shallowMount } from "@vue/test-utils";
import TotalBalance from "@/components/TotalBalance";
import "@/plugins/elements";

const factoryBalanceComponent = (balance) => shallowMount(TotalBalance, {propsData: {total: balance}});

describe("TotalBalance.vue", () => {
    it("Renders props.total when passed more then zero", () => {
        const total = 100;
        const wrapper = factoryBalanceComponent(total);
        expect(wrapper.find(".balance span.balance-value").text()).toEqual(`${total}`);
        expect(wrapper.find(".balance.green").exists()).toBe(true)
    });

    it("Renders props.total when passed less then zero", () => {
        const total = -100;
        const wrapper = factoryBalanceComponent(total);
        expect(wrapper.find(".balance span.balance-value").text()).toEqual(`${total}`);
        expect(wrapper.find(".balance.red").exists()).toBe(true)
    })
})
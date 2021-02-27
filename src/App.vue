<template>
  <div id="app">
    <BudgetFormItem></BudgetFormItem>
    <TotalBalance :total="totalBalance"></TotalBalance>
    <BudgetList :list="list" @deleteItem="deleteItem"></BudgetList>
  </div>
</template>

<script>
import BudgetList from "@/components/BudgetList";
import TotalBalance from "@/components/TotalBalance";
import {BudgetItemIncome} from "@/Entity/BudgetItemIncome";
import {BudgetItemOutcome} from "@/Entity/BudgetItemOutcome";
import BudgetFormItem from "@/components/BudgetFormItem";

export default {
  name: "App",

  components: {
    BudgetList,
    TotalBalance,
    BudgetFormItem,
  },

  data: () => ({
    /**
     * @type{BudgetItemIncome|BudgetItemOutcome[]} list
     */
    list: [],
  }),

  methods: {
    deleteItem(id) {
      const index = this.list.findIndex(item => item.id === id);
      if (index >= 0) {
        this.$delete(this.list, index);
      }
    }
  },

  computed: {
    totalBalance() {
      /** @type{BudgetItemIncome|BudgetItemOutcome} balanceItem */
      return this.list.reduce((acc, balanceItem) => acc + balanceItem.value, 0);
    }
  },

  created: function () {
    this.list.push(new BudgetItemIncome("Первое поступление", 100));
    this.list.push(new BudgetItemOutcome("Первый расход", 50));
  },
}
</script>

<style scoped>
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  width: 500px;
  margin: 60px auto;
}
</style>

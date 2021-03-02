<template>
  <div id="app">
    <BudgetFormItem @newBudgetItem="newBudgetItem"></BudgetFormItem>
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
    /**
     * Удалить из списка
     * @param {string} id
     */
    deleteItem(id) {
      const index = this.list.findIndex(item => item.id === id);
      if (index >= 0) {
        this.$delete(this.list, index);
      }
    },

    /**
     * Добавить новый доход/расход
     * @param {BudgetItemOutcome|BudgetItemIncome} budgetEntity
     */
    newBudgetItem(budgetEntity) {
      this.list.push(budgetEntity);
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
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  text-align: center;
  color: #2c3e50;
  width: 500px;
  margin: 60px auto;
}
</style>

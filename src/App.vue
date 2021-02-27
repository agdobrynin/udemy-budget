<template>
  <div id="app">
    <TotalBalance :total="totalBalance"></TotalBalance>
    <BudgetList :list="list" @deleteItem="deleteItem"></BudgetList>
  </div>
</template>

<script>
import BudgetList from "@/components/BudgetList";
import TotalBalance from "@/components/TotalBalance";
import {BalanceItem} from "@/Dto/BalanceItem";

export default {
  name: "App",

  components: {
    BudgetList,
    TotalBalance
  },

  data: () => ({
    /**
     * @type{BalanceItem[]} list
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
      /** @type{BalanceItem} balanceItem */
      return this.list.reduce((acc, balanceItem) => acc + balanceItem.value, 0);
    }
  },

  created: function () {
    this.list.push(new BalanceItem("Первое поступление", 100, 1));
    this.list.push(new BalanceItem("Первый расход", -50, 2));
  },
}
</script>

<style scoped>
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

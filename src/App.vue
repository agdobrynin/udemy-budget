<template>
  <div id="app">
    <BudgetFormItem @newBudgetItem="addItem"></BudgetFormItem>
    <TotalBalance v-if="getTotal !==0" :total="getTotal"></TotalBalance>
    <p v-else></p>
    <BudgetList></BudgetList>
  </div>
</template>

<script>
import BudgetList from "@/components/BudgetList";
import TotalBalance from "@/components/TotalBalance";
import BudgetFormItem from "@/components/BudgetFormItem";
import {mapGetters, mapActions} from "vuex";
import {BudgetItemIncome} from "@/Entity/BudgetItemIncome";
import {BudgetItemOutcome} from "@/Entity/BudgetItemOutcome";

export default {
  name: "App",

  components: {
    BudgetList,
    TotalBalance,
    BudgetFormItem,
  },

  methods: {
    ...mapActions("budget", ["addItem"]),
  },

  computed: {
    ...mapGetters("budget", ["getBudgetItems", "getTotal",]),
  },

  created: function () {
    this.addItem(new BudgetItemIncome("Первое поступление", 100));
    this.addItem(new BudgetItemOutcome("Первый расход", 50));
  },
}
</script>

<style scoped>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  width: 500px;
  margin: 60px auto;
}
</style>

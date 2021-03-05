<template>
  <div id="app">
    <BudgetFormItem @newBudgetItem="addItem"></BudgetFormItem>
    <TotalBalance v-if="getTotal !==0" :total="getTotal"></TotalBalance>
    <p v-else></p>
    <BudgetList></BudgetList>
    <Dialog
        class="confirm-dialog"
        title="Заполнить тестовыми данными?"
        v-if="showDialog"
        :visible.sync="showDialog">
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" class="confirm-no">Нет</el-button>
        <el-button type="primary" class="confirm-yes" @click="fillTestBudget">Да</el-button>
      </span>
    </Dialog>
  </div>
</template>

<script>
import BudgetList from "@/components/BudgetList";
import TotalBalance from "@/components/TotalBalance";
import BudgetFormItem from "@/components/BudgetFormItem";
import {mapGetters, mapActions} from "vuex";
import BudgetItemIncome from "@/Entity/BudgetItemIncome";
import BudgetItemOutcome from "@/Entity/BudgetItemOutcome";
import {Dialog} from "element-ui";

export default {
  name: "App",

  components: {
    BudgetList,
    TotalBalance,
    BudgetFormItem,
    Dialog,
  },

  data: () => ({
    showDialog: false,
  }),

  methods: {
    ...mapActions("budget", ["addItem"]),

    fillTestBudget() {
      this.addItem(new BudgetItemIncome("Первое поступление", 100));
      this.addItem(new BudgetItemOutcome("Первый расход", 50));
      this.showDialog = false;
    },
  },

  computed: {
    ...mapGetters("budget", ["getBudgetItems", "getTotal",]),
  },

  created: function () {
    if (!this.getBudgetItems.length) {
      this.showDialog = true;
    }
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

<template>
  <div class="list-item">
    <span class="icon">
      <i :class="isNegative ? 'red el-icon-bottom': 'green el-icon-top'"></i>
    </span>
    <span class="comment">{{ BudgetItem.comment }}</span>
    <span class="value" :class="isNegative ? 'red': 'green'">{{ BudgetItem.value }}</span>
    <ElButton type="danger" @click.prevent="showDialog = true">удалить</ElButton>
    <Dialog
        class="confirm-dialog"
        title="Удалить запись?"
        v-if="showDialog"
        :visible.sync="showDialog">
      <p>Удалить {{BudgetItem.typeTitle}} "{{BudgetItem.comment}}" и суммой <strong>{{BudgetItem.value}}</strong></p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" class="confirm-no">Нет</el-button>
        <el-button type="primary" class="confirm-yes" @click="deleteItem(BudgetItem.id)">Да</el-button>
      </span>
    </Dialog>
  </div>
</template>

<script>
import {Dialog} from "element-ui";

export default {
  name: "BudgetListItem",

  components: {
    Dialog
  },

  props: {
    BudgetItem: {
      /** @type{BudgetItemOutcome|BudgetItemIncome} */
      type: Object,
      default: () => ({}),
    }
  },

  data: () => ({
    showDialog: false,
  }),

  methods: {
    async deleteItem(id) {
      this.$emit("deleteBudgetItem", id);
    },
  },

  computed: {
    isNegative: self => self.BudgetItem.value < 0,
  }
}
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}

.value {
  font-weight: bold;
  margin-left: auto;
  margin-right: 20px;
}

.red {
  color: red;
}

.green {
  color: green;
}

.icon {
  color: #606266;
  margin: 0 20px;
  font-size: 1.5em;
  vertical-align: middle;
}
</style>
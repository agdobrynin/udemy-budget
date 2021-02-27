<template>
  <div class="list-item">
    <span class="icon">
      <i :class="isNegative ? 'red el-icon-bottom': 'green el-icon-top'"></i>
    </span>
    <span class="comment">{{ BudgetItem.comment }}</span>
    <span class="value" :class="isNegative ? 'red': 'green'">{{ BudgetItem.value }}</span>
    <ElButton type="danger" @click.prevent="deleteItem(BudgetItem.id)">удалить</ElButton>
  </div>
</template>

<script>
import {MessageBox} from "element-ui";

export default {
  name: "BudgetListItem",

  props: {
    BudgetItem: {
      /** @type{BudgetItemOutcome|BudgetItemIncome} */
      type: Object,
      default: () => ({}),
    }
  },

  methods: {
    deleteItem(id) {
      const { comment, value, typeTitle } = this.BudgetItem;

      MessageBox.confirm(
          `Удалить ${typeTitle} "${comment}" и суммой ${value}?`,
          "Подтверждение удаления",
          {
            confirmButtonText: "Да",
            cancelButtonText: "Нет",
            type: "warning"
          }).then((res) => {
        if ("confirm" === res) {
          this.$emit("deleteBudgetItem", id);
        }
      }).catch(() => {
      });
    }
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
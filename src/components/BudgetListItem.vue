<template>
  <div class="list-item">
    <span class="comment">{{ BudgetItem.comment }}</span>
    <span class="value">{{ BudgetItem.value }}</span>
    <ElButton type="danger" @click.prevent="deleteItem(BudgetItem.id)">удалить</ElButton>
  </div>
</template>

<script>
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
      this.$emit("deleteBudgetItem", id);
    }
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

</style>
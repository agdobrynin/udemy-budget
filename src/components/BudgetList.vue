<template>
  <div class="budget-list-wrap">
    <ElCard :header="header">
      <template v-if="!isEmpty">
        <div class="list-item" v-for="item in list" :key="item.id">
          <span class="comment">{{ item.comment }}</span>
          <span class="value">{{ item.value }}</span>
          <ElButton type="danger" @click.prevent="deleteItem(item.id)">удалить</ElButton>
        </div>
      </template>
      <ElAlert v-else type="info" show-icon :closable="false">Записей нет.</ElAlert>
    </ElCard>
  </div>
</template>

<script>

export default {
  name: "BudgetList",
  props: {
    list: {
      /** @type{Array<BudgetItemOutcome|BudgetItemIncome>} */
      type: Array,
      default: () => ({}),
    }
  },
  data: () => ({
    header: "Бюджет",
  }),
  computed: {
    isEmpty() {
      return !Object.keys(this.list).length;
    }
  },
  methods: {
    deleteItem(id) {
      this.$emit("deleteItem", id);
    }
  },
}
</script>

<style scoped>
.budget-list-wrap {
  margin: auto;
}

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
<template>
  <div class="budget-list-wrap">
    <ElCard :header="header">
      <template v-if="!isEmpty">
        <BudgetListItem v-for="item in list"
                        :key="item.id"
                        :budget-item="item"
                        @deleteBudgetItem="deleteBudgetItem">
        </BudgetListItem>
      </template>
      <ElAlert v-else type="info" show-icon :closable="false">Записей нет.</ElAlert>
    </ElCard>
  </div>
</template>

<script>

import BudgetListItem from "@/components/BudgetListItem";

export default {
  name: "BudgetList",

  components: {
    BudgetListItem
  },

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
    deleteBudgetItem(id) {
      this.$emit("deleteItem", id);
    }
  },
}
</script>

<style scoped>
.budget-list-wrap {
  margin: auto;
}
</style>
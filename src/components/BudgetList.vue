<template>
  <div class="budget-list-wrap">
    <ElCard :header="header">
      <template v-if="!isEmpty">
        <div class="list-item" v-for="(item, prop) in list" :key="prop">
          <span class="comment">{{ item.comment }}</span>
          <span class="value">{{ item.value }}</span>
          <ElButton type="danger">удалить</ElButton>
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
      type: Object,
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
  }
}
</script>

<style scoped>
 .budget-list-wrap {
   max-width: 500px;
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
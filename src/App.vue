<template>
  <div id="app">
    <BudgetList :list="list"></BudgetList>
  </div>
</template>

<script>
import BudgetList from "@/components/BudgetList";


export default {
  name: "App",
  components: {
    BudgetList
  },
  data: () => ({
    list: {
      1: {
        type: "INCOME",
        value: 100,
        comment: "Приход 1",
        id: 1,
      },
      2: {
        type: "OUTCOME",
        value: -50,
        comment: "Расход 1",
        id: 2,
      },
    },
  }),
}
</script>

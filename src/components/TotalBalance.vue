<template>
  <ElCard class="balance" :class="isNegative ? 'red': 'green'">
    Баланс = <span class="balance-value">{{ total }}</span>
  </ElCard>
</template>

<script>
export default {
  name: "TotalBalance",

  props: {
    total: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    isNegative: self => self.total < 0,
  }
}
</script>

<style scoped>
.balance {
  font-size: 28px;
  margin: 1em 0em;
}
.red {
  color: red;
}

.green {
  color: green;
}
</style>
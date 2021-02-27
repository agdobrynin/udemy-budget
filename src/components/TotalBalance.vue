<template>
  <ElCard class="balance">
    Баланс = {{ total }}
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
  }
}
</script>

<style scoped>
.balance {
  font-size: 28px;
  margin: 1em 0em;
}
</style>
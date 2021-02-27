<template>
  <div class="balance">
    Баланс = {{ total }}
  </div>
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
  font-weight: bold;
  padding: 1.2em 0em;
}
</style>
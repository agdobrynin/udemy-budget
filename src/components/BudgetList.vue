<template>
  <div class="budget-list-wrap">
    <ElCard>
      <div slot="header" class="clearfix header">
        <span>{{ header }}</span>
        <ElSelect class="filter" v-model="typeBudget">
          <ElOption v-for="(typeBudget, index) in typeOfBudgetTitles"
                    :key="index"
                    :value="typeBudget"></ElOption>
        </ElSelect>
      </div>
      <template v-if="!isEmpty">
        <BudgetListItem v-for="item in filteredList"
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
import {BudgetItemIncome} from "@/Entity/BudgetItemIncome";
import {BudgetItemOutcome} from "@/Entity/BudgetItemOutcome";

const FILTER_TYPE_ALL_TITLE = "Всё";

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
    header: "Расходы и доходы",
    typeOfBudgetTitles: [],
    typeBudget: FILTER_TYPE_ALL_TITLE,
    filteredList: [],
  }),

  computed: {
    isEmpty() {
      return !Object.keys(this.filteredList).length;
    },
  },

  methods: {
    deleteBudgetItem(id) {
      this.$emit("deleteItem", id);
    },

    filter(type) {
      if (FILTER_TYPE_ALL_TITLE === type) {
        this.filteredList = this.list;
        return;
      }

      this.filteredList = this.list.filter((item) => {
        return item.constructor.type === type;
      });
    }
  },

  watch: {
    list() {
      this.filter(this.typeBudget);
    },

    typeBudget() {
      this.filter(this.typeBudget);
    },
  },

  created() {
    this.typeOfBudgetTitles.push(this.typeBudget);
    this.typeOfBudgetTitles.push(BudgetItemIncome.type);
    this.typeOfBudgetTitles.push(BudgetItemOutcome.type);
    this.filteredList = this.list;
  },
}
</script>

<style scoped>
.budget-list-wrap {
  margin: auto;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  align-content: stretch;
}

.filter {
  margin-left: auto;
}
</style>
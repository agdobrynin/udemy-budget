<template>
  <div class="budget-list-wrap">
    <ElCard>
      <ElRow :gutter="10" slot="header" align="middle" type="flex">
        <ElCol v-if="showFilteredBalance" :span="12" :class="filterTotalClassName">
          {{ this.typeBudget }}: {{ filterTotal}}
        </ElCol>
        <ElCol v-else :span="12">
          <el-button size="small" @click="clearItems" :disabled="isEmpty">удалить всё</el-button>
        </ElCol>
        <ElCol :span="12">
          <radio-group v-model="typeBudget" class="filter" size="small">
            <radio-button v-for="(typeBudget, index) in typeOfBudgetTitles"
                          :key="index"
                          class="filter-item"
                          :label="typeBudget">{{ typeBudget }}
            </radio-button>
          </radio-group>
        </ElCol>
      </ElRow>
      <template v-if="!isEmpty">
        <BudgetListItem v-for="item in filteredList"
                        :key="item.id"
                        :budget-item="item"
                        class="budget-item"
                        @deleteBudgetItem="deleteItem">
        </BudgetListItem>
      </template>
      <ElAlert v-else type="info" show-icon :closable="false" class="alert-empty">Записей нет.</ElAlert>
    </ElCard>
  </div>
</template>

<script>

import BudgetListItem from "@/components/BudgetListItem";
import BudgetItemIncome from "@/Entity/BudgetItemIncome";
import BudgetItemOutcome from "@/Entity/BudgetItemOutcome";
import {RadioGroup, RadioButton} from "element-ui";
import {mapActions, mapGetters} from "vuex";

export const FILTER_TYPE_ALL_TITLE = "Всё";

export default {
  name: "BudgetList",

  components: {
    BudgetListItem,
    RadioGroup,
    RadioButton,
  },

  data: () => ({
    typeOfBudgetTitles: [],
    typeBudget: FILTER_TYPE_ALL_TITLE,
  }),

  computed: {
    ...mapGetters("budget", ["getBudgetItems", "getBudgetItemByType",]),

    filteredList() {
      const budgetTitle = this.typeBudget === FILTER_TYPE_ALL_TITLE ? "" : this.typeBudget;

      return this.getBudgetItemByType(budgetTitle);
    },

    isEmpty() {
      return !Object.keys(this.filteredList).length;
    },

    filterTotalClassName() {
      if (this.filterTotal > 0) {
        return "green";
      }

      if (this.filterTotal < 0) {
        return "red";
      }

      return "gray";
    },

    filterTotal() {
      /** @type{BudgetItemIncome|BudgetItemOutcome} balanceItem */
      return this.filteredList.reduce((acc, balanceItem) => acc + balanceItem.value, 0);
    },

    showFilteredBalance() {
      return !(this.typeBudget === FILTER_TYPE_ALL_TITLE);
    },
  },

  methods: {
    ...mapActions("budget", ["deleteItem", "clearItems"]),
  },

  created() {
    this.typeOfBudgetTitles.push(this.typeBudget);
    this.typeOfBudgetTitles.push(BudgetItemIncome.typeTitle);
    this.typeOfBudgetTitles.push(BudgetItemOutcome.typeTitle);
  },
}
</script>

<style scoped>
.budget-list-wrap {
  margin: auto;
}

.red {
  color: red;
}

.green {
  color: green;
}

.gray {
  color: gray;
}
</style>
<template>
  <div class="budget-list-wrap">
    <ElCard>
      <div slot="header" class="clearfix header">
        <span>{{ header }}</span>
        <span v-if="showFilteredBalance"
              class="filtered-balance"
              :class="filterTotalClassName">
          {{ filterTotal }}
        </span>

        <radio-group v-model="typeBudget" class="filter">
          <radio-button v-for="(typeBudget, index) in typeOfBudgetTitles"
                        :key="index"
                        class="filter-item"
                        :label="typeBudget">{{ typeBudget }}
          </radio-button>
        </radio-group>
      </div>
      <template v-if="!isEmpty">
        <BudgetListItem v-for="item in filteredList"
                        :key="item.id"
                        :budget-item="item"
                        class="budget-item"
                        @deleteBudgetItem="deleteBudgetItem">
        </BudgetListItem>
      </template>
      <ElAlert v-else type="info" show-icon :closable="false" class="alert-empty">Записей нет.</ElAlert>
    </ElCard>
  </div>
</template>

<script>

import BudgetListItem from "@/components/BudgetListItem";
import {BudgetItemIncome} from "@/Entity/BudgetItemIncome";
import {BudgetItemOutcome} from "@/Entity/BudgetItemOutcome";
import {RadioGroup, RadioButton} from "element-ui";
import {mapActions, mapGetters} from "vuex";

export const FILTER_TYPE_ALL_TITLE = "Всё";

export default {
  name: "BudgetList",

  components: {
    BudgetListItem,
    RadioGroup,
    RadioButton
  },

  data: () => ({
    typeOfBudgetTitles: [],
    typeBudget: FILTER_TYPE_ALL_TITLE,
    filteredList: [],
  }),

  computed: {
    ...mapGetters("budget", ["getBudgetItems"]),

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

    header() {
      if (this.typeBudget === FILTER_TYPE_ALL_TITLE) {
        return "Расходы и доходы";
      }

      return this.typeBudget;
    },
  },

  methods: {
    ...mapActions("budget", ["deleteItem"]),

    deleteBudgetItem(id) {
      this.deleteItem(id);
    },

    filter(type) {
      if (FILTER_TYPE_ALL_TITLE === type) {
        this.filteredList = this.getBudgetItems;
        return;
      }

      this.filteredList = this.getBudgetItems.filter((item) => {
        return item.typeTitle === type;
      });
    }
  },

  watch: {
    getBudgetItems() {
      this.filter(this.typeBudget);
    },

    typeBudget() {
      this.filter(this.typeBudget);
    },
  },

  created() {
    this.typeOfBudgetTitles.push(this.typeBudget);
    this.typeOfBudgetTitles.push(BudgetItemIncome.typeTitle);
    this.typeOfBudgetTitles.push(BudgetItemOutcome.typeTitle);
    this.filteredList = this.getBudgetItems;
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

.filtered-balance {
  margin: 0 1em;
  font-weight: bold;
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
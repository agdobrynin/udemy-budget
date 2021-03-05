import Vue from "vue";

export default {
    namespaced: true,

    state: {
        /**
         * @type{Object<BudgetItemIncome|BudgetItemOutcome>} items
         */
        items: {},
    },

    getters: {
        getBudgetItems: ({items}) => Object.values(items),

        getTotal: ({items}) => {
            /** @type {BudgetItemIncome|BudgetItemOutcome} budgetItem */
            return Object.values(items).reduce((acc, budgetItem) => acc + budgetItem.value, 0)
        },

        getBudgetItemByTitle: (store, getters) => budgetTitle => {
            if (budgetTitle === undefined || !budgetTitle) {
                return getters.getBudgetItems;
            }

            return getters.getBudgetItems.filter(budgetItem => budgetItem.constructor?.typeTitle === budgetTitle);
        },
    },

    mutations: {
        /**
         * @param {Object} state
         * @param {BudgetItemIncome|BudgetItemOutcome} budgetItem
         */
        ADD_ITEM(state, budgetItem) {
            Vue.set(state.items, budgetItem.id, budgetItem);
        },

        /**
         * @param {Object} state
         * @param {string} budgetItemUid
         */
        DELETE_ITEM(state, budgetItemUid) {
            Vue.delete(state.items, budgetItemUid);
        },

        CLEAR_ITEMS(state) {
            state.items = {};
        }
    },

    actions: {
        /**
         * @param commit
         * @param {BudgetItemIncome|BudgetItemOutcome} budgetItem
         */
        addItem({commit}, budgetItem) {
            commit("ADD_ITEM", budgetItem);
        },

        deleteItem({commit}, budgetItemUid) {
            commit("DELETE_ITEM", budgetItemUid);
        },

        clearItems({commit}) {
            commit("CLEAR_ITEMS");
        }
    },
}

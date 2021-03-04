import Vue from "vue";

export default {
    namespaced: true,

    state : {
        /**
         * @type{Object<BudgetItemIncome|BudgetItemOutcome>} items
         */
        items: {},
    },

    getters: {
        getBudgetItems: ({items}) => Object.values(items),

        getTotal: ({items}) => {
            /** @type{BudgetItemIncome|BudgetItemOutcome} budgetItem */
            return Object.values(items).reduce((acc, budgetItem) => acc + budgetItem.value, 0)
        },

        getBudgetItemByType: (store, getters) => budgetTitle => {
            if (budgetTitle === undefined || !budgetTitle) {
                return getters.getBudgetItems;
            }

            return getters.getBudgetItems.filter(budgetItem => budgetItem.typeTitle === budgetTitle);
        },
    },

    mutations: {
        /** @type{BudgetItemIncome|BudgetItemOutcome} budgetItem */
        ADD_ITEM(state, budgetItem) {
            Vue.set(state.items, budgetItem.id, budgetItem);
        },

        DELETE_ITEM(state, budgetItemUid) {
            Vue.delete(state.items, budgetItemUid);
        },

        CLEAR_ITEMS(state) {
            state.items = {};
        }
    },

    actions: {
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

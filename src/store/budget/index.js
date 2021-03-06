import Vue from "vue";

export default {
    namespaced: true,

    state: {
        /**
         * @type{Object<BudgetItemIncome|BudgetItemOutcome>} items
         */
        items: {},
        rememberBudgetType: false,
        budgetTypeTitle: undefined,
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

        getRememberBudgetType: ({rememberBudgetType}) => rememberBudgetType,

        getBudgetTypeTitle: ({budgetTypeTitle}) => budgetTypeTitle,
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
        },

        SET_REMEMBER_BUDGET_TYPE(state, isRemember) {
            state.rememberBudgetType = isRemember;
        },

        SET_BUDGET_TYPE_TITLE(state, budgetTypeTitle) {
            state.budgetTypeTitle = budgetTypeTitle;
        },
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
        },

        setRememberBudgetType({commit}, isRemember) {
            commit("SET_REMEMBER_BUDGET_TYPE", isRemember);
        },

        setBudgetTypeTitle({commit}, budgetTypeTitle) {
            commit("SET_BUDGET_TYPE_TITLE", budgetTypeTitle);
        },
    },
}

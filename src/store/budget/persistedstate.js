import createPersistedState from "vuex-persistedstate";
import BudgetItemFabric from "@/Entity/BudgetItemFabric";

/**
 *
 * @param {string} jsonString
 */
export const parseStorageItems = (jsonString) => {
    try {
        if (typeof jsonString === "undefined") {
            throw Error("ups.");
        }

        const store = JSON.parse(jsonString);

        const items = Object.values(store.budget.items).reduce((acc, item) => {
            const budgetItem = BudgetItemFabric.make(item);
            acc[budgetItem.id] = budgetItem;

            return acc;
        }, {});

        store.budget.items = items;

        return store;

        // eslint-disable-next-line no-empty
    } catch (e) {
        return {};
    }
};

export default createPersistedState({
    paths: ["budget"],
    key: "budget-application-store",
    getState: (key, storage) => parseStorageItems(storage.getItem(key)),
});

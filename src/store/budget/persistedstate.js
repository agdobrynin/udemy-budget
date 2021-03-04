import createPersistedState from "vuex-persistedstate";
import BudgetItemFabric from "@/Entity/BudgetItemFabric";

/**
 *
 * @param {{budget: {items: {}}}} jsonString
 */
export const parseStorageItems = (jsonString) => {
    const restoreStorage = {budget: {items: {}}};

    try {
        if (typeof jsonString === "undefined") {
            throw Error("ups.");
        }
        const sourceItems = JSON.parse(jsonString).budget.items;
        restoreStorage.budget.items = Object.values(sourceItems).reduce((acc, item) => {
            const budgetItem = BudgetItemFabric.make(item);
            acc[budgetItem.id] = budgetItem;

            return acc;
        }, {});
    // eslint-disable-next-line no-empty
    } catch (e) {
        console.error(e);
    }

    return restoreStorage;
};

export default createPersistedState({
    paths: ["budget"],
    key: "budget-application-store",
    getState: (key, storage) => parseStorageItems(storage.getItem(key)),
});

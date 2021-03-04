export class BudgetItemAbstract {
    comment = undefined;
    _value = NaN;
    id = undefined;
    static _typeTitle = undefined;
    className = "BudgetItemAbstract";

    /**
     * @param {String} comment
     * @param {Number} value
     * @param {String|null} id
     */
    constructor(comment, value, id = null) {
        this.comment = comment || undefined;
        this._value = Math.abs(Number(value)) || NaN;
        this.id = !id ? BudgetItemAbstract.uid : id;
    }

    get value() {
        return this._value;
    }

    get typeTitle() {
        return this.constructor._typeTitle;
    }

    static get typeTitle() {
        return this._typeTitle;
    }

    static get uid() {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }
}

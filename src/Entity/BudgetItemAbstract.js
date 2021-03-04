export class BudgetItemAbstract {
    comment = undefined;
    _value = NaN;
    id = undefined;
    static _typeTitle = undefined;

    /**
     * @param {String} comment
     * @param {Number} value
     */
    constructor(comment, value) {
        this.comment = comment || undefined;
        this._value = Math.abs(Number(value)) || NaN;
        this.id = BudgetItemAbstract.uid;
        this.className = this.constructor.name;
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

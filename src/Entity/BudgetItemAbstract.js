export class BudgetItemAbstract {

    comment = "";
    _value = 0;
    id = undefined;
    static _type = undefined;

    /**
     * @param {String} comment
     * @param {Number} value
     */
    constructor(comment, value) {
        this.comment = comment;
        this._value = value;
        this.id = BudgetItemAbstract.uid;
    }

    static get type() {
        return this._type;
    }

    static get uid() {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }
}

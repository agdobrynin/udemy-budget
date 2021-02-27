export class BalanceItem {
    comment = "";
    value = 0;
    id = 1;

    /**
     * @param {String} comment
     * @param {Number} value
     * @param {Number} id
     */
    constructor(comment, value, id) {
        this.comment = comment;
        this.value = value;
        this.id = id;
    }
}
export default class Formatters {
    /**
     * 자리수를 지정하여 숫자만 구성되도록 형식화합니다.
     *
     * @param {string} value - 입력할 숫자를 나타내는 문자열
     * @param {*|number} length - 입력할 숫자의 자리수
     * @returns {string} - 지정된 자리수에 해당하는 숫자
     */
    static inputNumber(value, length = null) {
        const numericValue = value.replace(/[^0-9]+/g, "");
        if (length) return numericValue.slice(0, length);
        else return numericValue;
    }

    /**
     *  숫자를 3자리수 마다 콤마(,)를 넣도록 형식화합니다.
     *
     * @param {string|number} value - 입력할 숫자 입력
     * @returns {string} - 콤마(,)를 넣은 숫자
     */
    static comma(value) {
        if (typeof value === "number") value = value.toString();
        return value
            .replace(/[^0-9]+/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

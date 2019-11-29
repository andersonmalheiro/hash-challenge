class MDR {
  /**
   * Calc percentual of value
   *
   * @static
   * @param {*} value
   * @param {*} percent
   * @returns
   * @memberof MDR
   */
  static calcPercentual(value, percent) {
    return percent / 100;
  }

  /**
   * Calc liquid value
   *
   * @static
   * @param {*} value
   * @param {*} mdr
   * @returns
   * @memberof MDR
   */
  static calcLiquidValue(value, mdr) {
    const percentual = mdr * value;
    return value - percentual;
  }

  /**
   * Calc anticipation based on days
   *
   * @static
   * @param {*} installmentValue
   * @param {*} tax
   * @param {*} days
   * @param {*} installmentNumber
   * @returns
   * @memberof MDR
   */
  static calcAnticipation(installmentValue, tax, days, installmentNumber) {
    let result = 0;
    let cummulative = days;
    for (let index = 1; index <= installmentNumber; index++) {
      const value =
        installmentValue - (tax / 30) * cummulative * installmentValue;
      result += value;
      cummulative += 30;
    }

    return result;
  }

  /**
   * Calc anticipation based on number of months that will not receive discount
   *
   * @static
   * @param {number} installmentValue
   * @param {number} tax
   * @param {number} installmentNumber
   * @param {number} jump
   * @returns
   * @memberof MDR
   */
  static calcAnticipationSpecific(
    installmentValue,
    tax,
    installmentNumber,
    jump
  ) {
    let result = 0;
    for (let index = 1; index <= installmentNumber - jump; index++) {
      const value = installmentValue - tax * index * installmentValue;
      result += value;
    }

    return result + installmentValue * jump;
  }
}

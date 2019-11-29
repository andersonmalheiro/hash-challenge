// Object with values of inputs
const data = {
  value: 0,
  installments: 0,
  mdr: 0
};

// Object with calculated anticipation values
const results = {
  tomorrow: 0,
  days15: 0,
  days30: 0,
  days90: 0
};

// Variable to handle form
let form;

/**
 * Main function that runs on start
 *
 */
function main() {
  form = document.getElementById('form');
  console.log('initing...');
  addListeners();
}

/**
 * Add listeners to inputs
 *
 */
function addListeners() {
  // Getting input elements
  const main_value = document.getElementById('value');
  const installments = document.getElementById('installments');
  const mdr = document.getElementById('mdr');

  // Currency mask
  var mask = IMask(main_value, {
    mask: Number,
    scale: 2,
    signed: true,
    thousandsSeparator: '.',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ',',
    min: 1
  });

  // Adding value listener
  main_value.addEventListener('input', event => {
    const value = mask.value;
    handleInputChanges(value, 'value', true);
    if (event.target.value === '') {
      event.target.value = '0.00';
    }
  });

  // Adding installments listener
  installments.addEventListener('input', event => {
    const { target } = event;
    // Fix the min and max values
    if (target.value > 12) {
      target.value = 12;
    } else if (target.value < 1) {
      target.value = 1;
    }
    handleInputChanges(target.value, 'installments');
  });

  // Adding mdr listener
  mdr.addEventListener('input', event => {
    const { target } = event;
    handleInputChanges(target.value, 'mdr');
  });
}

/**
 * Check in form is valid with HTML validations
 *
 * @param {*} form
 */
function checkFormValid(form) {
  setTimeout(() => {
    if (form.checkValidity()) {
      calc(data);
    }
  });
}

/**
 * Handle changes on inputs
 *
 * @param {*} value
 * @param {*} key
 * @param {boolean} [mask=false]
 */
function handleInputChanges(value, key, mask = false) {
  if (value) {
    if (mask) {
      data[key] = parseFloat(clearNumber(value));
    } else {
      value = parseFloat(value);
      data[key] = value;
    }
    checkFormValid(form);
  }
}

/**
 * Function that use MDR lib to calculate the anticipation values
 *
 * @param {*} params
 */
function calc(params) {
  // Calculate relevant values
  const percentual = MDR.calcPercentual(params.value, params.mdr);
  const liquidValue = MDR.calcLiquidValue(params.value, percentual);
  const installmentValue = liquidValue / params.installments;

  // Calc tomorrow anticipation
  const tomorrow = MDR.calcAnticipation(
    installmentValue,
    percentual,
    31,
    params.installments
  );

  // Calc 15  days anticipation
  const days15 = MDR.calcAnticipation(
    installmentValue,
    percentual,
    15,
    params.installments
  );

  // Calc 30 days anticipation
  const days30 = MDR.calcAnticipationSpecific(
    installmentValue,
    percentual,
    params.installments,
    1
  );

  // Calc 90 days anticipation
  const days90 = MDR.calcAnticipationSpecific(
    installmentValue,
    percentual,
    params.installments,
    3
  );

  // Updating results object
  results.tomorrow = tomorrow;
  results.days15 = days15;
  results.days30 = days30;
  results.days90 = days90;

  // Update results on front
  updateResults();
}

/**
 * Update the results on DOM
 *
 */
function updateResults() {
  // Getting result elements
  const tomorrowResult = document.getElementById('tomorrow');
  const days15Result = document.getElementById('two_weeks');
  const days30Result = document.getElementById('one_month');
  const days90Result = document.getElementById('three_months');

  // Currency formatter to format results
  const formatter = Intl.NumberFormat('pt-br', {
    currency: 'BRL',
    style: 'currency',
    maximumFractionDigits: 2
  });

  tomorrowResult.innerText = formatter.format(results.tomorrow);
  days15Result.innerText = formatter.format(results.days15);
  days30Result.innerText = formatter.format(results.days30);
  days90Result.innerText = formatter.format(results.days90);
}

/**
 * Function to format number when using mask
 *
 * @param {*} value
 * @returns
 */
function clearNumber(value) {
  if (value && value.length) {
    return value.replace('.', '').replace(',', '.');
  } else {
    return '0';
  }
}

const data = {
  value: 0,
  installments: 0,
  mdr: 0
};

let form;

// Função principal que executa ao iniciar a aplicação
function main() {
  form = document.getElementById('form');
  console.log('initing...');
  addListeners();
}

function addListeners() {
  // Getting elements
  const main_value = document.getElementById('value');
  const installments = document.getElementById('installments');
  const mdr = document.getElementById('mdr');

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

  // Adding listeners
  main_value.addEventListener('input', event => {
    const value = mask.value;
    handleInputChanges(value, 'value', true);
    if (event.target.value === '') {
      event.target.value = '0.00';
    }
  });

  installments.addEventListener('input', event => {
    const { target } = event;
    if (target.value > 12) {
      target.value = 12;
    } else if (target.value < 1) {
      target.value = 1;
    }
    handleInputChanges(target.value, 'installments');
  });

  mdr.addEventListener('input', event => {
    const { target } = event;
    handleInputChanges(target.value, 'mdr');
  });
}

function checkFormValid(form) {
  setTimeout(() => {
    if (form.checkValidity()) {
      calcAnticipation(data);
    }
  });
}

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

function calcAnticipation(params) {
  console.log(params);
}

function clearNumber(value) {
  if (value && value.length) {
    return value.replace('.', '').replace(',', '.');
  } else {
    return '0';
  }
}

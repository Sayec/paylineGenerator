let submitButton = document.querySelector('.submitButton');
let aElements = document.querySelectorAll('a');
let arrayCheck = [];
let rows;
let columns;

const checkColumn = (columnIndex) => {
  let tempArray = [];
  aElements.forEach((a) => {
    if (a.dataset.column === `${columnIndex}`) tempArray.push(a);
  });
  return !tempArray.every((a) => a.classList.item(0) !== 'clicked');
};
const getClickedElements = () => {
  let tempArray = [];
  aElements.forEach((a) => {
    if (a.classList.item(0) === 'clicked') tempArray.push(a);
  });
  return tempArray;
};

const toggleClicked = (element) => {
  arrayCheck = [];
  if (element.classList.item(0) === 'clicked') return;
  aElements.forEach((a) => {
    if (a.dataset.column === element.dataset.column) a.classList.remove('clicked');
  });
  element.classList.add('clicked');
};

const payline = () => {
  let testPassed = true;
  let text = '[';
  for (let i = 0; i < columns; i++) {
    console.log(checkColumn(i));
    if (!checkColumn(i)) {
      testPassed = false;
    }
  }
  if (!testPassed) return 'Zaznacz pole w każdej kolumnie';
  getClickedElements().forEach((el) => {
    text += `[${el.dataset.row}, ${el.dataset.column}], `;
  });
  text = text.slice(0, -2);
  text += ']';
  return text;
};

submitButton.addEventListener('click', () => {
  rows = document.getElementById('rows').value;
  columns = document.getElementById('columns').value;

  if (!columns || !rows) {
    alert('Wpisz wartości');

    return;
  }
  if ((prevWrapper = document.querySelector('.wrapper'))) {
    document.body.removeChild(prevWrapper);
  }

  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  wrapper.style.width = `${columns * 100}px`;
  wrapper.style.height = `${rows * 100}px`;
  document.body.appendChild(wrapper);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const element = document.createElement('a');
      element.dataset.row = i;
      element.dataset.column = j;
      element.addEventListener('click', () => {
        toggleClicked(element);
        element.classList.add('clicked');
      });
      wrapper.appendChild(element);
    }
  }
  aElements = document.querySelectorAll('a');
  aElements.forEach((el) => (el.style.flexBasis = `${100 / columns}%`));
  const generateButton = document.createElement('button');
  generateButton.innerHTML = 'Generate';
  generateButton.addEventListener('click', () => {
    document.getElementById('generatedText').innerHTML = payline();
  });
  document.body.appendChild(generateButton);
  document.body.appendChild(textfield);
});

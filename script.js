const submitButton = document.querySelector('.submitButton');
const container = document.querySelector('.container');
const wrapper = document.querySelector('.wrapper');
const generateButton = document.querySelector('.generateButton');
const removeButton = document.querySelector('.removeButton');
const generatedText = document.getElementById('generatedText');
let aElements = document.querySelectorAll('a');
let arrayCheck = [];
let textsArray = [];
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

const printPaylines = () => {
  textsArray = textsArray.filter((element) => element !== undefined);
  return textsArray.join(', \n');
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
    if (!checkColumn(i)) {
      testPassed = false;
    }
  }
  if (!testPassed) return 'Zaznacz pole w każdej kolumnie';
  getClickedElements()
    .sort((elA, elB) => elA.dataset.column > elB.dataset.column)
    .forEach((el) => {
      text += `[${el.dataset.column}, ${el.dataset.row}], `;
    });
  text = text.slice(0, -2);
  text += ']';
  if (textsArray.includes(text)) {
    alert('Taki payline już istnieje');
    return;
  }
  return text;
};

submitButton.addEventListener('click', () => {
  rows = document.getElementById('rows').value;
  columns = document.getElementById('columns').value;
  if (!columns || !rows) {
    alert('Wpisz wartości');
    return;
  }
  if (wrapper.children.length !== 0) {
    wrapper.innerHTML = '';
    generatedText.innerHTML = '';
    textsArray.length = 0;
    // generateButton.removeEventListener();
    // removeButton.removeEventListener();
  } else {
    generateButton.addEventListener('click', () => {
      textsArray.push(payline());
      generatedText.innerHTML = printPaylines();
    });
    removeButton.addEventListener('click', () => {
      textsArray.pop();
      generatedText.innerHTML = printPaylines();
    });
  }
  wrapper.style.width = `${columns * 100}px`;
  wrapper.style.height = `${rows * 100}px`;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const element = document.createElement('a');
      element.style.flexBasis = `${100 / columns}%`;
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
});

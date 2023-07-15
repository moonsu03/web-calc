function approximation(num) {
  num = num.toFixed(3);
  return +num;
}

function add(a, b) {
  return approximation(a + b);
}

function substract(a, b) {
  return approximation(a - b);
}

3;
function multiply(a, b) {
  return approximation(a * b);
}

function divide(a, b) {
  return approximation(a / b);
}

function operate(firstNum, secondNum, operator) {
  if (operator == "+") {
    return add(firstNum, secondNum);
  } else if (operator == "-") {
    return substract(firstNum, secondNum);
  } else if (operator == "*") {
    return multiply(firstNum, secondNum);
  } else if (operator == "/") {
    if (secondNum == 0) {
      alert("You can't do that");
      return NaN;
    } else {
      return divide(firstNum, secondNum);
    }
  }
}

function refreshValue() {
  const display = document.querySelector(".result");

  var displayValue = "0"; //an onscreen value

  display.textContent = displayValue;

  const numberContainer = document.querySelectorAll(".digits button");
  const operateContainer = document.querySelectorAll(".operators button");
  var storeValue = displayValue; //second value to save the previous value
  let elementIndicator = 0; //this variable checks for ability to either add a new number
  //or add numbers next to the displayed value

  numberContainer.forEach((element) => {
    element.addEventListener("click", () => {
      if (displayValue == "0" || elementIndicator > 0) {
        displayValue = `${element.textContent}`;
        elementIndicator = 0;
      } else {
        displayValue += `${element.textContent}`;
      }
      display.textContent = displayValue;
    });
  });

  let elementSave = []; //array that has a history of operators and always has two elements

  const clearButton = document.querySelector(".clear");
  clearButton.addEventListener("click", () => {
    (displayValue = 0), (storeValue = 0), (elementIndicator = 0);
    display.textContent = 0;
    elementSave = [];
  });

  const pointContainer = document.querySelector(".point");
  pointContainer.addEventListener("click", () => {
    if (`${displayValue}`.indexOf(".") == -1) {
      displayValue += `.`;
      display.textContent = `${displayValue}`;
      elementIndicator = 0;
    }
  });

  operateContainer.forEach((element) => {
    element.addEventListener("click", () => {
      elementSave.push(element.textContent);

      if (elementSave.length == 2) {
        displayValue = operate(+storeValue, +displayValue, elementSave[0]);
        elementSave.shift();
        display.textContent = displayValue;
      }

      if (elementSave[0] == "=") {
        elementSave.shift();
        elementIndicator++;
      } else {
        elementIndicator = 0;
        storeValue = displayValue;

        display.textContent = displayValue;

        displayValue = 0;
      }
    });
  });
}

refreshValue();

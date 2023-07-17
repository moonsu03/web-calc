function approximation(num) {
  num = +num;
  num = num.toFixed(5);
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

function overflowControl(num) {
  num = parseFloat(num).toExponential();
  return parseFloat(num).toPrecision(5);
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

  function pressNumber(elem) {
    //displayValue here is always a string
    if (displayValue == "0" || elementIndicator > 0) {
      displayValue = `${elem}`;
      elementIndicator = 0;
    } else {
      if (`${displayValue}`.length < 15) {
        displayValue += `${elem}`;
      } else {
        alert(
          "Display overflow! Please use other values by using backspace, e+ or ="
        );
      }
    }
    display.textContent = displayValue;
  }

  numberContainer.forEach((element) => {
    element.addEventListener("click", () => {
      let elementNumber = `${element.textContent}`;
      pressNumber(elementNumber);
    });
  });

  let elementSave = []; //array that has a history of operators and always has two elements

  function clear() {
    (displayValue = "0"), (storeValue = 0), (elementIndicator = 0);
    display.textContent = 0;
    elementSave = [];
  }

  const clearButton = document.querySelector(".clear");
  clearButton.addEventListener("click", clear);

  function point() {
    if (`${displayValue}`.indexOf(".") == -1) {
      displayValue += `.`;
      display.textContent = `${displayValue}`;
      elementIndicator = 0;
    }
  }

  const pointContainer = document.querySelector(".point");
  pointContainer.addEventListener("click", point);

  function backspaceFunction() {
    displayValue = displayValue.split("");
    if (displayValue.length >= 2) {
      displayValue.pop();
    } else {
      displayValue[0] = 0;
    }
    displayValue = displayValue.join("");
    display.textContent = `${displayValue}`;
    elementIndicator = 0;
  }

  const backspace = document.querySelector(".backspace");
  backspace.addEventListener("click", backspaceFunction);

  function powerFunction() {
    if (`${displayValue}`.indexOf("e+") == -1) {
      displayValue += `e+`;
      display.textContent = `${displayValue}`;
      elementIndicator = 0;
    }
  }

  const power = document.querySelector(".power");
  power.addEventListener("click", powerFunction);

  function minusFunction() {
    if (displayValue != 0) {
      let saveValue = displayValue; // this variable is only for this function
      displayValue = displayValue.split("");
      if (saveValue > 0) {
        displayValue.unshift("-");
      } else {
        displayValue.shift();
      }
      displayValue = displayValue.join("");
      display.textContent = `${displayValue}`;
      elementIndicator = 0;
    }
  }

  const minus = document.querySelector(".plusminus");
  minus.addEventListener("click", minusFunction);

  function operation(elem) {
    elementSave.push(elem);
    if (elementSave.length == 2) {
      displayValue = operate(+storeValue, +displayValue, elementSave[0]);
      elementSave.shift();
      display.textContent = displayValue;
    }

    if (elementSave[0] == "=") {
      elementSave.shift();
      elementIndicator++;
      //convert small e+ numbers to normal numbers by pressing =
      if (
        displayValue.toString().indexOf("e+") !== -1 &&
        displayValue <= 1e12
      ) {
        displayValue = +displayValue;
      }
      if (displayValue >= 1e12) {
        displayValue = overflowControl(displayValue);
      }
      display.textContent = displayValue;
    } else {
      elementIndicator = 0;
      storeValue = displayValue;
      if (displayValue >= 1e12) {
        displayValue = overflowControl(displayValue);
      }
      display.textContent = displayValue;
      displayValue = 0;
    }
    displayValue = displayValue.toString();
  }

  operateContainer.forEach((element) => {
    element.addEventListener("click", () => {
      let operateElem = element.textContent;
      operation(operateElem);
    });
  });

  document.addEventListener("keydown", (e) => {
    if ("0123456789".includes(e.key)) {
      let elementNumber = `${e.key}`;
      pressNumber(elementNumber);
    } else if (e.key == "c") {
      clear();
    } else if (e.key == ".") {
      point();
    } else if (e.key == "Backspace") {
      backspaceFunction();
    } else if (e.key == "^") {
      powerFunction();
    } else if (e.key == "z") {
      minusFunction();
    } else if ("/*-+=".includes(e.key)) {
      let operateElem = e.key;
      operation(operateElem);
    }
  });
}

refreshValue(); //main func

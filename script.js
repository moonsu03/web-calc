function approximation(num) {
  num = num.toPrecision(5);
  num = num.substring(0, 10);
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
    return divide(firstNum, secondNum);
  }
}

function refreshValue() {
  const display = document.querySelector(".result");

  var displayValue = "0";

  display.textContent = displayValue;

  const numberContainer = document.querySelectorAll(".digits button"); //pls look more into css ancestor rules but this idea works so its fine
  const operateContainer = document.querySelectorAll(".operators button");
  var storeValue = displayValue;
  let elementIndicator = 0;

  numberContainer.forEach((element) => {
    //click something something

    element.addEventListener("click", () => {
      //console.log(element.textContent)

      if (displayValue == "0" || elementIndicator >= 1) {
        displayValue = `${element.textContent}`;
        elementIndicator = 0;
      } else {
        displayValue += `${element.textContent}`;
      }
      display.textContent = displayValue;
      console.log(`display value = ${displayValue}`);
    });
  });

  let elementSave = [];

  const clearButton = document.querySelector(".clear");
  clearButton.addEventListener("click", () => {
    (displayValue = 0), (storeValue = 0), (elementIndicator = 0);
    console.log("clear button pressed");
    display.textContent = 0;
    elementSave = [];
  });

  operateContainer.forEach((element) => {
    element.addEventListener("click", () => {
      elementSave.push(element.textContent);
      console.log(storeValue, displayValue, element.textContent);

      console.log(
        `STORE value = ${storeValue}`,
        `display value = ${displayValue}`,
        `eS =  ${elementSave}`
      );

      if (elementSave.length == 2) {
        console.log(storeValue, displayValue, elementSave, "ok");
        displayValue = operate(+storeValue, +displayValue, elementSave[0]);
        console.log(displayValue, "ok");
        elementSave.shift();
        display.textContent = displayValue;
      }
      if (elementSave[0] == "=") {
        elementSave.shift();
        console.log("elementSave[0] == =");
        elementIndicator++;
      } else {
        elementIndicator = 0;
        storeValue = displayValue;

        display.textContent = displayValue;

        displayValue = 0;
      }

      //console.log(storeValue.textContent);
    });
  });
}

refreshValue();

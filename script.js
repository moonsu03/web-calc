function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let firstNum, secondNum, operator;

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

  numberContainer.forEach((element) => {
    //click something something
    element.addEventListener("click", () => {
      //console.log(element.textContent)
      if (displayValue == "0") {
        displayValue = `${element.textContent}`;
      } else {
        displayValue += `${element.textContent}`;
      }
      display.textContent = displayValue;
      console.log(`display value = ${displayValue}`);
    });
  });

  elementSave = [];

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
      } else {
        storeValue = displayValue;

        display.textContent = displayValue;

        displayValue = 0;
      }

      //console.log(storeValue.textContent);
    });
  });
}

refreshValue();

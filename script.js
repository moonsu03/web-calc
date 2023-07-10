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

  let displayValue = "0";

  display.textContent = displayValue;

  const numberContainer = document.querySelectorAll(".digits button"); //pls look more into css ancestor rules but this idea works so its fine

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
      //console.log(displayValue);
    });
  });

  return displayValue;
}

refreshValue();

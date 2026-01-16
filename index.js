// === State ===

// It was helpful for me to start with === Render === first

// Goals:
// Plan the end-state HTML
// Think through anchor tags to replace, then create nodes / components that will replace them
// Then create the data that plugs in

const bankArr = [];
const oddsArr = [];
const evensArr = [];

// initializing our empty arrays for bank, odds, and evens

function renderNumbers() {
  document.querySelector(".bank").textContent = bankArr.join(", ");
  document.querySelector(".odds").textContent = oddsArr.join(", ");
  document.querySelector(".evens").textContent = evensArr.join(", ");
}

// this function selects each of the HTML elements and updates them with the appropriate arrays

function addToBank(numInput) {
  bankArr.push(numInput);
}

// addToBank is the function that pushes a new number from the form into the Bank

function sortOne(bankArr) {
  if (bankArr.length === 0) return;

  const num = bankArr.shift();

  if (num % 2 === 0) {
    evensArr.push(num);
  } else oddsArr.push(num);
}

// sortOne is the function we're going to attach to our Sort 1 button
// it pulls a number from the bank array and stores it under variable num
// then it pushes that value to the odds or evens array

function sortAll(bankArr) {
  if (bankArr.length === 0) return;
  for (const num of bankArr) {
    if (num % 2 === 0) {
      evensArr.push(num);
    } else oddsArr.push(num);
  }
  bankArr.length = 0;
}

// sortAll is the function we're going to attach to the Sort All button
// it loops through the bank array and checks for evens vs odds, then sorts
// at the end it clears the bank array since we've pushed each item to a different array

// === Components ===

// For the below functions, we're going to create nodules that will replace the anchors in the Render function

function createForm() {
  const $form = document.createElement("form");

  $form.innerHTML = `
    <label>
        Add a number to the bank
        <input name="numInput" type="number">
    </label>
    <button type="submit" id="addBtn">Add number</button>
    <button type="button" id="sortBtn">Sort 1</button>
    <button type="button" id="sortAllBtn">Sort All</button>
 `;

  // we're going to have it create this nodule because we need to reset the form when Add number is clicked
  // and we need the buttons inline

  // below we're adding event listeners to each button listed in the HTML above

  const $addBtn = $form.querySelector("#addBtn");
  const $sortBtn = $form.querySelector("#sortBtn");
  const $sortAllBtn = $form.querySelector("#sortAllBtn");

  $addBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const data = new FormData($form);
    // new creates the object
    // FormData() grabs all key-value pairs from a <form> element (that we stored in $form)
    // stores new object and its content under data variable

    const numberEntered = Number(data.get("numInput"));
    // .get("test") pulls any input for name = "test" --- and we're storing it in numberEntered

    if (Number.isNaN(numberEntered)) return;
    // Number.isNaN() returns true if the value is actually NaN
    // So we're saying if the number in numberEntered is NaN, then stop running this function
    // We cannot do numberEntered === NaN because NaN is technically a number

    addToBank(numberEntered);
    $form.reset();
    // .reset() is a built-in method on HTML form elements
    // It returns the form to its original state
    renderNumbers();
    // we're invoking the renderNumbers() function to make sure the data's updated
  });

  // Sort 1 button // Adding event listener

  $sortBtn.addEventListener("click", (event) => {
    event.preventDefault();

    sortOne(bankArr);
    renderNumbers();
  });

  // Sort All button // Adding event listener

  $sortAllBtn.addEventListener("click", (event) => {
    event.preventDefault();

    sortAll(bankArr);
    renderNumbers();
  });

  return $form;
}

// function to create node that replaces HTML and updates the data in each <p> element

function createSection() {
  const $tableSection = document.createElement("section");

  $tableSection.classList.add("table");

  $tableSection.innerHTML = `
        <h2>Bank</h2>
        <p class="bank"></p>
        <h2>Odds</h2>
        <p class="odds"></p>
        <h2>Evens</h2>
        <p class="evens"></p>
 `;
  return $tableSection;
}

// === Render ===

function render() {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
    <h1>Odds and Events</h1>
    <br>
    <section>
        <form></form>
    </section>
    <br>
    <section id="table"></section>`;

  $app.querySelector("form").replaceWith(createForm());
  $app.querySelector("#table").replaceWith(createSection());

  renderNumbers();
}

render();

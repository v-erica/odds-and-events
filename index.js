// === State ===
//   const $form = $formSection.querySelector("form")
//   const $addBtn = $formSection.querySelector("#addBtn");
//   const $sortBtn = $formSection.querySelector("#sortBtn");
//   const $sortAllBtn = $formSection.querySelector("#sortAllBtn");

//
const bankArr = [];
const oddsArr = [];
const evensArr = [];

function renderNumbers() {
  document.querySelector(".bank").textContent = bankArr.join(", ");
  document.querySelector(".odds").textContent = oddsArr.join(", ");
  document.querySelector(".evens").textContent = evensArr.join(", ");
}

function addToBank(numInput) {
  bankArr.push(numInput);
}

function sortOne(bankArr) {
  if (bankArr.length === 0) return;

  const num = bankArr.shift();

  if (num % 2 === 0) {
    evensArr.push(num);
  } else oddsArr.push(num);
}

function sortAll(bankArr) {
  if (bankArr.length === 0) return;
  for (const num of bankArr) {
    if (num % 2 === 0) {
      evensArr.push(num);
    } else oddsArr.push(num);
  }
  bankArr.length = 0;
}

//   $sortBtn.addEventListener("click", (event) => {
//     event.preventDefault();

//     const data = new FormData($form);
//     const numberEntered = data.get("numInput");
//     addToBank(numberEntered);

//   });

// === Component ===

// TODO: Create node for form and buttons

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

  const $addBtn = $form.querySelector("#addBtn");
  const $sortBtn = $form.querySelector("#sortBtn");
  const $sortAllBtn = $form.querySelector("#sortAllBtn");

  $addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    //   const $form = $formSection.querySelector("form");

    const data = new FormData($form);
    const numberEntered = Number(data.get("numInput"));

    if (Number.isNaN(numberEntered)) return;

    addToBank(numberEntered);
    $form.reset();
    renderNumbers();
  });

  $sortBtn.addEventListener("click", (event) => {
    event.preventDefault();

    sortOne(bankArr);
    renderNumbers();
  });

  $sortAllBtn.addEventListener("click", (event) => {
    event.preventDefault();

    sortAll(bankArr);
    renderNumbers();
  });

  return $form;
}
// Grab button ids from above to add event listeners

// Add Number button
// TODO: Create node for bank, odds, and evens

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

// async function init() {
//   await componentNode();
render();
// }

// init();

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-b3387-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, "items");

onValue(itemsInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    clearShoppingList();
    for (let item of itemsArray) {
      shoppingList(item);
    }
  }
  else{
    list.innerHTML = "No items here...yet"
  }
});

const inputFieldEl = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const list = document.getElementById("shopping-list");

addButton.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  push(itemsInDB, inputValue);
  clearInputValue();
});

function clearInputValue() {
  inputFieldEl.value = "";
}

function clearShoppingList() {
  list.innerHTML = "";
}

function shoppingList(theItem) {
  let itemId = theItem[0];
  let itemValue = theItem[1];
  let newLi = document.createElement("li");
  newLi.textContent = itemValue;
  newLi.addEventListener("click", function () {
    let locationInDB = ref(database, `items/${itemId}`);

    remove(locationInDB);
  });

  list.append(newLi);
}

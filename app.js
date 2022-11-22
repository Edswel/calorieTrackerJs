// Item controller
const ItemCtrl = (function () {
  // Item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data structure/state
  const data = {
    items: [
      { id: 0, name: 'Steak', calories: 600 },
      { id: 1, name: 'T-bone', calories: 450 },
      { id: 2, name: 'Salads', calories: 100 },
      { id: 3, name: 'Burgers', calories: 1200 }
    ],
    currentItem: null,
    totalCalories: 0
  }
  // Public method
  return {
    getItems: function () {
      return data.items;
    },
    AddItem: function (name, calories) {
      let ID;
      // Create id
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      calories = parseInt(calories);
      // Create new item
      newItem = new Item(ID, name, calories);
      data.items.push(newItem);
      return newItem;
    },
    logData: function () {
      return data;
    }
  }
})();

// UI controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
  }
  return {
    populateItemList: function (items) {
      let html = '';
      items.forEach((item) => {
        html += `
          <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong><em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
          </li>
        `;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function (item) {
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `
        <strong>${item.name}: </strong><em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      `;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    getSelectors: function () {
      return UISelectors;
    }
  }
})();

// App controller
const App = (function (ItemCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function () {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors();
    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  }

  // Add item
  const itemAddSubmit = function (e) {
    // Get form input from UI controller
    const input = UICtrl.getItemInput();
    // Check for values in input fields
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemCtrl.AddItem(input.name, input.calories);
      // Add item to UI
      UICtrl.addListItem(newItem);
      // Clear input fields
      UICtrl.clearInput();
    }
    e.preventDefault();
  }
  // Public methods
  return {
    init: function () {
      // Fetch items
      const items = ItemCtrl.getItems();
      // Populate fetched items
      UICtrl.populateItemList(items);
      // Load event listeners
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
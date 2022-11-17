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
    logData: function () {
      return data;
    }
  }
})();

// UI controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list'
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
    }
  }
})();

// App controller
const App = (function (ItemCtrl, UICtrl) {
  // Public methods
  return {
    init: function () {
      // Fetch items
      const items = ItemCtrl.getItems();
      // Populate fetched items
      UICtrl.populateItemList(items);
    }
  }
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
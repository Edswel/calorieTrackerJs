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
    ],
    currentItem: null,
    totalCalories: 0
  }
  // Public method
  return {
    logData: function () {
      return data;
    }
  }
})();

// UI controller
const UICtrl = (function () {

})();

// App controller
const App = (function (ItemCtrl, UICtrl) {
  // Public methods
  return {
    init: function () {
      console.log('Initialing state...');
    }
  }
})(ItemCtrl, UICtrl);

// Initialize App
App.init();
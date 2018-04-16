// initiate a new view model function
var ViewModel = function() {
  // track number of clicks on cat
  this.clickCount = ko.observable(0);
  // track current cat name
  this.name = ko.observable('Abby');
  // current cat image
  this.img = ko.observable('img/blackwhite.jpg');
  // current cat author / img source
  this.img_author = ko.observable('https://www.flicker.com');
  // click counts / strings to use for cat level display
  this.cat_levels_list = {
    // # of clicks to change text at : text to show for that cat level
    0:'Newborn',
    10:'infant',
    20:'teen',
    30:'adult',
    40:'senior'
  };
  // for storing the current cat level text
  this.current_cat_level = ko.observable('');

  this.clicked = function() {
    // increments the clickCount on clicks of bound cat dom element

    // set the click count to current click count + 1
    this.clickCount(this.clickCount() + 1);
  };

  this.cat_level = ko.computed(function(){
    // compute the current cat level to use based on clicks

    // check if the current click count is equal to a click count in the cat levels list
    // only need to change cat level text when clicks reach defined points in our list
    if (this.cat_levels_list[this.clickCount()]) {
      // set the current cat level text to the corresponding string in the cat_levels_list
      this.current_cat_level(this.cat_levels_list[this.clickCount()]);
    }
  }, this);
};

// bind our dom elements to our view model
ko.applyBindings(new ViewModel());

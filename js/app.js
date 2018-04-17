// DATA

var cats_raw_data = [
  {
    clickCount: 0,
    name: 'Abby',
    img: 'img/blackwhite.jpg',
    img_author: 'flickr.com',
    nicknames: [
      'Abyss',
      'Midnight',
      'Darkness',
      'Abster',
      'Silly',
      'Noodles'
    ]
  }, {
    clickCount: 0,
    name: 'Milo',
    img: 'img/grump.jpg',
    img_author: 'flickr.com',
    nicknames: [
      'Grumpy',
      'Mister',
      'Milo Minderbinder',
    ]
  }, {
      clickCount: 0,
      name: 'Leo',
      img: 'img/lion.jpg',
      img_author: 'flickr.com',
      nicknames: [
        'Liono',
        'Rawr',
        'Leon',
        'Loudmouth',
      ]
    },
];

// APP LOGIC

// init incrementers for loops
var i;

var Cat = function(data) {
  // Cat constructor function
  // Args: takes a settings object (data) that creates a cat with specified properties
  // Return: na

  // track number of clicks on cat
  this.clickCount = ko.observable(data.clickCount);
  // track current cat name
  this.name = ko.observable(data.name);
  // current cat image
  this.img = ko.observable(data.img);
  // current cat author / img source
  this.img_author = ko.observable(data.img_author);
  // array of cat nickname text to display
  this.nicknames_list = ko.observableArray(data.nicknames);
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

  // FUNCTIONS

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

// initiate a new view model function for manipulating our cats
var ViewModel = function() {
  // cache ref to this
  var self = this;

  // observableArray to store the Cat instances
  this.cats_list = ko.observableArray([]);

  // loop through raw cats data list
  for (i=0; i < cats_raw_data.length; i+=1) {
    // instantiate a Cat for each cat in raw data and push to the cats_list array
    // use self to preserve scope in case we use foreach looping
    self.cats_list.push(new Cat(cats_raw_data[i]));
  }

  // set current cat
  this.current_cat = ko.observable(this.cats_list()[0]);

  this.switch_current_cat = function(data, event) {
    // switches the current cat in the viewmodel to a difference Cat instance

    // reset current cat to the passed corresponding Cat instance
    self.current_cat(data);
  };

  this.clicked = function() {
    // increments the clickCount on clicks of bound cat dom element
    // depends on the current binding context being set to the current cat already
    // otherwise you'd need to manually get the currenct_cat().clickCount()

    // set the click count to current click count + 1
    this.clickCount(this.clickCount() + 1);
  };

};

// bind our dom elements to our view model
ko.applyBindings(new ViewModel());

define(function(require){
  var $ = require('jquery');
  var _ = require('lodash');

  function Unfold($el, options) {
    var self = this;

    self.config = _.extend({}, options);

    self.$el = $el;
    self.folds = {};

    return self;
  }

  Unfold.prototype.getFolds = function () {
    var self = this;

    // Hide Element
    self.$el.css({
      'display': 'block'
    });

    // Get Height
    self.foldHeight = Math.floor(200 / 2);

    self.$el.css('height', '0');

    // detach the elements children from the dom and cache them 
    self.$content = self.$el.children().detach();
  };

  Unfold.prototype.createFolds = function () {
    var self = this;

    self.getFolds();

    // Create Top Fold
    self.folds.$top    = $('<div>').addClass('fold top').css({
      height : self.foldHeight
    }).append(
      $('<div>').addClass('inner').css({
        height: self.foldHeight * 2,
        top : 0
      }).append(self.$content.clone())
    );

    // Create bottom fold
    self.folds.$bottom = $('<div>').addClass('fold bottom').css({
      height : self.foldHeight
    }).append(
      $('<div>').addClass('inner').css({
        height: self.foldHeight * 2,
        top : -self.foldHeight
      }).append(self.$content.clone())
    );

    self.$el.append(self.folds.$top);
    self.$el.append(self.folds.$bottom);
  };

  Unfold.prototype.open = function () {
    var self = this;

    // Caclulate folds
    self.createFolds();

    self.$el.height(self.foldHeight * 2).addClass('visible');

    self.$el.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
      self.$el.empty().append(self.$content.clone());
    });

  };

  Unfold.prototype.close = function () {
    var self = this;

    // Caclulate folds
    self.createFolds();

    self.$el.height(0).removeClass('visible');

    self.$el.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
      self.$el.empty().append(self.$content.clone());
    });
  };

  Unfold.prototype.toggle = function () {
    var self = this;

    if (!self.isOpen) {
      self.isOpen = true;
      self.open();
    } else {
      self.isOpen = false;
      self.close();
    }
  };

  return Unfold;
});
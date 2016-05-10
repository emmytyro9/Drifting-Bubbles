
var Bubbles = cc.Sprite.extend({

  screenWidth: 0.0,
  pixelsPerSecond: 0,
  xOffset: 0,

  ctor: function(spriteFrameName) {
    this._super(spriteFrameName);
  },

  isHit: function(SpritePosition, ObstaclesPosition) {
    if(SpritePosition == ObstaclesPosition) {
      this.stopAllActions();
    }
  }

});

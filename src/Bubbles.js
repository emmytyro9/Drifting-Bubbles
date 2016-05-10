
var Bubbles = cc.Sprite.extend({

  ctor: function(spriteFrameName) {
    this._super(spriteFrameName);
  },

  isHit: function(SpritePosition, ObstaclesPosition) {
    if(SpritePosition == ObstaclesPosition) {
      this.stopAllActions();
    }
  }

});

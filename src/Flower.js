var Flower = cc.Sprite.extend({

  ctor: function() {
    this._super();
    this.initWithFile(res.FLOWER);
  },

  update: function(dt) {
    var position = this.getPosition();
    position.x += 20;
    //this.setRotation(90);
    this.setPosition(new cc.Point(position.x , position.y));

  }

});

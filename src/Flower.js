var Flower = cc.Sprite.extend({

  ctor: function() {
          this._super();
          this.initWithFile(res.FLOWER);
  },

  update: function(dt) {
          var position = this.getPosition();
          position.x += 20;
          this.setPosition(new cc.Point(position.x , position.y));
  },
  
  closeTo: function (obj) {
          var myPos = this.getPosition();
          var oPos = obj.getPosition();
          return ((Math.abs(myPos.x - oPos.x) <= 40) && (Math.abs(myPos.y - oPos.y) <= 40));
  }
});

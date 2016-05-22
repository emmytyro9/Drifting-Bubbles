
var Bubbles = cc.Sprite.extend({

  ctor: function(spriteFrameName) {
    this._super();
    this.velocity = 0;
  },

  update: function(dt) {
    var position = this.getPosition();
    position.x -= 10 ;

    this.setPosition(new cc.Point(position.x , position.y));
    this.NewPosition();
  },

  RandomBubbles: function() {
    var ran = Math.random()*5 ;
    if(ran == 1) {
        this.initWithFile(res.GREEN);
    }else if(ran == 2) {
        this.initWithFile(res.BLUE);
    }else if(ran == 3) {
        this.initWithFile(res.ORANGE);
    }else{
        this.initWithFile('res/images/BubblePink.png');
      }
    },

    NewPosition: function() {
       var pos = this.getPosition();
       if( pos.y <= 0 ){
        this.setPosition( new cc.Point( pos.x , Math.random()*600));
        }
    },

    closeTo: function (obj , sp) {
        var myPos = sp.getPosition();
        var oPos = obj.getPosition();
        return ((Math.abs(myPos.x - oPos.x) <= 40) && (Math.abs(myPos.y - oPos.y) <= 40));
    },

    StopBubbles: function() {
      this.stopAllActions();
      this.NewPosition();
    }

  });

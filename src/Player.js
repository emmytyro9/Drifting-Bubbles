var RobinSprite = cc.Sprite.extend( {

	state: kRobinStateStopped,
	speedY: 0.0,
	topOfScreen: 0,

	ctor: function (spriteFrameName) {
		this._super(spriteFrameName);
		this.movingAction = this.PlayerAnimation();
	},

	PlayerAnimation: function() {
	  var animation = new cc.Animation.create();
	   animation.addSpriteFrameWithFile( 'res/images/5.png' );
	   animation.addSpriteFrameWithFile( 'res/images/4.png' );
	   animation.setDelayPerUnit(0.1);
	   return cc.RepeatForever.create( cc.Animate.create( animation ));
	},

	UpdateRobin: function(dt) {
		if(this.state == kRobinStateMoving) {
			this.runAction(this.movingAction) ;

			var distance = 0;
			var newSpeed = 0;

			distance = this.speedY * dt + 0.5 * GRAVITY * dt * dt;
			newSpeed = this.speedY + GRAVITY * dt;

			this.y = this.y + distance;
			this.speedY = newSpeed;

			if(this.y > this.topOfScreen ) {
				this.y = this.topOfScreen;
				this.speedY = 0.0;
			}
		}
	},

	Reset: function() {
		this.state = kRobinStateStopped;
		//this.initWithFile('images/1.png') ;
		this.SetStartSpeed();
	},

	SetStartSpeed: function() {
		this.speedY = kRobinStartSpeedY;
	},

});

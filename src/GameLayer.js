var ArrayClouds = [];
var randomX;
var randomY;
var randomSpeed;

var GameLayer = cc.Layer.extend({
	ctor:function() {
		this._super();
		this.init();
	},


	init:function() {
		this._super();

		var size = cc.director.getWinSize();

		var bgsprite = cc.Sprite.create(res.BG_IMAGE);
		bgsprite.setPosition(size.width / 2, size.height / 2);
		this.addChild(bgsprite, 0);

		this.floor = cc.Sprite.create(res.FLOOR_IMAGE);
		this.floor.setPosition(0, 0);
		this.floor.setAnchorPoint(0,0);
		this.addChild(this.floor, 40);

    this.bubble = new Bubbles();
    this.bubble.x = randomX ;
    this.bubble.y = randomY ;

		this.spriteGirl = new Sprite();
		this.spriteGirl.x = 150;
		this.spriteGirl.y = size.height / 2;
		this.spriteGirl.topOfScreen = size.height;
		this.spriteGirl.Reset();
		this.addChild(this.spriteGirl, 100);

		this.Create();
	},

	onEnter:function() {
		this._super();
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan,
			onTouchMoved: this.onTouchMoved,
			onTouchEnded: this.onTouchEnded
		}, this);

		this.schedule(this.onTick);

	},

	onTick:function(dt) {
		if(this.spriteGirl.y < this.floor.y / 2) {
			this.spriteGirl.Reset();
			this.StopClouds();
			this.spriteGirl.y = cc.director.getWinSize().height / 2;
		}
		this.spriteGirl.UpdateSprite(dt);
	},

	onTouchBegan:function(touch, event) {
		var tp = touch.getLocation();
		var target = event.getCurrentTarget();
		console.log('onTouchBegan:' + tp.x.toFixed(2) + ','  + tp.y.toFixed(2));

		if(target.spriteGirl.state == 0) {
			target.spriteGirl.state = 1;
			target.StartClouds();
		}
		target.spriteGirl.SetStartSpeed();

		return false;
	},

	onTouchMoved:function(touch, event) {
		var tp = touch.getLocation();
		console.log('onTouchMoved:' + tp.x.toFixed(2) + ','  + tp.y.toFixed(2));
	},

	onTouchEnded:function(touch, event) {
		var tp = touch.getLocation();
		console.log('onTouchEnded:' + tp.x.toFixed(2) + ','  + tp.y.toFixed(2));
	},

	AddCloud:function(speed, position, scale, zIndex, name, XOffset) {
		var screenSize = cc.director.getWinSize();
		var cloud = new CloudSprite(name);
		cloud.SetSpeedAndWidth(speed, screenSize.width, XOffset);
		cloud.x = position.x;
		cloud.y = position.y;
		cloud.setScale(scale);
		this.addChild(cloud, zIndex);
		ArrayClouds[ArrayClouds.length] = cloud;
	},

	Create:function() {
    this.CreatBubbles();
    this.CreateClouds();
    this.CreateMountsAndTrees();
    this.CreatBubbles();
	},

  RandomPositionOfBubble: function() {
    this.randomX = Math.random()*800;
    this.randomY = Math.random()*600;
    this.randomSpeed = Math.random()*100;
  },

  CreateMountsAndTrees: function() {
    FileName = res.MOUNT_IMAGE;
    this.AddCloud(30, cc.p(300,170), 0.8, 30, FileName, 300);
    this.AddCloud(30, cc.p(800,170), 0.8, 30, FileName, 300);

    FileName = res.TREE_IMAGE;
    this.AddCloud(70, cc.p(128,72), 1.0, 50, FileName, 100);
    this.AddCloud(70, cc.p(624,72), 1.0, 50, FileName, 100);
    this.AddCloud(70, cc.p(864,72), 1.0, 50, FileName, 100);

  },

  CreateClouds: function() {
    var FileName = res.CLOUD_IMAGE;
    this.AddCloud(13.0, cc.p(700,610), 0.4, 10, FileName, 100);
    this.AddCloud(13.0, cc.p(150,570), 0.4, 10, FileName, 100);

    this.AddCloud(53.0, cc.p(150,300), 0.85, 20, FileName, 100);
    this.AddCloud(53.0, cc.p(400,500), 0.85, 20, FileName, 100);
    this.AddCloud(53.0, cc.p(880,400), 0.85, 20, FileName, 100);
  },

  CreatBubbles: function() {
    FileName1 = res.GREEN ;
    FileName2 = res.PINK ;
    FileName3 = res.ORANGE ;
    FileName4 = res.BLUE ;
    this.RandomPositionOfBubble();
    this.AddCloud(this.randomSpeed, cc.p(1020, this.randomY), 0.3, 25, FileName1, 100);
    this.RandomPositionOfBubble();
    this.AddCloud(this.randomSpeed, cc.p(1020, this.randomY), 0.3, 25, FileName2, 100);
    this.RandomPositionOfBubble();
    this.AddCloud(this.randomSpeed, cc.p(1020, this.randomY), 0.3, 25, FileName3, 100);
    this.RandomPositionOfBubble();
    this.AddCloud(this.randomSpeed, cc.p(1020, this.randomY), 0.3, 25, FileName4, 100);
  },

	StartClouds: function() {
		for (var i = 0 ; i < ArrayClouds.length ; ++i) {
			ArrayClouds[i].Start();
      this.bubble.isHit(this.spriteGirl.getPosition(), this.bubble.getPosition());
		}
	},

	StopClouds: function() {
 for (var i = 0 ; i < ArrayClouds.length ; ++i) {
			ArrayClouds[i].Stop();
		}
	},

});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

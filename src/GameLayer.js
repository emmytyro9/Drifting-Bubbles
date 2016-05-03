var ArrayClouds = [];

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
		this.addChild(bgsprite, kZindexBG);

		this.floor = cc.Sprite.create(res.FLOOR_IMAGE);
		this.floor.setPosition(0, 0);
		this.floor.setAnchorPoint(0,0);
		this.addChild(this.floor, kZindexFloor);

		this.spriteGirl = new RobinSprite();
		this.spriteGirl.x = kRobinStartX;
		this.spriteGirl.y = size.height / 2;
		this.spriteGirl.topOfScreen = size.height;
		this.spriteGirl.Reset();
		this.addChild(this.spriteGirl, kZindexRobin);

		this.CreateClouds();
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
		this.spriteGirl.UpdateRobin(dt);
	},

	onTouchBegan:function(touch, event) {
		var tp = touch.getLocation();
		var tar = event.getCurrentTarget();
		console.log('onTouchBegan:' + tp.x.toFixed(2) + ','  + tp.y.toFixed(2));

		if(tar.spriteGirl.state == kRobinStateStopped) {
			tar.spriteGirl.state = kRobinStateMoving;
			tar.StartClouds();
		}
		tar.spriteGirl.SetStartSpeed();

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

	CreateClouds:function() {
		var FileName = res.CLOUD_IMAGE;
		this.AddCloud(kCloudSpeedSlow, cc.p(700,610), kCloudScaleSlow, kZindexCloudSlow, FileName, kCloudRestartX);
		this.AddCloud(kCloudSpeedSlow, cc.p(150,570), kCloudScaleSlow, kZindexCloudSlow, FileName, kCloudRestartX);

		this.AddCloud(kCloudSpeedFast, cc.p(150,300), kCloudScaleFast, kZindexCloudFast, FileName, kCloudRestartX);
		this.AddCloud(kCloudSpeedFast, cc.p(400,500), kCloudScaleFast, kZindexCloudFast, FileName, kCloudRestartX);
		this.AddCloud(kCloudSpeedFast, cc.p(880,400), kCloudScaleFast, kZindexCloudFast, FileName, kCloudRestartX);

		FileName = res.MOUNT_IMAGE;
		this.AddCloud(kMountSpeed, cc.p(300,170), kMountScale, kZindexMount, FileName, kMountRestartX);
		this.AddCloud(kMountSpeed, cc.p(800,170), kMountScale, kZindexMount, FileName, kMountRestartX);

		FileName = res.TREE_IMAGE;
		this.AddCloud(kTreeSpeed, cc.p(128,72), kTreeScale, kZindexTree, FileName, kCloudRestartX);
		this.AddCloud(kTreeSpeed, cc.p(624,72), kTreeScale, kZindexTree, FileName, kCloudRestartX);
		this.AddCloud(kTreeSpeed, cc.p(864,72), kTreeScale, kZindexTree, FileName, kCloudRestartX);
	},

	StartClouds: function() {
		for (var i = 0 ; i < ArrayClouds.length ; ++i) {
			ArrayClouds[i].Start();
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

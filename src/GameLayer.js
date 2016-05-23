var ArrayClouds = [];
var ArrayBubble = [];
var ArrayFlower = [];
var count = 0;

var GameLayer = cc.Layer.extend({

	init:function() {
							this._super();
		 					cc.audioEngine.playMusic('res/Musics/HappyWhistling.mp3', true)
							this.scheduleUpdate();
							this.addKeyboardHandlers();
							var size = cc.director.getWinSize();
							this.schedule(this.CreateBubbles,1,Infinity,1);
							var check = true ;
							var bgsprite = cc.Sprite.create(res.BG_IMAGE);
							bgsprite.setPosition(size.width / 2, size.height / 2);
							this.addChild(bgsprite, 0);

							this.floor = cc.Sprite.create(res.FLOOR_IMAGE);
							this.floor.setPosition(0, 0);
							this.floor.setAnchorPoint(0,0);
							this.addChild(this.floor, 40);

							this.spriteGirl = new Sprite();
							this.spriteGirl.x = 150;
							this.spriteGirl.y = size.height / 2;
							this.spriteGirl.topOfScreen = size.height;
							this.spriteGirl.Reset();
							this.addChild(this.spriteGirl, 100);

							this.flower = new Flower();
							this.Create();

							this.textField5 = cc.LabelTTF.create("Press left-mouse to start", "Cambria", 72) ;
							this.textField5.setPosition( cc.p( 500, 460));
							this.textField5.setColor( new cc.color(255,255,255));
							this.addChild(this.textField5 , 1 );

							this.score = cc.LabelTTF.create("Score: " + count , "Cambria", 40) ;
							this.score.setPosition( cc.p( 870, 600));
							this.score.setColor( new cc.color(0,0,0));
							this.addChild(this.score , 1 );

	},

	isHitBubble: function() {
					for(var i = 0 ; i < ArrayBubble.length ; i++){
							for(var j = 0 ; j < ArrayFlower.length ; j++) {
							var close = this.closeTo(ArrayFlower[j],ArrayBubble[i]) ;
							if(close) {
									count++ ;
									console.log('score: ' + count);
									this.score.setString("Score: " + count) ;
									this.removeChild(ArrayFlower[j]);
									ArrayFlower.splice(j,1) ;
									this.removeChild(ArrayBubble[i]);
									ArrayBubble.splice(i,1) ;
									close = false ;
									this.CreateBubbles() ;
							}
					}
			}
	},

	shooting: function() {
							this.flower = new Flower();
							this.flower.setPosition(new cc.Point(this.spriteGirl.getPositionX(), this.spriteGirl.getPositionY()));
							this.addChild(this.flower);
							this.flower.scheduleUpdate();
							ArrayFlower.push(this.flower);
							if(this.flower.getPositionX() > 980)
							this.removeChild(this.flower);
	},


	isHitSprite: function() {
				for (var i = 0 ; i < ArrayBubble.length ; i++){
							var close = this.closeTo (this.spriteGirl, ArrayBubble[i]) ;
							if(close){
							cc.director.pause();
							this.EndGame();
			}
		}
	},

	SetBubbles: function() {
					for(var i = 0 ; i < GameLayer.SETOFBUBBLES.ArrayBubble ; i++){
							this.ArrayBubble[i].InitialPosition();
		}
	},

	closeTo: function (sp , obj) {
						var myPos = sp.getPosition();
						var oPos = obj.getPosition();
						return ((Math.abs(myPos.x - oPos.x) <= 60) && (Math.abs(myPos.y - oPos.y) <= 60));
	},

	update: function(dt) {
					if(this.check = true){
						this.isHitBubble();
						this.isHitSprite();
		}
	},

	onEnter:function() {
						this._super();
						cc.eventManager.addListener({
						event: cc.EventListener.TOUCH_ONE_BY_ONE,
						swallowTouches: true,
						onTouchBegan: this.onTouchBegan,
					}, this);
				this.schedule(this.onTick);
	},

	onTick:function(dt) {
						if(this.spriteGirl.y < this.floor.y / 2) {
							this.spriteGirl.Reset();
							this.StopClouds();
							cc.director.pause();
							this.EndGame();
						}
		 		this.spriteGirl.UpdateSprite(dt);
	},

	onTouchBegan:function(touch, event) {
						var tp = touch.getLocation();
						var target = event.getCurrentTarget();
						if(target.spriteGirl.state == 0) {
							target.spriteGirl.state = 1;
							target.StartClouds();
							cc.director.resume();
						}
						target.spriteGirl.SetStartSpeed();
						return false;
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

	CreateBubbles: function(){
							this.bubble = new Bubbles(100);
							this.bubble.RandomBubbles();
							this.bubble.setPosition( new cc.Point(1020 , Math.random()*600 ) );
							this.addChild(this.bubble);
							ArrayBubble.push(this.bubble);
							this.bubble.scheduleUpdate();
	},

	Create:function() {
							this.CreateClouds();
							this.CreateMountsAndTrees();
							this.CreateBubbles();
	},

	StartClouds: function() {
						this.textField5.setVisible(false);
						for (var i = 0 ; i < ArrayClouds.length ; ++i) {
							ArrayClouds[i].Start();
						}
	},

	StopClouds: function() {
						for (var i = 0 ; i < ArrayClouds.length ; ++i) {
							ArrayClouds[i].Stop();
					}
	},

	addKeyboardHandlers: function() {
							var self = this;
							cc.eventManager.addListener({
							event: cc.EventListener.KEYBOARD,
							onKeyPressed : function( keyCode, event ) {
							self.onKeyDown( keyCode, event );
								},
							}, this);
	},

	onKeyDown: function( keyCode, event ) {
							if(keyCode == 32) {
							this.shooting();
							}if(keyCode == 82) {
							cc.director.pushScene(new StartMenu());
					}
	},

	EndGame: function() {
							count = 0 ;
							this.textField2 = cc.LabelTTF.create("GAME OVER", "Cambria", 150);
							this.textField2.setPosition( cc.p( 500, 560));
							this.textField2.setColor( new cc.color(255,255,255));
							this.addChild(this.textField2 , 1 );
							this.textField4 = cc.LabelTTF.create("Press SpaceBar then,", "Cambria", 60) ;
							this.textField4.setPosition( cc.p( 500, 460));
							this.textField4.setColor( new cc.color(255,255,255));
							this.addChild(this.textField4 , 1 );
							this.textField3 = cc.LabelTTF.create("Press 'R' to Restart", "Cambria", 72) ;
							this.textField3.setPosition( cc.p( 500, 380));
							this.textField3.setColor( new cc.color(255,255,255));
							this.addChild(this.textField3 , 1 );
						}
});

var StateGame = cc.Scene.extend({
							onEnter: function() {
							this._super();
		  				cc.director.resume();
							var layer = new GameLayer();
							layer.init();
							this.addChild( layer );
					},
});


var StartScene = cc.Scene.extend({
							onEnter: function() {
							this._super();
							var layer = new StartMenu();
							this.addChild( layer );
	},
});

GameLayer.STATES = {
	FRONT : 1 ,
	STARTED : 2 ,
	PAUSED : 3,
};

GameLayer.SETOFBUBBLES = {
	Green : 3 ,
	Orange : 3 ,
	Pink : 3 ,
	Blue : 3
};

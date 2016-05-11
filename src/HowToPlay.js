var HowToPlay = cc.Sprite.extend({
  ctor: function () {
    this._super();
    var size = cc.director.getWinSize();
    this.setPosition(new cc.Point(size.width / 2, size.height / 2));
    this.initWithFile(res.HTP);
    this.addKeyboardHandlers();
  },

  addKeyboardHandlers: function () {
    var self = this;
    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed: function (keyCode, event) {
        self.onKeyDown(keyCode);
      }
    }, this);
  },

  onKeyDown: function (keyCode, event) {
    if (keyCode == 32)
    cc.director.pushScene(new StateGame());
  }
});

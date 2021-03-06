function SpriteChallenger() {
    this.initialize.apply(this, arguments);
}

SpriteChallenger.prototype = Object.create(Sprite.prototype);
SpriteChallenger.prototype.constructor = SpriteChallenger;

SpriteChallenger.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this._title = new WindowTitle();
    this._text = new WindowText();
    this._active = true;
    this.visible = false;
    this.create();
};

SpriteChallenger.prototype.isActive = function () {
    return this._active;
};

SpriteChallenger.prototype.enable = function () {
    this._active = true;
};

SpriteChallenger.prototype.disable = function () {
    this._active = false;
};

SpriteChallenger.prototype.isShown = function () {
    return this.visible;
};

SpriteChallenger.prototype.isHidden = function () {
    return !this.visible;
};

SpriteChallenger.prototype.show = function () {
    this.visible = true;
};

SpriteChallenger.prototype.hide = function () {
    this.visible = false;
};

SpriteChallenger.prototype.create = function () {
    this.createTitleChallenger();
    this.createTextChallenger();
    this.addChildren();
};

SpriteChallenger.prototype.createTitleChallenger = function () {
    this._title.changePosition(0, Graphics.boxHeight / 3);
    this._title.changeTextColor('#ed9100');
    this._title.addText('Card Battle Challenge');
    this._title.renderText();
};

SpriteChallenger.prototype.createTextChallenger = function () {
    let enemyName = CardBattleManager.getEnemyName();
    let enemyLevel = CardBattleManager.getEnemyLevel();
    let enemyFolderName = CardBattleManager.getEnemyFolderName();

    this._text.changePosition(0, Graphics.boxHeight / 2.3);
    this._text.addText([
        'Lv. ' + enemyLevel,
        enemyName + ', ' + enemyFolderName
    ]);
    this._text.renderText();
};

SpriteChallenger.prototype.addChildren = function () {
    this.addChild(this._title);
    this.addChild(this._text);
};

SpriteChallenger.prototype.openWindows = function () {
    this._title.open();
    this._text.open();
};

SpriteChallenger.prototype.closeWindows = function () {
    this._title.close();
    this._text.close();
};

SpriteChallenger.prototype.isOpenWindows = function () {
    return this._text.openness === 255 && this._title.openness === 255;
};

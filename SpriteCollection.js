function SpriteCollection() {
    this.initialize.apply(this, arguments);
};

SpriteCollection.prototype = Object.create(Sprite.prototype);
SpriteCollection.prototype.constructor = SpriteCollection;

SpriteCollection.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._cardCollection = [];
    this._spriteCollection = [];
    this.createLayers();
};

SpriteCollection.prototype.createLayers = function() {
    this._lowerLayer = new Sprite();
    this._highestLayer = new Sprite();
    this.addChildAt(this._lowerLayer, 0);
    this.addChildAt(this._highestLayer, 1);
};

SpriteCollection.prototype.clearCollections = function() {
    this._cardCollection = [];
    this._spriteCollection = [];
};

SpriteCollection.prototype.refreshCollections = function(GameCardCollection) {
    this.clearCollections();

    GameCardCollection.forEach(GameCard => {
        this.addCard(GameCard);
        this.addSprite(GameCard);
    });
};

SpriteCollection.prototype.addCard = function(GameCard) {
    this._cardCollection.push(GameCard);
};

SpriteCollection.prototype.addSprite = function(GameCard) {
    this._spriteCollection.push(new SpriteCard(GameCard));
};

SpriteCollection.prototype.addChildren = function() {
    this._spriteCollection.forEach(SpriteCard => {
        this.addChild(SpriteCard);
    });
};

SpriteCollection.prototype.removeChildren = function() {
    this._spriteCollection.forEach(SpriteCard => {
        this.removeChild(SpriteCard);
    });
};

SpriteCollection.prototype.highChild = function(index) {
    this.removeChildren();

    this._spriteCollection.forEach((SpriteCard, indexChild) => {
        if (index === indexChild) {
            this.addChildUp(SpriteCard);
        } else {
            this.addChildToBack(SpriteCard);
        }
    });
};

SpriteCollection.prototype.addChildUp = function(child) {
    let layerIndex = this.children.indexOf(this._highestLayer);
    this.addChildAt(child, layerIndex + 1);
};

SpriteCollection.prototype.addChildToBack = function(child) {
    let layerIndex = this.children.indexOf(this._lowerLayer);
    this.addChildAt(child, layerIndex + 1);
};

SpriteCollection.prototype.hasFramesCollection = function() {
    let activeMovementove = false;

    this._spriteCollection.forEach((SpriteCard, index) => {
        let child = this.selectChild(index);
        if (child.hasSequence() || child.hasFrameMove()) {
            activeMovementove = true;
        };
    });

    return activeMovementove;
};

SpriteCollection.prototype.selectChild = function(index) {
    let indexOfChild = this.children.indexOf(this._spriteCollection[index]);
    return this.children[indexOfChild];
};

SpriteCollection.prototype.positionHand = function(index) {
    this.selectChild(index).setActions([
        {type: 'POSITION_HAND'},
        {type: 'REFRESH'},
        {type: 'OPEN'},
        {type: 'LESS', times: 2}
    ]);
};

SpriteCollection.prototype.positionCollection = function(index) {
    this.selectChild(index).setActions([
        {type: 'POSITION_COLLECTION', index, length: this.children.length}
    ]);
};

SpriteCollection.prototype.moveField = function(index) {
    this.selectChild(index).setActions([
        {type: 'MOVE_FIELD', index, frame: 40}
    ]);
};

SpriteCollection.prototype.moveAttack = function(index, target) {
    this.selectChild(index).setActions([
        {type: 'PLUS', times: 2, frame: 20},
        {type: 'CONFIRM'},
        {type: 'LESS', times: 2, frame: 10},
        {type: 'UNCONFIRM'},
        {type: 'MOVE_ATTACK', frame: 3, target}
    ]);
};

SpriteCollection.prototype.open = function(index) {
    this.selectChild(index).setActions([
        {type: 'REFRESH'},
        {type: 'OPEN', index, frame: 10}
    ]);
};

SpriteCollection.prototype.close = function(index) {
    this.selectChild(index).setActions([
        {type: 'CLOSE', index, frame: 10}
    ]);
};

SpriteCollection.prototype.toTurn = function(index) {
    this.selectChild(index).setActions([
        {type: 'CLOSE', frame: 10},
        {type: 'TO_TURN'},
        {type: 'REFRESH'},
        {type: 'OPEN', frame: 10}
    ]);
};

SpriteCollection.prototype.flash = function(index) {
    this.selectChild(index).setActions([
        {type: 'ANIMATION', index: 121, frame: 10}
    ]);
};

SpriteCollection.prototype.enabled = function(index) {
    this.selectChild(index).setActions([
        {type: 'ENABLE'},
        {type: 'REFRESH'}
    ]);
};

SpriteCollection.prototype.disabled = function(index) {
    this.selectChild(index).setActions([
        {type: 'DISABLE'},
        {type: 'REFRESH'}
    ]);
};

SpriteCollection.prototype.isLight = function(index) {
    return this.selectChild(index).isLight();
};

SpriteCollection.prototype.isUnlit = function(index) {
    return this.selectChild(index).isUnlit();
};

SpriteCollection.prototype.isClosed = function(index) {
    return this.selectChild(index).isClose();
};

SpriteCollection.prototype.light = function(index) {
    this.selectChild(index).setActions([
        {type: 'LIGHT'},
        {type: 'MOVE_UP', times: 1, frame: 4}
    ]);
};

SpriteCollection.prototype.unlit = function(index) {
    this.selectChild(index).setActions([
        {type: 'UNLIT'},
        {type: 'MOVE_DOWN', times: 1, frame: 4}
    ]);
};

SpriteCollection.prototype.select = function(index) {
    this.selectChild(index).setActions([
        {type: 'ANIMATION', index: 121, frame: 4},
        {type: 'SELECT'},
        {type: 'REFRESH'}
    ]);
};

SpriteCollection.prototype.unselect = function(index) {
    this.selectChild(index).setActions([
        {type: 'ANIMATION', index: 121, frame: 4},
        {type: 'UNSELECT'},
        {type: 'REFRESH'}
    ]);
};

SpriteCollection.prototype.confirm = function(index) {
    this.selectChild(index).setActions([
        {type: 'UNLIT'},
        {type: 'UNSELECT'},
        {type: 'CONFIRM'}
    ]);
};

SpriteCollection.prototype.react = function(index) {
    this.selectChild(index).setActions([
        {type: 'PLUS', times: 1, frame: 10},
        {type: 'LESS', times: 1, frame: 10}
    ]);
};

SpriteCollection.prototype.effect = function(index) {
    this.selectChild(index).setActions([
        {type: 'CLOSE', index, frame: 10},
        {type: 'EFFECT'},
        {type: 'REFRESH'},
        {type: 'OPEN', index, frame: 10}
    ]);
};

SpriteCollection.prototype.block = function(index) {
    this.selectChild(index).setActions([
        {type: 'BLOCK'},
        {type: 'REFRESH'},
    ]);
};

SpriteCollection.prototype.activeEffect = function(index) {
    this.selectChild(index).setActions([
        {type: 'PLUS', times: 1, frame: 10},
        {type: 'ANIMATION', index: 121, frame: 20},
        {type: 'LESS', times: 6, frame: 20}
    ]);
};

SpriteCollection.prototype.damager = function(index) {
    this.selectChild(index).setActions([
        {type: 'ANIMATION', index: 123},
        {type: 'MOVE_UP', times: 1, frame: 2},
        {type: 'MOVE_DOWN', times: 2, frame: 2},
        {type: 'MOVE_UP', times: 1, frame: 2},
        {type: 'MOVE_LEFT', times: 1, frame: 2},
        {type: 'MOVE_RIGHT', times: 2, frame: 2},
        {type: 'MOVE_LEFT', times: 2, frame: 2},
        {type: 'MOVE_RIGHT', times: 2, frame: 2},
        {type: 'MOVE_LEFT', times: 2, frame: 2},
        {type: 'MOVE_RIGHT', times: 1, frame: 2},
    ]);
};

SpriteCollection.prototype.toDestroy = function(index) {
    this.selectChild(index).setActions([
        {type: 'ANIMATION', index: 123},
        {type: 'MOVE_LEFT', times: 1, frame: 4},
        {type: 'MOVE_RIGHT', times: 2, frame: 4},
        {type: 'MOVE_LEFT', times: 2, frame: 4},
        {type: 'MOVE_RIGHT', times: 2, frame: 4},
        {type: 'MOVE_LEFT', times: 2, frame: 4},
        {type: 'MOVE_RIGHT', times: 1, frame: 4},
        {type: 'CLOSE', frame: 10}
    ]);
};

SpriteCollection.prototype.powerUp = function(index) {
    this.selectChild(index).setActions([
        {type: 'ANIMATION', index: 124, frame: 20},
    ]);
};

SpriteCollection.prototype.powerDown = function(index) {
    this.selectChild(index).setActions([
        {type: 'ANIMATION', index: 125, frame: 20},
    ]);
};

SpriteCollection.prototype.setAttack = function(index, points) {
    this.selectChild(index).setActions([
        {type: 'ATTACK', points}
    ]);
};

SpriteCollection.prototype.setHealth = function(index, points) {
    this.selectChild(index).setActions([
        {type: 'HEALTH', points}
    ]);
};

SpriteCollection.prototype.waitMoment = function(index, wait) {
    this.selectChild(index).setActions([
        {type: 'WAIT', frame: wait}
    ]);
};

SpriteCollection.prototype.update = function() {
    Sprite.prototype.update.call(this);
};

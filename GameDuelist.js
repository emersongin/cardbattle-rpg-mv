function GameDuelist() {
    this.initialize.apply(this, arguments);
};

GameDuelist.prototype.constructor = GameDuelist;

GameDuelist.prototype.initialize = function (Duelist) {
    this._id = Duelist.id || false;
    this._level = Duelist.level || false;
    this._name = Duelist.name;
    this._folder = new GameFolder(Duelist.folders);
    this._colors = new GameFolderColor();
    this._field = [];
    this._hand = [];
    this._trash = [];
    this._pack = [];
    this._wins = 0;
};

GameDuelist.prototype.getID = function () {
    return this._id;
};

GameDuelist.prototype.getLevel = function () {
    return this._level;
};

GameDuelist.prototype.getName = function () {
    return this._name;
};

GameDuelist.prototype.getFolderName = function () {
    return this._folder.getName();
};

GameDuelist.prototype.getFolderCollection = function () {
    return this._folder.getCollection();
};

GameDuelist.prototype.getPackCollection = function () {
    return this._pack;
};

GameDuelist.prototype.getPackLength = function () {
    return this._pack.length;
};

GameDuelist.prototype.getHandCollection = function () {
    return this._hand;
};

GameDuelist.prototype.getHandLength = function () {
    return this._hand.length;
};

GameDuelist.prototype.getTrashCollection = function () {
    return this._trash;
};

GameDuelist.prototype.getFieldCollection = function () {
    return this._field;
};

GameDuelist.prototype.getColors = function () {
    return this._colors;
};

GameDuelist.prototype.createPackCollection = function () {
    this._pack = this.createGameCardCollection();
};

GameDuelist.prototype.randomPackCollection = function () {
    this._pack = this.randomCollection(this._pack);
};

GameDuelist.prototype.createGameCardCollection = function () {
    let gameFolderCollection = this._folder.getCollection();
    let gameCardCollection = [];

    gameFolderCollection.forEach(CardStored => {
        for (let index = 0; index < CardStored.amount; index++) {
            gameCardCollection.push(new GameCard(CardStored.id));
        }
    });

    return gameCardCollection;
};

GameDuelist.prototype.randomCollection = function (GameCardCollection) {
    let standCollection = GameCardCollection;
    let randomCollection = [];

    while (standCollection.length) {
        let random = Math.floor(Math.random() * standCollection.length);
        randomCollection.push(standCollection.splice(random, 1).shift());
    }

    return randomCollection; 
};

GameDuelist.prototype.pushToCollection = function (collectionOrigin, collectionDestiny) {
    collectionDestiny.push(collectionOrigin.shift());
};

GameDuelist.prototype.getWins = function () {
    return this._wins;
};

GameDuelist.prototype.setColor = function (Color) {
    this._colors[Color.name] = ( this._colors[Color.name] + Color.value );
};

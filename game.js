/* global Phaser */
var game = new Phaser.Game(640, 640, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('matching', 'assets/tilemaps/maps/phaser_tiles.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilemaps/tiles/tmw_desert_spacing.png');//, 100, 100, -1, 1, 1);    
}

var timeCheck = 0;
var flipFlag = false;

var startList = new Array();
var squareList = new Array();

var WIDTH = 40;
var HEIGHT = 40;

var masterCounter = 0;
var squareCounter = 0;
var square1Num;
var square2Num;
var savedSquareX1;
var savedSquareY1;
var savedSquareX2;
var savedSquareY2;

var map;
var levelDetails;
var tileset;
var layer;

var marker;
var currentTile;
var currentTilePosition;

var tileBack = 25;
var timesUp = '+';
var youWin = '+';
var textDisplay = null;
var inputTextDisplay = null;
var currentInput = null;

var myCountdownSeconds;


function create() {

        map = game.add.tilemap('matching');

        map.addTilesetImage('Desert', 'tiles');

        //tileset = game.add.tileset('tiles');
    
        layer = map.createLayer('Ground');//.tilemapLayer(0, 0, 600, 600, tileset, map, 0);
        
        levelDetails = window.rooms[0];

        //layer.resizeWorld();
        
        game.input.keyboard.addCallbacks(this, null, null, processKey);

        marker = game.add.graphics();
        marker.lineStyle(2, 0x00FF00, 1);
        marker.drawRect(0, 0, 32, 32);
        
        textDisplay = game.add.text(20, 650, "", { font: "16px Arial", fill: "#ffffff", align: "center" });
        inputTextDisplay = game.add.text(20, 670, "", { font: "16px Arial", fill: "#ffffff", align: "center" });
    
        loadRoom();

}

function update() {
    
    if (layer.getTileX(game.input.activePointer.worldX) <= WIDTH) // to prevent the marker from going out of bounds
    {
        marker.x = layer.getTileX(game.input.activePointer.worldX) * 32;
        marker.y = layer.getTileY(game.input.activePointer.worldY) * 32;
    }
    processClick();
}

function processKey(char) {
    currentInput += char;
}
   


function processClick() {
   
    currentTile = map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y));
    currentTilePosition = {
        x: layer.getTileX(game.input.activePointer.worldX),
        y: layer.getTileY(game.input.activePointer.worldY)
    }
        
    if (game.input.mousePointer.isDown) {
        for (var i = 0; i < levelDetails.items.length; i++) {
            var item = levelDetails.items[i];
            if (item.position.x == currentTilePosition.x && item.position.y == currentTilePosition.y) {
                return clickedItem(item);
            }
        }
        
        clearPanel();
        displayMessage("There's nothing here...")
    }    
}

function loadRoom() {
    
}
 

function render() {

  
}

function clickedItem(item) {
    clearPanel();
    
    if (item.code) {
        return requestCode(item);
    }
   
    displayItemName(item.name);
    displayMessage(item.description);
    
}

function clearPanel() {
    $("#panel .itemName").text("");
    $("#panel .text").text("");
    $("#panel .input").hide();
}

function displayItemName(name) {
    $("#panel .itemName").text(name);
}

function displayMessage(text) {
    $("#panel .text").text(text);
}

function requestCode(item) {
    displayMessage(item.description);
    var inputField = $("#panel .input input");
    inputField.val("");
    $("#panel .input").show();
    inputField.keydown(function (e) {
        if (e.keyCode == 13) {
            codeEntered(item, inputField.val()); 
        }
    });
    inputField.focus();
}

function codeEntered(item, codeEntered) {
    $("#panel .input").hide();
    
    if (item.code != codeEntered) {
        return displayMessage("Invalid code");
    }
    
    displayMessage("Success, you unlocked " + item.name);
}





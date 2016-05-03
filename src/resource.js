var res = {};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

res.BG_IMAGE = 'res/images/BG.png';
res.FLOOR_IMAGE = 'res/images/Floor.png';
res.TREE_IMAGE = 'res/images/Tree.png';
res.CLOUD_IMAGE = 'res/images/Cloud.png';
res.MOUNT_IMAGE = 'res/images/Mount.png';



var kZindexBG = 0;
var kZindexFloor = 40;
var kZindexRobin = 100;
var kZindexCloudSlow = 10;
var kZindexCloudFast = 20;
var kZindexTree = 50;
var kZindexMount = 30;

var kRobinStateStopped = 0;
var kRobinStateMoving = 1;
var kRobinStartSpeedY = 300;
var kRobinStartX = 240;

var kCloudRestartX = 100;
var kMountRestartX = 300;

var kCloudSpeedSlow = 13.0;
var kCloudSpeedFast = 53.0;
var kMountSpeed = 30.0;
var kTreeSpeed = 70.0;

var kCloudScaleSlow = 0.4;
var kCloudScaleFast = 0.85;
var kMountScale = 0.8;
var kTreeScale = 1.0;

var GRAVITY = -620;

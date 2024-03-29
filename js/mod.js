let modInfo = {
	name: "The Minecraft Tree",
	id: "mymod",
	author: "ArvingoMaster",
	pointsName: "energy",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players

	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.1",
	name: "STONE AGE + Not important Coal",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v1.0</h3><br>
		- Stone!<br>
		- Done!<br>
		<h3>v0.0</h3><br>
			- Dirt and Wood!<br>
			- They have upgrades and some milestons`

let winText = `Congratulations! You have finally beat the minecraft tree! Try to speedrun this game!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (!inChallenge("d", 12)) {
		if (hasUpgrade("d", 12)) gain = gain.times(upgradeEffect("d", 12))
		if (hasUpgrade("d", 11)) gain = gain.times(2)
		if (hasUpgrade("d", 22)) gain = gain.times(upgradeEffect("d", 22))
		if (hasUpgrade("d", 23)) gain = gain.times(upgradeEffect("d", 22))
		if (inChallenge("d", 11)) gain = gain.sqrt()
		if (hasUpgrade("W", 25)) gain = gain.times(2)
		if (inChallenge("d", 21)) gain = gain.times(0.0000000001).sqrt()
		if (hasAchievement("A", 22)) gain = gain.times(achievementEffect("A", 22))
		if (hasAchievement("A", 25)) gain = gain.times(3)
	}

	if (hasMilestone("W", 1)) gain = gain.times(buyableEffect("W", 11))
	if (inChallenge("d", 11) && inChallenge("d", 12)) gain = gain.sqrt()
	if (hasChallenge("d", 21)) gain = gain.add(1)
	if (hasUpgrade("c", 11)) gain = gain.times(upgradeEffect("c", 11))
		if (hasMilestone("i", 0)) gain = gain.times(5)
		if (hasMilestone("F", 2)) gain = gain.times(6)

	return gain

}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

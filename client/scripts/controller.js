var xmlns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink";

function Controller() {
	this.commands = [];
	this.nodes = 0;
	this.playing = false;
	this.commandMenu = document.getElementById("commands");
	document.getElementById("start").addEventListener("click", this.playCommand.bind(this),false)
	document.getElementById("commands").addEventListener("click", this.recievedNewCommand.bind(this),false)
}

Controller.prototype.addCommand = function(command){
	this.commands.push(command)
}

Controller.prototype.getCommands = function(){
	return this.commands
}

Controller.prototype.playCommand = function(e) {
	if (!this.nodes) {
		this.selectNewCommand(e);
		return
	}
	
	if (!this.playing){
		var animation = e.target.querySelector("animate")
		animation.beginElement();
		this.sendCommand()
		this.playing = true;
		return
	}
	
	this.stopPlayingCommand();
}

Controller.prototype.stopPlayingCommand = function(e) {
	var animation = document.querySelector("animate")
	animation.endElement();
	this.playing = false;
}

Controller.prototype.sendCommand = function(e) {
	send(this.getCommands().join(" | "));
}

Controller.prototype.selectNewCommand = function(event) {
	this.stopPlayingCommand();
	this.commandMenu.setAttribute("transform", event.target.parentNode.getAttribute("transform"));
	this.commandMenu.addClassName("active");
	// remove endpoint class
	event.target.parentNode.removeClassName("endpoint");
}


Controller.prototype.recievedNewCommand = function(event) {
	if (event.target.tagName != "dt") return
	var cmd = event.target.textContent;
	this.commandMenu.removeClassName("active");
	this.addCommand(cmd);
	this.createNode();
}

Controller.prototype.createNode = function() {
	this.nodes++;
	// add new node
	node = document.getElementById("node").cloneNode(true);
	node.removeAttribute("id");
	node.childNodes[3].textContent = this.getCommands()[this.nodes-1];
	node.setAttribute("transform", "translate("+(this.nodes*100)+",100)");
	node.querySelector(".end").addEventListener("click", this.selectNewCommand.bind(this),false)
	document.documentElement.insertBefore(node, this.commandMenu)
}

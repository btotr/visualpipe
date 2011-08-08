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

Controller.prototype.addArguments = function(e) {
	var argument = e.target.parentNode.querySelector(".name").textContent
	if (e.target.parentNode.hasClassName("prompt")) {
		var prompt = window.prompt("arguments?")
		if(!prompt) return
		argument = argument + " " + prompt;
	}
 	var name = e.currentTarget.getAttribute("rel")
	var index  = 0;
	this.commands.forEach(function(i){
		if (i.indexOf(name) != -1) {
			if (i.indexOf(argument) != -1)  index = -1
			return
		}
		index++;
	});
	if (index != -1) this.commands[index] = this.commands[index] + " " + argument
	console.log(this.commands)
}

Controller.prototype.hideArguments = function(e) {
	
}

Controller.prototype.showArguments = function(e) {
	if (e.target.tagName != "rect" && e.target.tagName != "text") return
	var self = this;
	
	function hide(){
		var argumentMenu = document.getElementById("argumentsMenu")
		document.documentElement.removeChild(argumentMenu);
		document.removeEventListener("click", hide,true)	
	}
	
	function show(argumentList, command){
		var foreignObject  = document.createElementNS(xmlns, "foreignObject")
		foreignObject.setAttribute("transform", e.currentTarget.getAttribute("transform"));
		foreignObject.setAttribute("width", "300px");
		foreignObject.setAttribute("height" ,"100%");
		foreignObject.setAttribute("y" ,"40px");
		foreignObject.setAttribute("id" ,"argumentsMenu");
		var clonedArguments = argumentList.cloneNode(true)
		clonedArguments.addClassName("active")
		clonedArguments.setAttribute("rel" ,command);
		clonedArguments.addEventListener("click", self.addArguments.bind(self),false)
		foreignObject.appendChild(clonedArguments)
		document.documentElement.appendChild(foreignObject)
		document.addEventListener("click", hide,true)
	}
	 
	var command = e.currentTarget.getElementsByTagName("text")[0].textContent
	var commands = document.getElementsByTagName("dt");
	for (var i = 0, l=commands.length;i<l;i++){
		if (commands[i].textContent == command) {
			show(commands[i].nextElementSibling.nextElementSibling.firstElementChild, command);
			break
		}
		
	}
	
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
	node.addEventListener("click", this.showArguments.bind(this), false)
	node.childNodes[3].textContent = this.getCommands()[this.nodes-1];
	node.setAttribute("transform", "translate("+(this.nodes*100)+",100)");
	node.querySelector(".end").addEventListener("click", this.selectNewCommand.bind(this),false)
	document.documentElement.insertBefore(node, this.commandMenu)
}

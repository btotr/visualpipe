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

Controller.prototype.removeCommand = function(command){
	var index = rindex = 0;
	this.commands.forEach(function(i){
		if (i.indexOf(name) != -1) {
			index = rindex
			return
		}
		rindex++;
	});
	this.commands.splice(index, 1)
}

Controller.prototype.removeNode = function(e){
	if (!e.altKey) return // alt + click
	var name = e.target.parentNode.getElementsByTagName("text")[0].textContent
	this.removeCommand(name)
	document.documentElement.removeChild(e.target.parentNode)
	this.nodes--;
	var nodes = document.getElementsByClassName("node")
	for (var n=0, i=0;i<nodes.length;i++){
		if (nodes[i].hasAttribute("id")) continue
		nodes[i].setAttribute("transform", "translate("+(++n*100)+",100)");
	}
}

Controller.prototype.addArguments = function(name) {
	var index = rindex = 0;
	this.commands.forEach(function(i){
		if (i.indexOf(name) != -1) {
			index = rindex
			return
		}
		rindex++;
	});
	var prompt = window.prompt("arguments?", this.commands[index].replace(name, ""))
	if(!prompt) return
	this.commands[index] = name + " " + prompt
}

Controller.prototype.showArguments = function(e) {
	if (e.altKey) return
	if (e.target.tagName != "rect" && e.target.tagName != "text") return
	
	var self = this
	function show(argumentList, command){
		var name = e.currentTarget.getElementsByTagName("text")[0].textContent
		console.group(name)
		for (var i =0,l=argumentList.children.length;i<l;i++)
			console.log(argumentList.children[i].children[0].textContent,argumentList.children[i].children[1].textContent)
		console.groupEnd()			
		self.addArguments(name)
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
	if(event.target.getAttribute("class") == "start")
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
	node.getElementsByTagName("rect")[0].addEventListener("click", this.removeNode.bind(this),false)
	document.documentElement.insertBefore(node, this.commandMenu)
}

function $colorLog(message, color) {
	let retValColor = color || "black";
	switch (color) {
		case "success":  
			retValColor = "Green"; 
			break;
		case "info":     
			retValColor = "DodgerBlue";  
			break;
		case "error":   
			retValColor = "Red";     
			break;
		case "warning":  
			retValColor = "Orange";   
			break;
		default: 
			retValColor = color;
	}
	console.log("%c" + message, "color:" + retValColor);
}
Object.defineProperty(console, "$colorLog", { value: $colorLog })
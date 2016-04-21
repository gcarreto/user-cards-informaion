var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

for(var i=0;i<process.argv.length;i++){
	if(process.argv[i].match(/NODE_ENV/)){
		
		var environmentArray = process.argv[i].split('=');
		if(environmentArray){
			env = environmentArray[1];
		}
	}
}

module.exports = env;
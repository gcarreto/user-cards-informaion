var APP_NAME = "app";

module.exports = {
	qa:{
		app_name: APP_NAME,
		port: process.env.PORT || 3000,
		retryLimit:4,
		facebook:{
			id:'1679404825643085',
			secret:'fd93fab59fb180ba8c99aacef38ee4d5',
			callbackURL : 'http://localhost:3000/app/auth/facebook/callback'
		},
		holonis:{
			host:"hook.io",
			port:80,
			method:'GET',
			path:"/holonis-dev/user?limit=1"
		},
		mongodb:{
			host:'localhost',
			port: process.env.MONGO_NODE_DRIVER_PORT | 27017,
			database:"holonis-cards",
			collections:{
				user:{
					collectionName:"usersTemporal"
				},
				cardsInfo:{
					collectionName:"cardsTemporal"
				}
			}
		}
	},
	development:{
		app_name:APP_NAME,
		port: process.env.PORT || 3000,
		retryLimit:4,
		facebook:{
			id:'1679404825643085',
			secret:'fd93fab59fb180ba8c99aacef38ee4d5',
			callbackURL : 'http://localhost:3000/app/auth/facebook/callback'
		},
		holonis:{
			host:"hook.io",
			port:80,
			method:'GET',
			path:"/holonis-dev/user?limit="
			//path:"/holonis-dev/user?limit=5"
		},
		mongodb:{
			host:'localhost',
			port: process.env.MONGO_NODE_DRIVER_PORT | 27017,
			database:"holonis-cards",
			collections:{
				user:{
					collectionName:"usersTemporal"
				},
				cardsInfo:{
					collectionName:"cardsTemporal"
				}
			}
		}
	},
	prod:{
		app_name:APP_NAME,
		port: process.env.PORT || 3000,
		retryLimit:4,
		facebook:{
			id:'1679404825643085',
			secret:'fd93fab59fb180ba8c99aacef38ee4d5',
			callbackURL : 'http://localhost:3000/app/auth/facebook/callback'
		},
		holonis:{
			host:"hook.io",
			port:80,
			method:'GET',
			path:"/holonis-dev/user?limit=5"
		},
		mongodb:{
			host:'localhost',
			port: process.env.MONGO_NODE_DRIVER_PORT | 27017,
			database:"holonis-cards",
			collections:{
				user:{
					collectionName:"usersTemporal"
				},
				cardsInfo:{
					collectionName:"cardsTemporal"
				}
			}
		}
	}
};
const path = require('path')

module.exports = {
	
	devServer:{
		contentBase:path.join(__dirname, 'dist'),
		port:8080
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/(node_modules)/,
				use:{
					loader:"babel-loader",
					options:{
						presets:['env','react']
					}
				}
			},
			{
				test:/\.css$/,
				use:["style-loader", "css-loader"]
					
			}
			
		]

	}
}
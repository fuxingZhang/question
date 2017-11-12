const fs = require("fs")
const Promise = require("bluebird")

Promise.promisifyAll(fs)

module.exports = {
	async read(path){
		const users = await fs.readFileAsync(path)
		return JSON.parse(users)
	},
	write(path,data){
		return fs.writeFileAsync(path,JSON.stringify(data))
	}
}
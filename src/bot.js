const LineConnect = require('./connect');
let line = require('./main.js');
let LINE = new line();

 //const auth = {
 //	authToken: 'El1S6foZOlYbmDwnQ5X3.VgoedwlLOECsbTU8wBy6uW.5gZlmh1YDYn+tQevNQ4krgaswU8Osz7IpwZBFsv2BkU=',
 //}
// let client =  new LineConnect(auth);
let client =  new LineConnect();

client.startx().then(async (res) => {
	
	while(true) {
		try {
			ops = await client.fetchOps(res.operation.revision);
		} catch(error) {
			console.log('error',error)
		}
		for (let op in ops) {
			if(ops[op].revision.toString() != -1){
				res.operation.revision = ops[op].revision;
				LINE.poll(ops[op])
			}
		}
	}
});

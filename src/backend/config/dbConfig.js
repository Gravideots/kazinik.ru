const remoteHost = 'mongodb://kazinik:KAZINIKDB@kazinik-shard-00-00-nol3s.mongodb.net:27017,kazinik-shard-00-01-nol3s.mongodb.net:27017,kazinik-shard-00-02-nol3s.mongodb.net:27017/test?ssl=true&replicaSet=Kazinik-shard-0&authSource=admin';
const localHost = 'localHost';
const localPort = '27017';

// let dbpath = (process.env.DB === 'local') ? ('mongodb://' + localHost + ':' + localPort + '/appDB') :  remoteHost;
let dbpath = 'mongodb://' + localHost + ':' + localPort + '/test';

module.exports = {
	appDB: {
		url: dbpath
	}
};

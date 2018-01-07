const remoteHost = "mongodb://kazinik:KAZINIKDB@kazinik-shard-00-00-nol3s.mongodb.net:27017,kazinik-shard-00-01-nol3s.mongodb.net:27017,kazinik-shard-00-02-nol3s.mongodb.net:27017/test?ssl=true&replicaSet=Kazinik-shard-0&authSource=admin"
const localHost = '127.0.0.1'
const localPort = "27017"

let dbpath = (process.env.DB === 'local') ? ('mongodb://' + localHost + ':' + localPort + '/appDB') :  remoteHost ;

module.exports = {
    appDB: {
        'url': dbpath
    }
}
const host = "mongodb://kazinik:KAZINIKDB@kazinik-shard-00-00-nol3s.mongodb.net:27017,kazinik-shard-00-01-nol3s.mongodb.net:27017,kazinik-shard-00-02-nol3s.mongodb.net:27017/test?ssl=true&replicaSet=Kazinik-shard-0&authSource=admin"
const port = "27017"

module.exports = {
    appDB: {
        'url': host
    }
}
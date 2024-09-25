
const host = `mongodb://localhost:27017`;

enum MongoDBEndpointHelper{
    default = `${host}/my_next_agenda`,
    agenda = `${host}/my_next_agenda`,
    andarilo = `${host}/my_next_agenda`,
    shopee = `${host}/my_next_agenda`
}

export default MongoDBEndpointHelper;
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

dotenv.config()
app.use(express.json())


let connectedDb = null
const mongoConfig = {
    dbURL: `mongodb+srv://orenyaniv90:${process.env.ATLAS_CLUSTER_PASSWORD}@constractionsdb.oajvt.mongodb.net/?retryWrites=true&w=majority&appName=ConstractionsDB`,
    dbName: 'ConstractionsDB'
}


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
        credentials: true
    }
    app.use(cors(corsOptions))
}


const _connect = async () => {
    if (connectedDb) return connectedDb

    try {
        const client = new MongoClient(mongoConfig.dbURL, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
            family: 4
        })
        await client.connect()
        const db = client.db(mongoConfig.dbName)
        return db.collection(mongoConfig.dbName)
    } catch (err) {
        throw err
    }
}



app.get('/api', async (req, res) => {
    const collection = await _connect()
    const items = await collection.find().toArray()
    res.send(items)
})


app.post('/api', async (req, res) => {
    const collection = await _connect()
    const addedInfo = await collection.insertOne(req.body)
    const savedConstraction = {
        _id: addedInfo.insertedId,
        ...req.body
    }
    res.send(savedConstraction)
})


app.delete('/api/removeById/:id', async (req, res) => {
    try {
        const collection = await _connect()
        const deletedInfo = await collection.deleteOne({ _id: new ObjectId(req.params.id) })
        if (deletedInfo.deletedCount > 0) res.send(req.params.id)
        else throw new Error(`Couldn't remove ${req.params.id} item from DB`)
    } catch (err) {
        res.status(400).send({ message: err })
    }
})

app.delete('/api', async (req, res) => {
    try {
        const collection = await _connect()
        const deletedInfo = await collection.deleteMany({})
        if (deletedInfo.deletedCount > 0) res.send([])
        else throw new Error(`Couldn't clear constractionDB while it's already empty`)
    } catch (err) {
        res.status(400).send({ message: err })
    }
})


const PORT = process.env.PORT || 3030
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

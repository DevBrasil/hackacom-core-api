const mongo = require('mongodb').MongoClient;
require('dotenv').config({ path: '.env.test' });


const { MONGO_URI, MONGO_DB } = process.env
const uri = `${MONGO_URI}/${MONGO_DB}?authSource=admin`

mongo.connect(uri, async (err, conn) => {
  if (err) throw err;
  
  const db = conn.db(MONGO_DB)

  await db.listCollections().forEach(async (collection) => {
    await db.collection(collection.name).drop()
    console.log('\x1b[31m', `[MONGODB] ${collection.name} collection has been dropped.`)
  });

  conn.close()
});
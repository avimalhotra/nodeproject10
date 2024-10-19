const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'node';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);

  const collection = db.collection('cars');

  // the following code examples can be pasted here...

  /* const insertResult = await collection.insertMany([
    { name:"swift", type:"hatchback" },
    { name:"grand vitara", type:"suv" }
    ]);
  console.log('Inserted documents =>', insertResult);  */


    const findResult = await collection.find({type:"suv"}).toArray();

    console.log(findResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
const MongoClient=require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
       return console.log('unable to conect');
    }
    console.log('connected to mongodb');
    // db.collection('Todos').insertOne({
    //     text:'lay my bed',
    //     completed:false
    // },(err,result)=>{
    //     if(err){
    //      return  console.log('unable to add document')
    //     }
    //     console.log(result.ops);
    // })
    db.collection('Todos').find({text:'fish'}).toArray().then((docs)=>{
        console.log(docs);
    
    },(err)=>{
        console.log(err);
    })
    db.close();
});
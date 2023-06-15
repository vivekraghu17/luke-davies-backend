const mongoose=require("mongoose");
const connect=mongoose.connect('mongodb+srv://admin:welcome123@luke-davies-db.j2fteoi.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
connect.then(db=>{
    console.info("✅ Connected to db");
})
.catch(err=>{
    console.error(err);
});


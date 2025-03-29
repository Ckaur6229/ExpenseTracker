const mongoose=require("mongoose");

const URL=process.env.MONGO_URL;

const ConnectDB=async()=>{
    try {
        // mongoose.set('strictQuery',false);
        await mongoose.connect(URL);
        console.log("DB is connected")
    } catch (error) {
        console.error("Error connecting DB:", error.message);
    }
}

module.exports={ConnectDB}
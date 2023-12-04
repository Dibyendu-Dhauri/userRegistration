const mongoose = require('mongoose');


const mongoDBConnection = async(url)=>{
    try {
        await mongoose.connect(url)
        console.log("MongoDB connecton successfull")
    } catch (error) {
        console.log("Error:",error)
    }


}

module.exports = {
    mongoDBConnection,
}
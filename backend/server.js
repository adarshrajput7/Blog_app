import app from "./src/app.js";
import dotenv from 'dotenv'
import connectDB from "./src/db/db.js";


dotenv.config()

const PORT = process.env.PORT || 3000


app.listen(PORT,"0.0.0.0", () => {
    connectDB()
    console.log("server Running on port no: ",PORT);
    
})
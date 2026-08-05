// datauri/parser.js - Yo package file ko data URI format mein convert karta hai
// Data URI format: data:image/png;base64,iVBORw0KGgoAAAANS...
// Isse file ko string mein convert karke Cloudinary ya database mein bhej sakte hain

import DataUriParser from 'datauri/parser.js'
import path from 'path' // File extension nikalne ke liye

// DataUriParser ka instance banaya
const parser = new DataUriParser()

// Function jo file ko data URI mein convert karega
const getDataUri = (file) => {
    // file.originalname = "profile.jpg" (jaisa user ne upload kiya)
    // path.extname() = ".jpg" (extension nikalta hai)
    // .toString() = ".jpg" ko string mein convert kiya
    const extName = path.extname(file.originalname).toString()
    
    // parser.format() = file ko data URI mein convert karta hai
    // Parameters: (extension, file ka raw data buffer)
    // file.buffer = file ka raw binary data (multer se aata hai)
    // Return: { content: "data:image/jpeg;base64,/9j/4AAQSkZJRg..." }
    return parser.format(extName, file.buffer).content
    //                                              ^^^^^^^^
    //                                              Sirf content return kiya (full object nahi)
}

export default getDataUri
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/million",{ useCreateIndex: true,
                                               useUnifiedTopology: true, 
                                               useNewUrlParser: true })
            .then(()=> console.log("DB connected"))
            .catch(err => console.log("Error!: " + err))
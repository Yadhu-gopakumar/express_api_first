const express = require('express')
const app = express()
// import router from './routes/productRoute'
const productrouter=require("./routes/productRoute")

app.use(express.json());


app.use("/products",productrouter);

// app.get('/products', (req, res) => {
//   res.send('hello world')
// })

app.listen(3000)


// await mongoose.connect("mongodb+srv://gopakumarcg57:sQI6XmKmVFltDXE9@cluster0.qvlcr3o.mongodb.net/?appName=Cluster0");
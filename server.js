import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import config from './config.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';

dotenv.config();

const app = express();


const mongodbUrl = process.env.MONGODB_URI || 'mongodb://localhost/dryfruit';
mongoose.connect(mongodbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).catch(error => console.log(error.reason));


mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});



app.use(bodyParser.json());
app.use("/api/users", userRoute);
//app.use("/api/products", productRoute);
app.get("/api/products/:id", (req,res) => {
	const productId = req.params.id;
	const product = data.products.find(x=>x._id === productId); 
	if (product)
		res.send(product);
	else 
		res.status(404).send({msg: "Product not found1234."})
});


app.get("/api/products", async (req,res) => {
	
	const category = req.query.category ? { category: req.query.category } : {};
	const type = Object.values(category);
	const filter = type[0];
	const products_filter = await data.products.filter( x => x.category === filter);
	if (type.length === 0)
		//res.send(data.products);
		res.send("n");
	else 
		res.send(products_filter);
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('frontend/build'));
}

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => { console.log(`Server started at http://localhost:${PORT}`) });
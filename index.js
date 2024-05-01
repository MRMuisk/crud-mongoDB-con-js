const express = require('express');
const mongoose = require('mongoose');
const app = express();
const product = require('./models/product.model.js');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.text())



app.get('/', (req, res) => {
  res.send('Hello World prueba 1')
});

app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

///en esta parte agregamos productos a la base de datos/////
app.post('/Node/test/products', async (req, res) => {
  try {
   await product.create(req.body);
    res.status(200).json({ message: req.body });
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
});

///en esta parte solicitamos productos a la base de datos/////
app.get('/Node/test/products', async (req, res) => {
  try {
    const products = await product.find();
    res.status(200).json(products);

  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
});

///en esta parte solicitamos productos a la base de datos por id/////
app.get('/Node/test/products/:id', async (req, res) => {
  try {
    const products = await product.findById(req.params.id);
    res.status(200).json(products);

  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
});

///en esta parte actualizamos productos a la base de datos/////
app.put('/Node/test/products/:id', async (req, res) => {
  try {
    const {id} = req.params;
   const products = await product.findByIdAndUpdate(id, req.body);

   if (!product) {
    return res.status(404).json({ message: 'Product not found' })
   }

   else {
    return res.status(200).json({ message: 'Product updated' })
   }


  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

///en esta parte eliminamos productos a la base de datos/////
app.delete('/Node/test/products/:id', async (req, res) => {
  try {
    const {id} = req.params;
   const products = await product.findByIdAndDelete(id);

   if (!product) {
    return res.status(404).json({ message: 'Product not found' })
   }

   else {
    return res.status(200).json({ message: 'Product deleted' })
   }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


mongoose.connect("mongodb+srv://fred:EFcCYKpz9pawsqFu@ok.jdzinhv.mongodb.net/?retryWrites=true&w=majority&appName=ok")
  .then(() => {
    console.log('Connected to MongoDB')
   app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message)
  })


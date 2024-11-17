// here in this file we will create the main express node js server file , some endpoints and  the main architecture of the mongodb schema and 

const port = 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");


app.use(cors());
app.use(express.json());

// Database Connection with mongodb
mongoose.connect("mongodb+srv://ghanilamia:ghanilamia2024@cluster0.zsfgw.mongodb.net/e-commerce");;

//API
app.get("/", (req, res) => {
    res.send("API is running");
})

// Imgage Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
})
const upload = multer({ storage: storage });
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://192.168.1.38:${port}/images/${req.file.filename}`
    })
})

// Schema fo Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

// Add Product
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) 
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1
    }
    else {
        id=1;
    }

    const product = new Product({
        id:id,
        category: req.body.category,
        name: req.body.name,
        image: req.body.image,
        new_price: req.body.new_price,
    })
    console.log(product);
    await product.save();
    console.log("Saved !");
    res.json({
    success: 1,
    name: req.body.name
    }) 
    })                                  

// Delete Product
app.post('/deletproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: 1,
        name: req.body.name
    })
})

// Get All Products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products");
    res.send(products);
})


app.get('/api/products/count', async (req, res) => {
    try {
        // Fetch the total count of products
        const totalProducts = await Product.countDocuments({});
        
        // Send the count as a JSON response
        res.json({ total: totalProducts });
    } catch (error) {
        // Handle errors by logging and responding with a 500 status code
        console.error("Error fetching product count:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/admin/products/count-by-category', async (req, res) => {
    try {
        const productsByCategory = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Formatting the response as an object with category names as keys
        const categoryCount = {};
        productsByCategory.forEach(product => {
            categoryCount[product._id] = product.count;
        });

        res.json(categoryCount);
    } catch (error) {
        console.error("Error fetching product count by category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// User Schema
const Users = mongoose.model("Users", {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

// Registration Endoint
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({success:false,errors:'User Already Found With The Same Email Address'})
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }
    const authToken = jwt.sign(data, 'secret_ecom');
    res.json({success:true,authToken:authToken})
})

// Login Endpoint
app.post('/signin', async (req, res) => {
    try {
        let user = await Users.findOne({ email: req.body.email });
        if (user) {
            const passCompare = req.body.password === user.password; // You might want to hash/compare passwords here for security
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id
                    }
                };
                const authToken = jwt.sign(data, 'secret_ecom');

                // Return the authToken AND the userId
                res.json({
                    success: true,
                    authToken: authToken,
                    userId: user.id // Returning userId here
                });
            } else {
                res.status(401).json({ success: false, errors: 'Wrong Password' });
            }
        } else {
            res.status(404).json({ success: false, errors: 'User Not Found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, errors: 'Server error', message: error.message });
    }
});


// Middleware to verify JWT token
const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user; // Set the user data from the token in the request object
        next(); // Call next middleware or route handler
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};


app.get('/user', fetchUser, (req, res) => {
    res.json({ success: true, message: 'Welcome to the user page', user: req.user });
});

app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
  
    // Here you can add logic to store the email, for example in a database
    // Or send the email to an email marketing service like Mailchimp
    
    // Simple response
    if (email) {
      res.status(200).json({ message: 'Successfully subscribed!' });
    } else {
      res.status(400).json({ message: 'Invalid email address.' });
    }
  });

app.listen(port, (error) => {
    if (!error) {
        console.log(`Backend server is running at ${port}`);
    }
    else 
    {
        console.log('Error', error);
    }
    
});
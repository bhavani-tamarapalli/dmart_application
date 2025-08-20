

import express from "express";
import cors from "cors";
import mysql from "mysql";
import multer from 'multer';
import winston from 'winston';
import bcrypt from 'bcrypt';


const app = express();
const port = 5000;


const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'combined.log', level: 'info' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});


app.use(cors());
app.use(express.json());

const fileStorageEngine = multer.memoryStorage();
const upload = multer({ storage: fileStorageEngine });

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "DMART"
});

con.connect((err) => {
  if (err) {
    logger.error("Error connecting to database:", err);
    return;
  }
  logger.info("Connected to MySQL database");
});

app.get('/', (req, res) => {
  res.send("Dmart website application");
});

app.get('/home', (req, res) => {
  res.send("Hello");
});


app.get("/products", (req, res) => {
  const sql = "select * from products";
  con.query(sql, (err, data) => {
    if (err) {
      logger.error("Error fetching products:", err);
      return res.status(500).json({ error: "Error" });
    }


    logger.info("Fetched all products");
    return res.json(data);
  });
})



app.get("/products/:product_id", (req, res) => {
  const product_id = req.params.product_id;
  const sql = "SELECT * FROM products WHERE product_id = ?";

  con.query(sql, [product_id], (err, data) => {
    if (err) {
      logger.error("Error fetching product:", err);
      return res.status(500).json({ error: "Failed to fetch product" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    logger.info(`Fetched product with ID: ${product_id}`);
    return res.json(data[0]);
  });
});


app.get("/productimage", (req, res) => {
  const sql = `select p.product_id,
  p.product_name,
       p.description,
       p.dmartprice,
       p.original_price,
       p.discount,
       p.variant,
       pi.image_name,
       pi.image_data
       from products p left join products_image pi on p.product_id=pi.product_id;`

  con.query(sql, (err, data) => {
    if (err) return res.json("error");
    let resdata = res.json(data)
    return resdata
  })
})



app.get("/productdetails/:id", (req, res) => {
  const { id } = req.params
  const sql = `select p.product_id,
  p.product_name,
       p.description,
       p.dmartprice,
       p.original_price,
       p.discount,
       p.variant,
       pi.image_name,
       pi.image_data
       from products p left join products_image pi on p.product_id where pi.product_id;`

  con.query(sql, [id], (err, data) => {
    if (err) return res.json("error");
    let resdata = res.json(data)
    return resdata
  })
})


app.put('/products/:product_id', upload.single('product_image'), (req, res) => {
  const product_id = req.params.product_id;
  const { product_name, description, dmartprice, original_price, discount, variant, SubCategories_id } = req.body;

  let product_image = req.file ? req.file.path : null;

  const sql = `UPDATE products SET product_name = ?, product_image = ?, description = ?, dmartprice = ?, original_price = ?, discount = ?, variant = ?, SubCategories_id = ? WHERE product_id = ?`;

  con.query(sql, [product_name, product_image, description, dmartprice, original_price, discount, variant, SubCategories_id, product_id], function (err, data) {
    if (err) {
      logger.error("Error updating product:", err);
      return res.status(500).json({ error: "Error updating product" });
    }

    logger.info("Product updated successfully");
    return res.json({
      message: "Product updated successfully",
    });
  });
});


app.delete('/products/:product_id', function (req, res) {
  const product_id = req.params.product_id;
  const sql = "DELETE FROM products WHERE product_id = ?";
  con.query(sql, [product_id], function (err, result) {
    if (err) {
      logger.error("Error deleting product:", err);
      return res.status(500).json({ error: "Failed to delete product" });
    }
    logger.info("Product deleted successfully");
    return res.json("Product deleted successfully");
  });
});


app.get("/categories", (req, res) => {
  const sql = "SELECT * FROM categories";
  con.query(sql, (err, data) => {
    if (err) {
      logger.error("Error fetching categories:", err);
      return res.status(500).json({ error: "Error fetching categories" });
    }
    logger.info("Fetched all categories");
    return res.json(data);
  });
});




app.get('/Subcategory/:category_name', (req, res) => {
  const category_name = req.params.category_name;
  const sql = 'SELECT category_id FROM categories WHERE category_name = ?';
  con.query(sql, [category_name], (err, data) => {
    if (err) {
      logger.error("error:", err);
      return res.status(500).json({ message: 'Error fetching category' });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const categoryId = data[0].category_id;

    const getSubcategoriesQuery = 'SELECT * FROM SubCategories WHERE category_id = ?';

    con.query(getSubcategoriesQuery, [categoryId], (err, subcategories) => {
      if (err) {
        logger.error("error:", err);
        return res.status(500).json({ message: 'Error fetching subcategories', error: err });
      }
      if (subcategories.length === 0) {
        return res.status(404).json({ message: 'No subcategories found for this category' });
      }
      res.status(200).json(subcategories);
    });
  });
});


app.post("/saveimagedata", upload.single('file'), (req, res) => {

  if (req.file) {
    const { originalname, buffer } = req.file;
    // console.log(originalname, buffer, "--------------")
    const { product_id } = req.headers;
    const query = "INSERT INTO products_image (image_name, image_data, product_id) VALUES (?, ?, ?)";

    con.query(query, [originalname, buffer, product_id], (err, result) => {
      if (err) {
        logger.error("Error saving file data to MySQL:", err);
        return res.status(500).send("Error saving file data to database");
      }
      res.send("File saved to database successfully");
    });
  } else {
    res.status(400).send("No file uploaded");
  }
});

app.get("/product/category/:category_name", (req, res) => {
  const category_name = req.params.category_name;

  const productSql = `
 SELECT p.product_id,
       p.product_name,
       p.description,
       p.dmartprice,
       p.original_price,
       p.discount,
       p.variant,
       pi.image_name,
       pi.image_data
FROM products p
INNER JOIN products_image pi ON p.product_id = pi.product_id
JOIN SubCategories sc ON p.SubCategories_id = sc.SubCategories_id
JOIN categories c ON sc.category_id = c.category_id
WHERE c.category_name = ?;  
  `;

  con.query(productSql, [category_name], (err, data) => {
    if (err) {
      logger.error(err);
      return res.status(500).send("Server Error");
    }
    if (data.length === 0) {
      return res.status(404).send("No products found for this category");
    }
    const image = data[0];
    const imagetype = image.image_name.split('.').pop().toLowerCase();
    let contentType = 'application/octet-stream';

    if (imagetype === 'jpg' || imagetype === 'jpeg') {
      contentType = 'image/jpeg';
    } else if (imagetype === 'webp') {
      contentType = 'image/webp';
    } else {
      return res.send('Unsupported file type');
    }

    const responseData = {
      products: data,
      image: {
        contentType: contentType,
        imageData: image.image_data.toString('base64'),
        imageName: image.image_name
      }
    };

    res.json(responseData);
  });
});

app.get("/product/id/:product_id", (req, res) => {
  const product_id = req.params.product_id;

  const productSql = `
    SELECT 
      p.product_id,
      p.product_name,
      p.description,
      p.dmartprice,
      p.original_price,
      p.discount,
      p.variant,
      pi.image_name,
      pi.image_data,
      c.category_name,
      sc.subcategory_name
    FROM 
      products p
    LEFT JOIN 
      products_image pi ON p.product_id = pi.product_id
    LEFT JOIN 
      SubCategories sc ON p.SubCategories_id = sc.SubCategories_id
    LEFT JOIN 
      categories c ON sc.category_id = c.category_id
    WHERE 
      p.product_id = ?;
  `;

  con.query(productSql, [product_id], (err, data) => {
    if (err) {
      console.error("Error fetching product details:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = data[0];

    const imagetype = product.image_name.split('.').pop().toLowerCase();
    // console.log(imagetype,"product image");
    let contentType = 'application/octet-stream';

    if (imagetype === 'jpg' || imagetype === 'jpeg') {
      contentType = 'image/jpeg';
    } else if (imagetype === 'webp') {
      contentType = 'image/webp';
    } else {
      return res.send('Unsupported image type');
    }

    const responseData = {
      product_id: product.product_id,
      product_name: product.product_name,
      description: product.description,
      dmartprice: parseFloat(product.dmartprice),
      original_price: parseFloat(product.original_price),
      discount: parseFloat(product.discount),
      variant: product.variant,
      category: product.category_name,
      sub_category: product.subcategory_name,
      image: {
        contentType,
        imageData: product.image_data,//`data:image/jpeg;base64,${product.image_data.toString("base64")}`
        imageName: product.image_name
      }
    };

    res.status(200).json(responseData);
  });
});


app.get("/product/category/:category_name/:product_id", (req, res) => {
  const category_name = req.params.category_name;
  const product_id = req.params.product_id;
  console.log(product_id, category_name);
  const productSql = `
 SELECT p.product_id,
       p.product_name,
       p.description,
       p.dmartprice,
       p.original_price,
       p.discount,
       p.variant,
       pi.image_name,
       pi.image_data
FROM products p
INNER JOIN products_image pi ON p.product_id = pi.product_id
JOIN SubCategories sc ON p.SubCategories_id = sc.SubCategories_id
JOIN categories c ON sc.category_id = c.category_id
WHERE c.category_name = ? AND p.product_id=?;  
  `;

  con.query(productSql, [category_name, product_id], (err, data) => {
    if (err) {
      logger.error(err);
      return res.status(500).send("Server Error");
    }
    if (data.length === 0) {
      return res.status(404).send("No products found for this category");
    }
    console.log(data, "ppp")
    const image = data[0];
    const imagetype = image.image_name.split('.').pop().toLowerCase();
    let contentType = 'application/octet-stream';

    if (imagetype === 'jpg' || imagetype === 'jpeg') {
      contentType = 'image/jpeg';
    } else if (imagetype === 'webp') {
      contentType = 'image/webp';
    } else {
      return res.send('Unsupported file type');
    }

    const responseData = {
      products: data,
      image: {
        contentType: contentType,
        imageData: image.image_data.toString('base64'),
        imageName: image.image_name
      }
    };

    res.json(responseData);
  });
});

app.get("/products/subcategory/:subcategory_id", (req, res) => {
  const subcategory_id = req.params.subcategory_id;
  const sql = "SELECT * FROM products WHERE SubCategories_id = ?";
  con.query(sql, [subcategory_id], (err, data) => {
    if (err) {
      logger.error("Error fetching products by subcategory:", err);
      return res.status(500).json({ error: "Error fetching products" });
    }
    logger.info(`Fetched products for subcategory ${subcategory_id}`);
    return res.json(formattedData);
  });
});

app.get("/customer", (req, res) => {
  const sql = "SELECT * FROM customer";
  con.query(sql, (err, data) => {
    if (err) {
      logger.error("Error fetching customer:", err);
      return res.status(500).json({ error: "Error fetching customer" });
    }
    logger.info("Fetched all customer");
    return res.json(data);
  });
});


app.get("/customer/email", async (req, res) => {

  const email = req.headers['email'];

  if (!email) {
    return res.status(400).send("Email required");
  }

  const sql = 'SELECT * FROM customer WHERE email = ?';

  con.query(sql, [email], (err, result) => {
    if (err) {
      console.log(sql, "error");
      return res.status(500).send("error ");
    } else {
      res.status(200).json(result);
    }
  });
});


app.post("/register", async (req, res) => {
  const { customer_name, email, password_hash } = req.body;

  if (!customer_name || !email || !password_hash) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {

    const hashpassword = await bcrypt.hash(password_hash, 10);


    const sql = 'INSERT INTO customer(customer_name, email, password_hash) VALUES (?, ?, ?)';

    con.query(sql, [customer_name, email, hashpassword], (err, result) => {
      if (err) {
        console.error("Error inserting user into database:", err);
        return res.status(500).json({ error: 'Error inserting user: ' + err.message });
      }

      const userId = result.insertId;
      const cartSql = 'INSERT INTO cart (customer_id) VALUES (?)';


      con.query(cartSql, [userId], (err) => {
        if (err) {
          console.error("Error creating cart for user:", err);
          return res.status(500).json({ error: 'Error creating cart: ' + err.message });
        }

        console.log("User and cart created successfully");
        res.status(201).json({ message: 'User registered successfully', userId });
      });
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});


app.post("/login", (req, res) => {
  const { email, password_hash } = req.body;
  if (!email || !password_hash) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  const sql = 'SELECT * FROM customer WHERE email = ?';
  con.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) return res.status(401).json({ error: "User not found" });

    const customer = results[0];


    const isMatch = await bcrypt.compare(password_hash, customer.password_hash);

    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });


    const cartSql = "SELECT * FROM cart WHERE customer_id = ?";
    con.query(cartSql, [customer.customer_id], (err, cartResults) => {
      if (err) return res.status(500).json({ error: err });

      if (cartResults.length === 0) {
        return res.status(404).json({ error: "Cart not found" });
      }

      const cart = cartResults[0];
      const cartId = cart.cart_id;


      // console.log(cartId, "ppppppp")

      res.json({ message: "Login successful", customerId: customer.customer_id, cartId: cartId });
    });
  });
});


app.post('/cart/add', (req, res) => {
  const { product_id, cart_id, quantity } = req.body;

  if (!product_id || !cart_id || typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  // Get the product price from the products table
  const getPriceQuery = `SELECT dmartprice FROM products WHERE product_id = ?`;

  con.query(getPriceQuery, [product_id], (err, priceResult) => {
    if (err) {
      console.error('Error fetching product price:', err);
      return res.status(500).json({ error: 'Error fetching product price' });
    }

    if (priceResult.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const unitPrice = priceResult[0].dmartprice;
    const totalPrice = unitPrice * quantity;

    // Check if product already exists in the cart
    const checkQuery = `
      SELECT * FROM cart_items
      WHERE product_id = ? AND cart_id = ?
    `;

    con.query(checkQuery, [product_id, cart_id], (err, cartResult) => {
      if (err) {
        console.error('Error checking cart:', err);
        return res.status(500).json({ error: 'Error checking cart' });
      }

      if (cartResult.length > 0) {
        // Product exists – update quantity and total_price
        const newQuantity = cartResult[0].quantity + quantity;
        const newTotalPrice = unitPrice * newQuantity;

        const updateQuery = `
          UPDATE cart_items
          SET quantity = ?, total_price = ?
          WHERE product_id = ? AND cart_id = ?
        `;

        con.query(updateQuery, [newQuantity, newTotalPrice, product_id, cart_id], (err) => {
          if (err) {
            console.error('Error updating cart:', err);
            return res.status(500).json({ error: 'Error updating cart' });
          }
          return res.status(200).json({ message: 'Cart updated successfully (quantity increased)' });
        });
      } else {
        // Product not in cart – insert new item
        const insertQuery = `
          INSERT INTO cart_items (cart_id, product_id, quantity, total_price)
          VALUES (?, ?, ?, ?)
        `;

        con.query(insertQuery, [cart_id, product_id, quantity, totalPrice], (err, data) => {
          if (err) {
            console.error('Error adding to cart:', err);
            return res.status(500).json({ error: 'Error adding product to cart' });
          }
          console.log(data, "dataaaa posted")
          return res.status(201).json({ message: 'Product added to cart' });
        });
      }
    });
  });
});


app.get("/cart/:customer_id", (req, res) => {
  const customer_id = req.params.customer_id;

  const sql = `
    SELECT
      ci.cart_items_id,
      ci.product_id,
      ci.quantity,
      p.product_name,
      p.dmartprice AS product_price,
      (ci.quantity * p.dmartprice) AS total_price
    FROM cart_items ci
    INNER JOIN cart c ON ci.cart_id = c.cart_id
    INNER JOIN products p ON ci.product_id = p.product_id
    WHERE c.customer_id = ?
  `;

  con.query(sql, [customer_id], (err, results) => {
    if (err) {
      console.error("Error while querying cart items:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!results || results.length === 0) {
      return res.status(200).json({ cart_items: [], grandTotal: 0 });
    }

    // Make sure total_price is always a number
    const grandTotal = results.reduce((sum, item) => {
      const price = parseFloat(item.total_price);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);

    res.status(200).json({ cart_items: results, grandTotal });
  });
});


app.put('/cart/update', async (req, res) => {
  let { product_id, quantity } = req.body;

  console.log(product_id, "productid");
  console.log(quantity, "quantity")

  quantity = Number(quantity);

  if (!product_id || isNaN(quantity) || quantity < 0) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const getProductQuery = `
      SELECT p.dmartprice
      FROM products p
      WHERE p.product_id = ?
    `;

    con.query(getProductQuery, [product_id], (err, result) => {
      if (err) {
        console.error('Error fetching product price:', err);
        return res.status(500).json({ error: 'Error fetching product price' });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const unitPrice = result[0].dmartprice; // ✅ fix: use 'dmartprice', not 'price'

      if (quantity === 0) {
        const deleteQuery = 'DELETE FROM cart_items WHERE product_id = ?';
        con.query(deleteQuery, [product_id], (err) => {
          if (err) {
            console.error('Error removing product from cart:', err);
            return res.status(500).json({ error: 'Error removing product from cart' });
          }
          return res.status(200).json({ message: 'Product removed from cart' });
        });
      } else {
        const newTotalPrice = unitPrice * quantity;
        const updateQuery = 'UPDATE cart_items SET quantity = ?, total_price = ? WHERE product_id = ?';

        con.query(updateQuery, [quantity, newTotalPrice, product_id], (err) => {
          if (err) {
            console.error('Error updating cart:', err);
            return res.status(500).json({ error: 'Error updating cart' });
          }
          return res.status(200).json({ message: 'Cart updated successfully' });
        });
      }
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/cart/remove', (req, res) => {
  const { product_id } = req.body;

  if (!product_id) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  // Check if the product exists in the cart
  const checkProductQuery = `
    SELECT * FROM cart_items
    WHERE product_id = ? 
  `;

  con.query(checkProductQuery, [product_id], (err, result) => {
    if (err) {
      console.error('Error checking product in cart:', err);
      return res.status(500).json({ error: 'Error checking product in cart' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    const deleteQuery = `
      DELETE FROM cart_items
      WHERE product_id = ? 
    `;

    con.query(deleteQuery, [product_id], (err) => {
      if (err) {
        console.error('Error removing product from cart:', err);
        return res.status(500).json({ error: 'Error removing product from cart' });
      }

      return res.status(200).json({ message: 'Product removed from cart successfully' });
    });
  });
});

 
app.get('/search', (req, res) => {
  const { product_name } = req.query;

  if (!product_name) {
    return res.status(400).json({
      message: "Please provide a productname to search."
    });
  }

  let sql = `
    SELECT p.*, pi.*
    FROM products p
    LEFT JOIN products_image pi ON p.product_id = pi.product_id
    WHERE p.product_name LIKE ?
  `;
 
  let queryParams = [`%${product_name}%`];

  con.query(sql, queryParams, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Server is having issues, please try again later." });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "No items found for the searched product." });
    }

    return res.status(200).json({
      products: data,
    });
  });
});


app.listen(port, () => {
  logger.info("Server started and running successfully");
  logger.info(`Server is running on http://localhost:${port}`);
});
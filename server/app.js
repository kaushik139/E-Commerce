const express = require("express");
const client = require("./connection");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
// const path = require("path");

//! Use of Multer
var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./images/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});

// here
const app = express();
const corsOptions = {
  origin: "*",
};
client.connect((err) => {
  if (!err) {
    console.log("Connected to Database");
  }
});

app.use(cors(corsOptions));
app.use(bodyParser.json());

// here

//route for post data
app.post("/imageUpload", upload.single("image"), (req, res) => {
  if (!req.file) {
    console.log("No file upload");
  } else {
    client.query(`INSERT INTO products `);
    // console.log(req.file.filename)
    // var imgsrc = 'http://127.0.0.1:3000/images/' + req.file.filename
    // var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
    // db.query(insertData, [imgsrc], (err, result) => {
    //     if (err) throw err
    //     console.log("file uploaded")
    // })
  }
});

// here

// inserting values in database (signUp)
app.post("/users", (req, res) => {
  const userData = req.body;
  client.query(
    `INSERT INTO users (name,email,password,role) VALUES('${userData.name}','${userData.email}','${userData.password}','${userData.userType}')`,
    (err, result) => {
      if (!err) {
        // res.send(result.rows);
        res.send(`Sign Up successfull`);
      } else {
        // res.send(err.message);
        // console.log(err.message);
        res.send("E-mail already Exists.");
      }
    }
  );
  client.end;
});

//LogIn
app.post("/verification", (req, res) => {
  const userInput = req.body;
  client.query(
    `SELECT password FROM users where email = '${userInput.email}'`,
    (err, result) => {
      if (!err) {
        if (result.rows[0] && userInput.password === result.rows[0].password) {
          res.send("valid user");
        } else {
          res.send("invalid credientials");
        }
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

//getting login info
app.get("/info/:mail", (req, res) => {
  const mail = req.params.mail;
  client.query(
    `SELECT id,name,role FROM users WHERE email='${mail}'`,
    (err, result) => {
      if (!err) {
        console.log(result);
        // console.log(result.rows);
        console.log(result.rows[0]);
        res.send(result.rows[0]);
      }
    }
  );
  client.end;
});

//fetching all products
app.get("/allProducts", (req, res) => {
  client.query(`SELECT * FROM products`, (err, result) => {
    if (!err) {
      res.send(result.rows);
      // console.log(result.rows);
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

//update product by admin
app.put("/updateProduct/:id", (req, res) => {
  const Pid = req.params.id;
  const info = req.body;
  client.query(
    `update products set pname = '${info.name}', pquantity = '${info.quantity}', price = '${info.price}', description = '${info.description}', image = '${info.image}',category = '${info.category}'  WHERE product_id = '${Pid}'`,
    (err, result) => {
      if (!err) {
        res.send(`Updated Successfully`);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

// deleting product by admin
app.delete("/deleteProductAdmin/:id", (req, res) => {
  const Pid = req.params.id;
  // console.log(Pid)
  client.query(
    `Delete from products where product_id = ${Pid}`,
    (err, result) => {
      if (!err) {
        res.send(`Deleted successfully`);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

//check cart for products
app.get("/checkCartForProduct/", (req, res) => {
  // const info = req.params.id;
  const info = req.query;
  console.log(info);
  client.query(
    `select COUNT(cquantity) from cart where uid = '${info.uid}' and pid = '${info.pid}';`,
    (err, result) => {
      if (!err) {
        console.log(result.rows[0]);
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

//adding new Product to cart
app.post("/addToCartNew", (req, res) => {
  const userData = req.body;
  client.query(
    ` INSERT INTO cart (uid,pid,cquantity,status) VALUES('${userData.uid}','${userData.pid}','1','inCart')`,
    (err, result) => {
      if (!err) {
        // console.log(result);
        res.send(`Added to Cart!`);
      } else {
        res.send(`Failed to add to cart!`);
        console.log(err.message);
      }
    }
  );
  client.end;
});

//adding existing Product to cart
app.post("/addToCartExisting", (req, res) => {
  const userData = req.body;
  client.query(
    ` update cart set cquantity = cquantity + 1 where uid = '${userData.uid}' and pid ='${userData.pid}'`,
    (err, result) => {
      if (!err) {
        // console.log(result);
        res.send(`Added to Cart!`);
      } else {
        res.send(`Failed to add to cart!`);
        console.log(err.message);
      }
    }
  );
  client.end;
});

//Decrementing Cart Product
app.put("/decrementCartQuantity/:id", (req, res) => {
  const uid = req.params.id;
  // console.log(id);
  // console.log(uid);
  client.query(
    ` update cart set cquantity = cquantity - 1 where cart_id = '${uid}'`,
    (err, result) => {
      if (!err) {
        // console.log(result);
        res.send(`Added to Cart!`);
      } else {
        res.send(`Failed to add to cart!`);
        // console.log(err.message);
      }
    }
  );
  client.end;
});

//Decrementing Product Quantity
app.put("/decrementProductQuantity/:id", (req, res) => {
  const uid = req.params.id;
  // console.log(id);
  // console.log(uid);
  client.query(
    ` update products set pquantity = pquantity - 1 where product_id = '${uid}'`,
    (err, result) => {
      if (!err) {
        // console.log(result);
        // res.send(`Added to Cart!`);
      } else {
        // res.send(`Failed to add to cart!`);
        // console.log(err.message);
      }
    }
  );
  client.end;
});

//Incrementing Cart Product
app.put("/incrementCartQuantity/:id", (req, res) => {
  const uid = req.params.id;
  // console.log(id);
  // console.log(uid);
  client.query(
    ` update cart set cquantity = cquantity + 1 where cart_id = '${uid}'`,
    (err, result) => {
      if (!err) {
        // console.log(result);
        res.send(`Added to Cart!`);
      } else {
        res.send(`Failed to add to cart!`);
        // console.log(err.message);
      }
    }
  );
  client.end;
});

//Incrementing Product Quantity
app.put("/incrementProductQuantity/:id", (req, res) => {
  const uid = req.params.id;
  // console.log(id);
  // console.log(uid);
  client.query(
    ` update products set pquantity = pquantity + 1 where product_id = '${uid}'`,
    (err, result) => {
      if (!err) {
        // console.log(result);
        res.send(`Added to Cart!`);
      } else {
        res.send(`Failed to add to cart!`);
        // console.log(err.message);
      }
    }
  );
  client.end;
});

//fetching product Id
app.get("/fetchProductId/:id", (req, res) => {
  const uid = req.params.id;
  // console.log("1", uid);
  client.query(
    `SELECT product_id FROM cart JOIN products ON cart.pid = products.product_id WHERE cart_id=${uid}`,
    (err, result) => {
      if (!err) {
        // console.log(result.rows[0]);
        // console.log(result.rows);
        res.send(result.rows);
      } else {
        // console.log(err.message);
      }
    }
  );
  client.end;
});

//add product by admin
app.post("/addProduct", (req, res) => {
  const Productdata = req.body;
  console.log(Productdata);
  client.query(
    `INSERT INTO products (pname,pquantity,price,description,image,category) VALUES('${Productdata.name}','${Productdata.quantity}',
    '${Productdata.price}','${Productdata.description}','${Productdata.image}',
    '${Productdata.category}')`,
    (err, result) => {
      if (!err) {
        res.send("Product Added Successfully");
      } else {
        res.send("Failed to add product: Product already Exists");
        console.log(err.message);
      }
    }
  );
  client.end;
});

//cartPage
app.get("/cartPage/:id", (req, res) => {
  const uid = req.params.id;
  // console.log("1", uid);
  client.query(
    `SELECT * FROM cart JOIN products ON cart.pid = products.product_id WHERE uid=${uid}`,
    (err, result) => {
      if (!err) {
        // console.log(result.rows);
        res.send(
          result.rows.sort(function (a, b) {
          const nameA = a.pname.toUpperCase()
          const nameB = b.pname.toUpperCase()

          if(nameA > nameB){
            return -1;
        }
          if (nameA < nameB) {
            return 1;
        }
        return 0;
          

        })
        );
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

// deleting product from cart by user
app.delete("/deleteProductCart", (req, res) => {
  const info = req.query;
  console.log(req.query);
  client.query(
    `Delete from cart where uid = ${info.uid} and pid = ${info.pid}`,
    (err, result) => {
      if (!err) {
        res.send(`Deleted successfully`);
      } else {
        res.send(`Error!`);
        console.log(err.message);
      }
    }
  );
  client.end;
});

//fetching product details for detailPage
app.get("/productDetails/:id", (req, res) => {
  const uid = req.params.id;
  client.query(
    `SELECT * FROM products WHERE product_id = ${uid}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
        // console.log(result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

//fetching product details for salesPage
app.get("/adminSales", (req, res) => {
  const uid = req.params.id;
  client.query(
    ` select * from users join cart on users.id = cart.uid join products on products.product_id = cart.pid where role = 'user'`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
        // console.log(result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

//update user address
app.put("/updateAddress/:id", (req, res) => {
  const uid = req.params.id;
  const info = req.body;
  console.log(uid);
  client.query(
    `update users set pin = '${info.pin}', address = 
  '${info.address}' where id = '${uid}'; `,
    (err, result) => {
      if (!err) {
        res.send(`Updated`);
        // console.log(result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});

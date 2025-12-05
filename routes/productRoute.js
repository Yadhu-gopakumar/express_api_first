const express = require("express")
const router = express.Router();
const productList = require("../products.js");



router.get("/", (req, res) => {
  try {
    res.status(200).json({ data: productList })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})
//   get product by id

router.post("/add", (req, res) => {
  try {
    const { name, price, img } = req.body;

    let id = productList.length + 1;

    const newProduct = {
      id,
      name,
      price,
      img
    };

    productList.push(newProduct); // ✅ Correct

    res.status(200).json({
      message: "Product added successfully",
      data: newProduct
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/:id", (req, res) => {
  try {
    const pId = parseInt(req.params.id);

    const data = productList.find((p) => p.id === pId);

    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//   update product by id
router.patch("/:id", (req, res) => {
  try {
    const pId = parseInt(req.params.id);

    const data = productList.find((p) => p.id === pId);
    console.log(data)
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { name, price, img } = req.body;
    console.log(name)
    console.log(img)
    console.log(price)

    // Update only the fields that are sent
    if (name !== undefined) data.name = name;
    if (price !== undefined) data.price = price;
    if (img !== undefined) data.img = img;

    res.status(200).json({ message: "Product updated", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//   delete product by id
router.delete("/:id", (req, res) => {
  try {
    const pId = parseInt(req.params.id);

    const product = productList.find((p) => p.id === pId);
    console.log(product)
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Remove using filter
    const updatedList = productList.filter(p => p.id !== pId);

    res.status(200).json({
      message: "Product deleted",
      deleted: product,
      updatedList
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
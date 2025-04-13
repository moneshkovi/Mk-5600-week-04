
const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  }
  
  /**
   * List all products
   * @param {object} req
   * @param {object} res
   */
  async function listProducts(req, res) {
  
    const { offset = 0, limit = 25, tag } = req.query
    
    try {

      res.json(await Products.list({
        offset: Number(offset),
        limit: Number(limit),  
        tag,
      }))
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  async function getProduct (req, res, next) {
  
  
    const { id } = req.params
  
    try {
      const product = await Products.get(id)
      if (!product) {
        // next() is a callback that will pass the request to the next available route in the stack
        return next()
      }
      return res.json(product)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  async function createProduct (req, res) {
    console.log('request body:', req.body)
    res.json(req.body)
  }

  //Register deleteProduct method
  async function deleteProduct(req, res) {
    await Products.deleteProduct(req, res);
}

//Register updateProduct method
async function updateProduct(req, res) {
  await Products.updateProduct(req, res);
}
  module.exports = autoCatch({
    handleRoot,
    listProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
  });
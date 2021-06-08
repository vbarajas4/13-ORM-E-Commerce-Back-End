const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  //example set up from activity mini project, refactor to my model, ?DO I NOT DO a include model and attribute for findALL
  router.get('/', async (req, res) => {
    try {
      const categoryData = await Category.findAll({
       
       include: [{model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']}]
      });
      
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//});

//router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  router.get('/:id', async (req, res) => {
    try {
      const categoryData = await Category.findByPk(JSON.parse(req.params.id), {
      
       include: [{ model: Product}]
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//});

//router.post('/', (req, res) => {
  // create a new category

  router.post('/', async (req, res) => {
    try {
      const categoryData = await Category.create(req.body);
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
//});

//
  // update a category by its `id` value
   router.put('/:id', async (req, res) => {
      try {
      const categoryData = await Category.update(req.body, {where: {id: req.params.id}});
      
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//router.delete('/:id', (req, res) => {
  // delete a category by its `id` value

  router.delete('/:id', async (req, res) => {
    try {
      const categoryData = await Category.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//});

module.exports = router;

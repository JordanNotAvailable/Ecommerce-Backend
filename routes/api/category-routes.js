const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find one category by its `id` value
// be sure to include its associated Products

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'product_category' }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    // retrieve the category from the database by its ID
    const category = await Category.findByPk(categoryId);

    // check if the category exists
    if (!category) {
      res.status(404).json({ message: 'No category with this ID exists!' });
      return;
    }

    // update the category with the new data from the request body
    category.name = req.body.name;
    category.description = req.body.description;
    category.image = req.body.image;

    // save the updated category to the database
    await category.save();

    // send a success response to the client
    res.status(200).json(category);
  } catch (err) {
    // handle any errors that occurred during the update process
    console.error(err);
    res.status(500).send('Error updating category');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
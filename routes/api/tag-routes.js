const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
 // find all tags
// be sure to include its associated Product data

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // JOIN with locations, using the Trip through table
      // include: [{ model: Product, through: Tag, as: 'Products_Tagged' }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    // retrieve the category from the database by its ID
    const tag = await Tag.findByPk(tagId);

    // check if the category exists
    if (!tag) {
      res.status(404).json({ message: 'No tag with this ID exists!' });
      return;
    }

    // update the category with the new data from the request body
    tag.name = req.body.name;
    tag.description = req.body.description;
    tag.image = req.body.image;

    // save the updated category to the database
    await tag.save();

    // send a success response to the client
    res.status(200).json(tag);
  } catch (err) {
    // handle any errors that occurred during the update process
    console.error(err);
    res.status(500).send('Error updating tag');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
const Item = require('../models/Item');

class ItemController {
  static async getItems(req, res) {
    const items = await Item.getAll();
    res.send(items);
  }

  static async createItem(req, res) {
    const { name, price } = req.body;
    const item = await Item.create({ name, price });
    res.send(item);
  }

  static async updateItem(req, res) {
    const { id } = req.params;
    const { price } = req.body;
    await Item.update(id, price);
    res.send({ message: 'Item updated successfully' });
  }
}

module.exports = ItemController;

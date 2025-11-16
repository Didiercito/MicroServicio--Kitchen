const KitchenResponsibleModel = require('../models/KitchenResponsibleModel');
const Responsible = require('../../../domain/entities/KitchenResponsible');

class SequelizeKitchenResponsibleRepository {
  _toDomain(model) {
    if (!model) return null;
    return new Responsible(model.toJSON());
  }

  async create(data) {
    const responsible = await KitchenResponsibleModel.create(data);
    return this._toDomain(responsible);
  }

  async findByKitchenId(id) {
    const responsible = await KitchenResponsibleModel.findOne({
      where: { kitchen_id: id }
    });
    return this._toDomain(responsible);
  }
}

module.exports = SequelizeKitchenResponsibleRepository;

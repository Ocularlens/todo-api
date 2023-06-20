class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    const results = await this.model.findAll();
    return results;
  }

  async insertOne(data) {
    const newData = await this.model.create({ ...data });
    return newData;
  }

  async updateById(id, data) {
    const todo = await this.model.findOne({
      where: { id },
    });

    if (!todo) {
      return false;
    }

    await todo.update({ ...data });

    return todo;
  }

  async findById(id) {
    const todo = await this.model.findOne({
      where: { id },
    });

    if (!todo) {
      return false;
    }

    return todo;
  }

  async deleteById(id) {
    const todo = await this.model.findOne({
      where: { id },
    });

    if (!todo) {
      return false;
    }

    await todo.destroy()

    return true;
  }
}

module.exports = BaseRepository;

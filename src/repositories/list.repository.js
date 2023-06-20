const BaseRepository = require("./base/base.repository");

class ListRepository extends BaseRepository {
  constructor({ ListModel }) {
    super(ListModel);
  }
}

module.exports = ListRepository;

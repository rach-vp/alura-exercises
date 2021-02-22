export default class PictureService {
  constructor(resource) {
    this._resource = resource("v1/fotos{/id}");
  }

  create() {
    return this._resource
      .query()
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        throw new Error("Error getting pictures list");
      });
  }

  delete(id) {
    return this._resource.delete({ id }).catch(err => {
      console.log(err);
      throw new Error("Error deleting picture");
    });
  }

  register(picture) {
    return picture._id
      ? this._resource.update({ id: picture._id }, picture).catch(err => {
          console.log(err);
          throw new Error("Error updating picture");
        })
      : this._resource.save(picture).catch(err => {
          console.log(err);
          throw new Error("Error saving new picture");
        });
  }

  search(id) {
    return this._resource.get({ id }).then(res => res.json());
  }
}

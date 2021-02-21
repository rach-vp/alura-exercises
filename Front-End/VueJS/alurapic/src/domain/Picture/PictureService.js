export default class PictureService {
  constructor(resource) {
    this._resource = resource("v1/fotos{/id}");
  }

  create() {
    return this._resource.query().then(res => res.json());
  }

  delete(id) {
    return this._resource.delete({ id });
  }

  register(picture) {
    return this._resource.save(picture);
  }
}

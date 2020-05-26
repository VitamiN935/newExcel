export class ActiveRoute {
  static get path() {
    return document.location.hash.slice(1);
  }

  static get params() {
    return this.path.split(':')[1];
  }
}

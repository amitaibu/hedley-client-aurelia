export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css')
    .plugin('aurelia-leaflet');

  aurelia.start().then(a => a.setRoot('app', document.body));
}

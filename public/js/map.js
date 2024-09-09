function moveMapToBerlin(map) {
  map.setCenter({ lat: locationCoordinatesLat, lng: locationCoordinatesLng });
  map.setZoom(11);
}

window.apiKey = mapToken; //In Public file cannot access directly

var platform = new H.service.Platform({
  apikey: window.apiKey,
});

var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(
  document.getElementById("map"),
  defaultLayers.vector.normal.map,
  {
    center: { lat: locationCoordinatesLat, lng: locationCoordinatesLng },
    zoom: 11,
    pixelRatio: window.devicePixelRatio || 1,
  }
);

var svgMarkup =
  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="64" height="64" viewBox="0 0 256 256" xml:space="preserve"><defs></defs><g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" ><path d="M 45 90 C 30.086 71.757 15.174 46.299 15.174 29.826 S 28.527 0 45 0 s 29.826 13.353 29.826 29.826 S 59.914 71.757 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(220,32,40); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /><circle cx="45" cy="29.380000000000003" r="13.5" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/><path d="M 48.596 5.375 C 33.355 5.375 21 17.73 21 32.97 c 0 1.584 0.141 3.135 0.397 4.646 C 20.496 35.035 20 32.264 20 29.375 c 0 -13.807 11.193 -25 25 -25 c 2.889 0 5.661 0.496 8.242 1.397 C 51.731 5.516 50.18 5.375 48.596 5.375 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(231,77,70); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /></g></svg>'; // var svgMarkup ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><path style="fill:#539dd6" d="M66.441 4.883c-25.941 0-46.971 21.03-46.971 46.971C19.47 95.71 64 126.498 64 126.498s46.971-32.875 46.971-78.306c0-25.941-18.588-43.309-44.53-43.309zM65.221 85.5c-20.604 0-37.307-16.703-37.307-37.308 0-20.603 16.703-37.307 37.307-37.307 20.604 0 37.306 16.704 37.306 37.307 0 20.605-16.703 37.308-37.306 37.308z"/><path style="fill:#4692c1" d="M64 126.498s46.971-32.875 46.971-78.306c0-25.941-19.485-44.454-46.971-43.247v7.161c20.604 0 36.086 15.483 36.086 36.087 0 20.604-15.482 36.087-36.086 36.087v42.218z"/><circle style="fill:#ba8a8c" cx="64" cy="48.193" r="36.006"/><path style="fill:#1e1e1e" d="m63.983 128-.706-.517c-.474-.348-47.469-35.325-47.469-79.29C15.808 21.619 37.427 0 64 0s48.192 21.619 48.192 48.192c0 45.54-47.016 78.973-47.492 79.306l-.717.502zM64 2.441c-25.226 0-45.751 20.524-45.751 45.751 0 39.797 39.927 72.252 45.766 76.782 5.874-4.371 45.735-35.576 45.735-76.782C109.751 22.965 89.226 2.441 64 2.441zm0 82.98c-20.527 0-37.227-16.7-37.227-37.229 0-20.527 16.7-37.227 37.227-37.227s37.227 16.7 37.227 37.227c0 20.528-16.7 37.229-37.227 37.229zm0-72.015c-19.181 0-34.786 15.605-34.786 34.786C29.214 67.374 44.819 82.98 64 82.98s34.786-15.606 34.786-34.788c0-19.181-15.605-34.786-34.786-34.786z"/><g><path style="fill:#ffc176" d="M89.412 48.6h-7.016v19.145H72.99V55.481H57.451v12.265H48.04V48.6h-7.016c-.883 0-1.091-.504-.457-1.128l23.5-23.017a1.66 1.66 0 0 1 2.302 0l23.506 23.017c.634.624.426 1.128-.463 1.128z"/><path style="fill:#1e1e1e" d="M90.728 46.6 67.222 23.58a2.89 2.89 0 0 0-4.01.002L39.71 46.602c-.956.94-.747 1.803-.614 2.13s.59 1.088 1.927 1.088h5.795v19.146h11.853V56.701h13.097v12.265h11.848V49.82h5.795c1.341 0 1.797-.762 1.932-1.089.135-.327.344-1.19-.615-2.131zM74.21 66.525V54.26H56.231v12.265H49.26v-17.41l15.96-15.516 15.955 15.516v17.41H74.21zm8.682-19.146L65.221 30.194 47.546 47.378l-5.134-.004L64.92 25.329a.44.44 0 0 1 .597-.002l22.51 22.052h-5.135z"/></g></svg>';

var icon = new H.map.Icon(svgMarkup),
  coords = { lat: locationCoordinatesLat, lng: locationCoordinatesLng },
  marker = new H.map.Marker(coords, { icon: icon });

map.addObject(marker);
map.setCenter(coords);

window.addEventListener("resize", () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

window.onload = function () {
  moveMapToBerlin(map);
};

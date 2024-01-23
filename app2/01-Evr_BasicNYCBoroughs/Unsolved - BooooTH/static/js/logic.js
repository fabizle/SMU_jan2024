// CREATE A MAP
function makeMap(data) {
  // Step 1: Define your BASE Layers

  // Define variables for our tile layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Step 2: Create the OVERLAY (DATA) Layers
  let boroughs = L.geoJSON(data);

  // Step 3: Create the MAP object

  // Create a map object, and set the default layers.
  let myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11,
    layers: [street, boroughs]
  });

  // Step 4: Add the Layer Controls (Legend goes here too)

  // Only one base layer can be shown at a time.
  let baseMaps = {
    Street: street,
    Topography: topo
  };

  // Overlays that can be toggled on or off
  let overlayMaps = {
    Boroughs: boroughs
  };

  // Pass our map layers into our layer control.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);

}


// Step 2: Create the OVERLAY (DATA) Layers
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/nyc.geojson"
d3.json(url).then(function (data) {
  makeMap(data);
});

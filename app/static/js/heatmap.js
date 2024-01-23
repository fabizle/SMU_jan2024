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
  let markers = [];

  for (let i = 0; i < data.features.length; i++){
    let row = data.features[i];

    if (row.geometry.coordinates) {
      let latitude = row.geometry.coordinates[1];
      let longitude = row.geometry.coordinates[0];
      let location = [latitude, longitude];

      // make a heatmap instead of the marker
      // let marker = L.marker(location);

      markers.push(location);
    }
  }

  let heatLayer = L.heatLayer(markers);

  // Step 3: Create the MAP object

  // Create a map object, and set the default layers.
  let myMap = L.map("map", {
    center: [-32.8, 117.9],
    zoom: 8,
    layers: [street, heatLayer]
  });

  // Step 4: Add the Layer Controls (Legend goes here too)

  // Only one base layer can be shown at a time.
  let baseMaps = {
    Street: street,
    Topography: topo
  };

  // Overlays that can be toggled on or off
  let overlayMaps = {
    HeatMap: heatLayer
  };

  // Pass our map layers into our layer control.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);

}


// Step 2: Create the OVERLAY (DATA) Layers
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/Water_Hydrant_WCORP_070_WA_GDA2020_Public.geojson"
d3.json(url).then(function (data) {
  makeMap(data);
});

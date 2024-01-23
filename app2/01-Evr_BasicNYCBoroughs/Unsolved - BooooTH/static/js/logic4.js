// CREATE A MAP
let myMap; // global, has to be defined for the helper function

// Helper functions
function chooseColor(borough) {
  if (borough === "Brooklyn") {
    return "yellow";
  } else if (borough === "Bronx") {
    return "red";
  } else if (borough === "Manhattan") {
    return "orange";
  } else if (borough === "Queens") {
    return "green";
  } else if (borough === "Staten Island") {
    return "purple";
  } else {
    return "black";
  }
}

function onEachFeature(feature, layer) {
  // create a popup
  layer.bindPopup(`<h1>${feature.properties.neighborhood}</h1><hr><h2>${feature.properties.borough}</h2>`);

  // event listeners
  layer.on({
    // on hover
    mouseover: function (event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.9
      });
    },
    mouseout: function (event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.5
      });
    },
    click: function (event) {
      myMap.fitBounds(event.target.getBounds()); // this is why the global myMap needs to be defined
    },
  })
}

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

  let boroughs = L.geoJSON(data, {
    style: function (feature) {
      let mapStyle = {
        color: "white",
        fillColor: chooseColor(feature.properties.borough),
        fillOpacity: 0.5,
        weight: 1.5
      };

      return mapStyle;
    },
    onEachFeature: onEachFeature
  });

  // Step 3: Create the MAP object

  // Create a map object, and set the default layers.
  myMap = L.map("map", {
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

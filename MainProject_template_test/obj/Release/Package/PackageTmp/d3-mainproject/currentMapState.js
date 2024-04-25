// currentMapState.js

// You should have only one svg constant that is accessible throughout the module
const width = 1360, height = 800;
const svg = d3.select("#map-canvas")
  .attr("width", width)
  .attr("height", height);

export function clearCurrentMapState() {
    d3.select('#mapGroup').selectAll("*").remove();
    d3.select('#iconsGroup').selectAll("*").remove();
    d3.select("#map-canvas").selectAll("*").remove();
    d3.select("#control-panel-current").selectAll("*").remove();
    d3.select("#control-panel1").selectAll("*").remove();
    d3.select("#control-panel2").selectAll("*").remove();
    d3.select("#control-panel3").selectAll("*").remove();
    // Additional cleanup if necessary...
  }


// Define a function to set up the current map state
export function setupCurrentMapState() {
    // Implementation for setting up the map's current state
    
console.log('Setting up the current map state...');

////////////////////////////////////////////////
// AUSTRALIA MAP

// Define a geographical projection
const projection = d3.geoEquirectangular()
  .center([128, -27]) // Center the map on Australia
  .scale(1000) // Adjust scale
  .translate([width / 2, height / 2]);

// Increase scale like this:
projection.scale(projection.scale() * 1.3); // For example, increasing by 50%

// Create a path generator using the projection
const path = d3.geoPath().projection(projection);

// Create groups for map features and icons
const mapGroup = svg.append("g").attr("id", "mapGroup");
const iconsGroup = svg.append("g").attr("id", "iconsGroup");

// Define SVG filters for the watercolor effect
const defs = mapGroup.append('defs');

const watercolorFilter = defs.append('filter')
  .attr('id', 'watercolor')
  .attr('x', '-80%') // Increase area for the filter to cover larger displacement
  .attr('y', '-80%')
  .attr('width', '200%') // Make sure the filter effect covers the entire map area
  .attr('height', '200%');

watercolorFilter.append('feTurbulence')
  .attr('type', 'fractalNoise')
  .attr('baseFrequency', '0.2 0.2') // Adjust base frequency for a more noticeable texture
  .attr('numOctaves', '3') // Increase octaves for additional texture complexity
  .attr('seed', '5') // Seed for the pseudo-random number generator
  .attr('result', 'turbulenceResult');

watercolorFilter.append('feDisplacementMap')
  .attr('in2', 'turbulenceResult')
  .attr('in', 'SourceGraphic')
  .attr('scale', '30') // Adjust scale for visible distortion
  .attr('xChannelSelector', 'R')
  .attr('yChannelSelector', 'G')
  .attr('result', 'displacementMapResult');

// Additional filter primitive to blend the original graphic with the displacement map
watercolorFilter.append('feBlend')
  .attr('in', 'SourceGraphic')
  .attr('in2', 'displacementMapResult')
  .attr('mode', 'multiply');

// Function to map state names to color
const colorForState = (stateName, darker = false) => {
    const colors = {
      'NSW': '#ff4848',
      'Victoria': '#00cdb1',
      'Queensland': '#C989E5',
      'Tasmania':'#b0c4de',//'#738CD5',
      'ACT': '#a0d8e7',
      'South Australia': '#ffa641',
      'Northern Territory': '#ffc638',
      'Western Australia': '#69D2E7',
    };
    const color = colors[stateName] || '#ccc'; // Default color if not found
    return darker ? d3.rgb(color).darker(0.45).toString() : color; // Use darker() for a darker shade
};

// Load the local GeoJSON data
 d3.json("https://mainprojectvideo.blob.core.windows.net/mainprojectvi/australian-states.json").then(function(australia) {
// Dynamically shorten state names
australia.features.forEach(function(feature) {
  switch (feature.properties.STATE_NAME) {
      case 'New South Wales':
          feature.properties.STATE_NAME = 'NSW';
          break;
      case 'Australian Capital Territory':
          feature.properties.STATE_NAME = 'ACT';
          break;
      // Add other cases as necessary
  }
});


// Bind hover events to state paths for interactive coloring
mapGroup.selectAll(".state")
    .data(australia.features)
    .enter().append("path")
    .attr("class", "state")
    .attr("d", path)
    .attr("fill", d => colorForState(d.properties.STATE_NAME)) // Set initial fill color
    .attr("stroke", "#897D72")
    .attr("stroke-width", 1)
    .attr("stroke-linejoin", "round")
    .attr("filter", "url(#watercolor)") // Apply the watercolor filter here
    .on("mouseover", function(event, d) {
        d3.select(this).attr("fill", colorForState(d.properties.STATE_NAME, true)); // Set to darker color on hover

       /* // Append a text label on hover
        mapGroup.append("text")
            .attr("class", "dynamic-state-label")
            .attr("x", path.centroid(d)[0])
            .attr("y", path.centroid(d)[1])
            .attr("text-anchor", "middle")
            .text(d.properties.STATE_NAME);*/
    })
    .on("mouseout", function(event, d) {
        d3.select(this).attr("fill", colorForState(d.properties.STATE_NAME)); // Revert to original color on mouseout
        //d3.selectAll(".dynamic-state-label").remove(); // Remove the label
    });

}).catch(function(error) {
  console.error("Error loading the GeoJSON data:", error);
});

const checklistHTML = `
  <form id="options">
            <fieldset>
                <label><input type="radio" name="map-option" value="all" checked> All Factors</label>
                <label><input type="radio" name="map-option" value="Water Consumption"> Water Consumption</label>
                <label><input type="radio" name="map-option" value="Greenhouse Gases"> Greenhouse Gases</label>
                <label><input type="radio" name="map-option" value="PM2.5"> Air Quality</label>
                <label><input type="radio" name="map-option" value="Non-renewable"> Non-renewable Energy</label>
                <label><input type="radio" name="map-option" value="Waste"> Waste</label>
            </fieldset>
    </form> 
`;
    document.getElementById('control-panel-current').innerHTML = checklistHTML;

// RADIO BUTTON 

d3.selectAll('input[name="option"]').on('change', function() {
    var selectedValue = this.value;
    // Update your visualisation based on the selected value
    console.log("Radio button selected:", selectedValue);
  });
  
  
  // Event listener for radio buttons
  d3.selectAll('input[name="map-option"]').on('change', function(event) {
    const selectedOption = event.target.value;
    updateMap(selectedOption);
  });
  
  // Function to update the map based on the selected option
  function updateMap(option) {
    // Update your map visualisation based on the option selected
    console.log("Selected option:", option);

  }
  
  //ICONS
    // Example offset values for each type
    const typeOffsets = {
        'Greenhouse Gases': { dx: -70, dy: -10 },
        'Water Consumption': { dx: 20, dy: -20 },
        'PM2.5': { dx: 0, dy: 30 },
        'Non-renewable': { dx: 50, dy: 40 },
        'Waste': { dx: -50, dy: 50 }
    };

    const iconsData = [
        {
            type: 'Greenhouse Gases',
            url: "icons-v2/carbon.png",
            coordinates: [
                [153.512368, -35.473468], // ACT
                [147.612793, -31.240233], // NSW
                [134.550960, -20.491411], // NT
                [145.702796, -22.517574], // QLD
                [135.209155, -28.000233], // SA
                [147.8087, -41.809],     // TAS
                [144.785153, -36.471308], // VIC
                [121.628310, -25.672817], // WA
            ],
            width: 100,
            height: 100
        },
        {
            type: 'Water Consumption',
            url: "icons-v2/water.png",
            coordinates: [
                [152.012368, -35.473468], // ACT
                [148.612793, -31.240233], // NSW
                [134.550960, -20.491411], // NT
                [145.702796, -22.517574], // QLD
                [136.209155, -29.000233], // SA
                [147.8087, -41.999],     // TAS
                [146.785153, -38.471308], // VIC
                [121.628310, -25.672817], // WA
            ],
            width: 100,
            height: 100
        },
        {
            type: 'PM2.5',
            url: "icons-v2/pm2_5.png",
            coordinates: [
                [152.012368, -34.673468], // ACT
                [146.912793, -30.240233], // NSW
                [134.550960, -20.491411], // NT
                [145.702796, -22.517574], // QLD
                [135.209155, -28.000233], // SA
                [146.5687, -41.209],     // TAS
                [143.985153, -35.471308], // VIC
                [121.628310, -25.672817], // WA
            ],
            width: 200,
            height: 200
        },
        {
            type: 'Non-renewable',
            url: "icons-v2/non-renewable_energy.png",
            coordinates: [
                [151.012368, -35.473468], // ACT
                [146.612793, -31.240233], // NSW
                [134.550960, -20.491411], // NT
                [145.702796, -22.517574], // QLD
                [135.209155, -30.000233], // SA
                [146.8087, -40.959],     // TAS
                [143.785153, -36.471308], // VIC
                [121.628310, -25.672817], // WA
            ],
            width: 200,
            height: 200
        },
        {
            type: 'Waste',
            url: "icons-v2/waste.png",
            coordinates: [
                [153.012368, -35.473468], // ACT
                [147.612793, -31.240233], // NSW
                [134.550960, -20.491411], // NT
                [145.702796, -22.517574], // QLD
                [135.209155, -28.000233], // SA
                [147.8087, -41.809],     // TAS
                [143.785153, -36.471308], // VIC
                [121.628310, -25.672817], // WA
            ],
            width: 200,
            height: 200
        }

    ];


var greenhouse = {
    NSW: 7,
    VIC: 5,
    QLD: 8,
    SA: 4,
    WA: 6,
    TAS: 1,
    NT: 3,
    ACT: 2
};

var water = {
    NSW: 8,
    VIC: 6,
    QLD: 7,
    SA: 4,
    WA: 5,
    TAS: 3,
    NT: 2,
    ACT: 1
};

var airQuality = {
  NSW: 2,
  VIC: 6,
  QLD: 7,
  SA: 3,
  WA: 4,
  TAS: 1,
  NT: 8,
  ACT: 5
};

var nonRenewable = {
  NSW: 6,
  VIC: 7,
  QLD: 8,
  SA: 4,
  WA: 5,
  TAS: 1,
  NT: 2,
  ACT: 3
};

var waste = {
  NSW: 8,
  VIC: 7,
  QLD: 6,
  SA: 4,
  WA: 5,
  TAS: 2,
  NT: 1,
  ACT: 3
};


// Mapping of icon types to the corresponding variables
const typeToVariable = {
    'Greenhouse Gases': greenhouse,
    'Water Consumption': water,
    'PM2.5': airQuality,
    'Non-renewable': nonRenewable,
    'Waste': waste
};




// UPDATE ICONS
function updateAllIconCoordinates() {
    iconsData.forEach(icon => {
        // Find the corresponding variable for the icon type
        const valuesMap = typeToVariable[icon.type];
        
        if (valuesMap) {
            // Correctly update coordinates without altering original lat and long
            icon.coordinates = icon.coordinates.map((coord, index) => {
               // Ensure lat and lng are explicitly preserved
               const lat = coord[0];
               const lng = coord[1];
               // Find the corresponding value based on the state/territory order
               const stateOrder = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];
               
               if (index < stateOrder.length) {
                   const state = stateOrder[index];
                   const value = valuesMap[state]; // Use the state to fetch the value
                   return [lat, lng, value]; // Append the value while keeping lat and lng unchanged
               }
               return coord; // In case of any indexing issues, return the original coordinate
            });
        }
    });
}

// Run the function to update all icon coordinates
updateAllIconCoordinates();



// UPDATE MAP
  
  function updateMap(selectedOption) {
    // Clear existing icons
    iconsGroup.selectAll("image").remove();
  
    // Determine which icons to display
    const filteredIcons = selectedOption === 'all'
      ? iconsData
      : iconsData.filter(icon => icon.type === selectedOption);
  
    // Update icon sizes based on their values
    const updatedIconsData = updateIconSize(filteredIcons);
  
    // Append updated and filtered icons to the map
    updatedIconsData.forEach(icon => {
      const offset = typeOffsets[icon.type] || {dx: 0, dy: 0}; // Default offset if type is not found
  
      icon.coordinates.forEach(([lng, lat, , newWidth, newHeight]) => { // Adjusted to accept newWidth and newHeight
        const [x, y] = projection([lng, lat]);
  
        iconsGroup.append("image")
          .attr("xlink:href", icon.url)
          .attr("x", x + offset.dx - newWidth / 2) // Use the updated width for positioning
          .attr("y", y + offset.dy - newHeight / 2) // Use the updated height for positioning
          .attr("width", newWidth)
          .attr("height", newHeight);
      });
    });
  }
  
  // Function to update width and height based on value (already defined)
  function updateIconSize(iconsData) {
    const baseSize = 60;
    const sizeIncrement = 10;
  
    return iconsData.map(icon => {
      let updatedCoordinates = icon.coordinates.map(coord => {
        const value = coord[2]; // Assuming the value is stored as the third element
        const newSize = baseSize + (sizeIncrement * (value - 1));
        return [coord[0], coord[1], value, newSize, newSize]; // Append new width and height
      });
  
      return {...icon, coordinates: updatedCoordinates}; // Update icon with new coordinates (including sizes)
    });
  }

////////////////////////////////////////////////////////////////
  // Attach an event listener to the radio buttons
  d3.selectAll('input[name="map-option"]').on('change', function() {
    updateMap(this.value);
  });
  
  // Initialize with all icons displayed
  updateMap('all');  
// end
}





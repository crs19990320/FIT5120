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

function showData() {
    var storedData = sessionStorage.getItem('MapModelJson');
    console.log(typeof storedData);
    console.log(JSON.parse(storedData));
}

function extractData() {
    var storedData = sessionStorage.getItem('MapModelJson');
    if (storedData) {
        // Parse the JSON string to a JavaScript 
        var dataArray = JSON.parse(storedData);
        // Initialize an empty object to store the state and Temperature mappings 
        var greenhouse = {};
        var water = {};
        var temperature = {};
        // Iterate over the array to extract state and Temperature values        
        dataArray.forEach(item => {
            greenhouse[item.state] = item.net_emissions;
            water[item.state] = item.total_water_consumption;
            temperature[item.state] = item.Temperature;
        });
        console.log(greenhouse);
        console.log(water);
        console.log(temperature);
        // Now greenhouse is populated with state codes as keys and Temperatures as values 
        return {temperature, greenhouse, water};
    } else {
        console.log('No data found');
        return {};
    }
}
var { temperature, greenhouse, water } = extractData();

// Define a function to set up the current map state
export function setupCurrentMapState() {
    // Implementation for setting up the map's current state
    
console.log('Setting up the current map state...');
showData()

// Your setup code here

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
d3.json("data/australian-states.json").then(function(australia) {
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
        /*d3.select(this).asttr("fill", colorForState(d.properties.STATE_NAME, true)); // Set to darker color on hover

        // Append a text label on hover
        mapGroup.append("text")
            .attr("class", "dynamic-state-label")
            .attr("x", path.centroid(d)[0])
            .attr("y", path.centroid(d)[1])
            .attr("text-anchor", "middle")
            .text(d.properties.STATE_NAME);*/
    })
    .on("mouseout", function(event, d) {
        d3.select(this).attr("fill", colorForState(d.properties.STATE_NAME)); // Revert to original color on mouseout
        d3.selectAll(".dynamic-state-label").remove(); // Remove the label
    });

}).catch(function(error) {
  console.error("Error loading the GeoJSON data:", error);
});

const checklistHTML = `
  <form id="options">
            <fieldset>
                <legend>Explore Our Climate Change!</legend>
                <label><input type="radio" name="map-option" value="all" checked> All Factors</label><br>
                <label><input type="radio" name="map-option" value="Water Consumption"> Water Consumption</label><br>
                <label><input type="radio" name="map-option" value="Greenhouse Gases"> Greenhouse Gases</label><br>
                <label><input type="radio" name="map-option" value="Temperature"> Temperature</label>
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
    // This is where you'll need to modify how the map is rendered based on the data (population, area, GDP, etc.)
    console.log("Selected option:", option);
    // Example: if(option === 'population') { ... }
  }
  
  //ICONS
  // Example offset values for each type
  const typeOffsets = {
    'Greenhouse Gases': {dx: -50, dy: -50},
    'Water Consumption': {dx: 20, dy: -20},
    'Temperature': {dx: 0, dy: 20},
  };

  const iconsData = [
    {
      type: 'Greenhouse Gases',
      url: "icons/Emission_release_factory_icon.png",
      coordinates:[
          [153.012368, -37.473468], // ACT
          [144.209155, -32.240233], // NSW
          [134.550960, -21.491411], // NT
          [145.702796, -24.517574], // QLD
          [135.209155, -30.000233], // SA
          [149.8087, -43.809],     // TAS
          [145.785153, -38.471308], // VIC
          [120.628310, -27.672817], // WA
      ],
      width: 60,
      height: 60
    },
    {
      type: 'Water Consumption',
      url: "icons/water2.png",
      coordinates: [
          [153.012368, -35.473468], // ACT
          [146.612793, -32.240233], // NSW
          [134.550960, -19.491411], // NT
          [146.702796, -22.517574], // QLD
          [135.209155, -28.000233], // SA
          [149.8087, -41.809],     // TAS
          [145.785153, -38.471308], // VIC
          [120.628310, -25.672817], // WA
     ],
      width: 60,
      height: 60
    },
    {
      type: 'Temperature', 
      url: "icons/temp2.png", 
      coordinates: [
          [153.012368, -35.473468], // ACT
          [145.209155, -33.240233], // NSW
          [134.550960, -21.491411], // NT
          [145.702796, -24.517574], // QLD
          [135.209155, -29.800233], // SA
          [149.8087, -41.809],     // TAS
          [143.785153, -37.471308], // VIC
          [120.628310, -27.672817], // WA
     ],
      width: 60, 
      height: 60 },
    
    ];
    // Mapping of icon types to the corresponding variables
    const typeToVariable = {
        'Greenhouse Gases': greenhouse,
        'Temperature': temperature,
        'Water Consumption': water
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
                    const stateOrder = ['ACT', 'NSW', 'NT', 'Qld', 'SA', 'Tas', 'Vic', 'WA'];

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
            const offset = typeOffsets[icon.type] || { dx: 0, dy: 0 }; // Default offset if type is not found

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
        const baseSize = 40;
        const sizeIncrement = 5;

        return iconsData.map(icon => {
            let updatedCoordinates = icon.coordinates.map(coord => {
                const value = coord[2]; // Assuming the value is stored as the third element
                const newSize = baseSize + (sizeIncrement * (value - 1));
                return [coord[0], coord[1], value, newSize, newSize]; // Append new width and height
            });

            return { ...icon, coordinates: updatedCoordinates }; // Update icon with new coordinates (including sizes)
        });
    }
  //function updateMap(selectedOption) {
  //  // Clear existing icons
  //  iconsGroup.selectAll("image").remove();
  
  //  // Determine which icons to display
  //  const filteredIcons = selectedOption === 'all'
  //    ? iconsData
  //    : iconsData.filter(icon => icon.type === selectedOption);
  
  //  // Append filtered icons to the map
  //  filteredIcons.forEach(icon => {
  //    const offset = typeOffsets[icon.type] || {dx: 0, dy: 0}; // Default offset if type is not found
  
  //    icon.coordinates.forEach(([lng, lat]) => {
  //      const [x, y] = projection([lng, lat]);
  
  //      // // Calculate offset based on icon index
  //      // // This is a simple way to adjust the position so they don't overlap perfectly
  //      // // Adjust the offset multiplier as necessary to fit the visual appearance
  //      // const xOffset = x + (iconIndex * 10) - (filteredIcons.length * 5);
  //      // const yOffset = y - (iconIndex * 10) + (filteredIcons.length * 5);
  
  //      iconsGroup.append("image")
  //        .attr("xlink:href", icon.url)
  //        .attr("x", x - icon.width / 2)
  //        .attr("y", y - icon.height / 2)
  //        .attr("width", icon.width)
  //        .attr("height", icon.height);
  //    });
  //  });
  //}
  
  // Attach an event listener to the radio buttons
  d3.selectAll('input[name="map-option"]').on('change', function() {
    updateMap(this.value);
  });
  
  // Initialize with all icons displayed
  updateMap('all');
  
  
  
  //ZOOM BEHAVIOUR
  const initialFontSize = 12; // Initial font size in pixels
  
  // Define your zoom behavior
  var zoom = d3.zoom()
      .scaleExtent([1, 8])  // This controls how much you can zoom (1X to 8X here)
      .on('zoom', zoomed);
  
  // Apply the zoom behavior to the SVG canvas
  svg.call(zoom);
  
  function zoomed({transform}) {
    // This function will be called when zooming or panning occurs
    // 'g' is the group that contains all the elements you want to zoom
    mapGroup.attr('transform', transform); // Apply the transformation
  
    iconsGroup.attr('transform', transform); // Apply the transformation
  
    // If you have labels or other elements you want to scale, you can select them here too
    svg.selectAll('.state-label')
      .attr('transform', function(d) {
        return `translate(${transform.apply(path.centroid(d))})`;
      })
      .style('font-size', `${initialFontSize}px`); // Adjust label font-size inversely to scale
  }
  
  // Function to reset zoom
    function resetZoom() {
  
    svg.transition()
      .duration(750) // Transition speed
      .call(zoom.transform, d3.zoomIdentity); // Reset the transform to no scaling and translation
  }
  // Select the reset button and bind the click event
  d3.select('#reset-zoom').on('click', resetZoom);
  
  // The resetZoom function resets the zoom transformation to the default state
  function resetZoom() {
    svg.transition()
      .duration(750) // Smooth transition duration
      .call(zoom.transform, d3.zoomIdentity); // Reset zoom level to the original state
  }

  
// end
}





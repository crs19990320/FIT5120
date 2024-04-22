// nextTenYearsMapState.js
import { clearCurrentMapState } from './currentMapState.js';

// You should have only one svg constant that is accessible throughout the module
const width = 1360, height = 800;
const svg = d3.select("#map-canvas")
  .attr("width", width)
  .attr("height", height);

// Define a function to set up the map for the next ten years
export function setupNextTenYearsMapState() {
    clearCurrentMapState(); // Clear the map before setting up the next state
    console.log('Setting up the map state for the next ten years...');

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
      d3.select(this).asttr("fill", colorForState(d.properties.STATE_NAME, true)); // Set to darker color on hover

      // Append a text label on hover
      mapGroup.append("text")
          .attr("class", "dynamic-state-label")
          .attr("x", path.centroid(d)[0])
          .attr("y", path.centroid(d)[1])
          .attr("text-anchor", "middle")
          .text(d.properties.STATE_NAME);
  })
  .on("mouseout", function(event, d) {
      d3.select(this).attr("fill", colorForState(d.properties.STATE_NAME)); // Revert to original color on mouseout
      d3.selectAll(".dynamic-state-label").remove(); // Remove the label
  });

}).catch(function(error) {
console.error("Error loading the GeoJSON data:", error);
});

// CHECKLISTS

const checklistHTML = `
    <form id="options">
        <fieldset>
            <legend>First Week!</legend>
            <label><input type="checkbox" name="all-factors" value="all"> Turn off tap while brushing teeth</label></br>
            <label><input type="checkbox" name="water-consumption" value="Water Consumption"> Shorten your shower</label></br>
            <label><input type="checkbox" name="greenhouse-gases" value="Greenhouse Gases"> Turn off tap while soaping during handwash</label></br>
            <label><input type="checkbox" name="temperature" value="Temperature"> Take a walk around house to detect any water leaks</label></br>
            <label><input type="checkbox" name="all-factors" value="all"> Use bucket to collect rainwater</label></br>
            <label><input type="checkbox" name="all-factors" value="all"> BONUS: Share few water-saving tips with your friend</label></br>
        </fieldset>
    </form> 
`;
document.getElementById('control-panel1').innerHTML = checklistHTML;

const checklistHTML2 = `
    <form id="options">
        <fieldset>
            <legend>Second Week!</legend>
            <label><input type="checkbox" name="all-factors" value="all"> Turn off lights when you leave a room</label></br>
            <label><input type="checkbox" name="water-consumption" value="Water Consumption"> Gather paper, plastic, and cans for recycling</label></br>
            <label><input type="checkbox" name="greenhouse-gases" value="Greenhouse Gases"> Help plant something green.</label></br>
            <label><input type="checkbox" name="temperature" value="Temperature"> Start a mini compost pile</label></br>
            <label><input type="checkbox" name="all-factors" value="all"> Trade toys with your friend</label></br>
            <label><input type="checkbox" name="all-factors" value="all"> BONUS: With a parent, walk to a nearby park or store </br>
            instead of driving</label>
        </fieldset>
    </form> 
`;
document.getElementById('control-panel2').innerHTML = checklistHTML2;

const checklistHTML3 = `
    <form id="options">
        <fieldset>
            <legend>Third Week!</legend>
            <label><input type="checkbox" name="all-factors" value="all"> Dress for the weather: cool for heat, warm for cold</label></br>
            <label><input type="checkbox" name="water-consumption" value="Water Consumption"> Build a cool blanket fort</label></br>
            <label><input type="checkbox" name="greenhouse-gases" value="Greenhouse Gases"> Snuggle in blankets instead of turning up the heat</label></br>
            <label><input type="checkbox" name="temperature" value="Temperature"> Plant a tree for shade</label></br>
            <label><input type="checkbox" name="all-factors" value="all"> Wear light colours on sunny days</label></br>
            <label><input type="checkbox" name="all-factors" value="all"> BONUS: Try a day without heaters or air conditioners</label>
        </fieldset>
    </form> 
`;
document.getElementById('control-panel3').innerHTML = checklistHTML3;


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
    coordinates: [
       [147.612793, -33.240233], // NSW
       [143.785153, -38.471308], // VIC
       [145.702796, -24.517574], // QLD
       [135.209155, -28.000233], // SA
       [120.628310, -27.672817], // WA
       [149.8087, -41.809],     // TAS
       [133.550960, -21.491411], // NT
       [153.012368, -35.473468], // ACT 
    ],
    width: 60,
    height: 60
  },
  {
    type: 'Water Consumption',
    url: "icons/water2.png",
    coordinates: [
      [145.612793, -33.240233], // NSW
      [141.785153, -38.471308], // VIC
      [143.702796, -24.517574], // QLD
      [133.209155, -28.000233], // SA
      [118.628310, -27.672817], // WA
      [147.8087, -41.809],     // TAS
      [131.550960, -21.491411], // NT
      [151.012368, -35.473468], // ACT 
   ],
    width: 60,
    height: 60
  },
  {
    type: 'Temperature', 
    url: "icons/temp2.png", 
    coordinates: [
      [149.612793, -33.240233], // NSW
      [145.785153, -38.471308], // VIC
      [147.702796, -24.517574], // QLD
      [137.209155, -28.000233], // SA
      [122.628310, -27.672817], // WA
      [151.8087, -41.809],     // TAS
      [135.550960, -21.491411], // NT
      [155.012368, -35.473468], // ACT 
   ],
    width: 60, 
    height: 60 },
  
];

function updateMap(selectedOption) {
  // Clear existing icons
  iconsGroup.selectAll("image").remove();

  // Determine which icons to display
  const filteredIcons = selectedOption === 'all'
    ? iconsData
    : iconsData.filter(icon => icon.type === selectedOption);

  // Append filtered icons to the map
  filteredIcons.forEach(icon => {
    const offset = typeOffsets[icon.type] || {dx: 0, dy: 0}; // Default offset if type is not found

    icon.coordinates.forEach(([lng, lat]) => {
      const [x, y] = projection([lng, lat]);

      iconsGroup.append("image")
        .attr("xlink:href", icon.url)
        .attr("x", x - icon.width / 2)
        .attr("y", y - icon.height / 2)
        .attr("width", icon.width)
        .attr("height", icon.height);
    });
  });
}

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


// END    
}
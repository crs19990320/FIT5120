// Define the dimensions for the SVG container
const width = 1360, height = 800;

// Select the SVG element by its ID and set its dimensions
const svg = d3.select("#map-canvas")
  .attr("width", width)
  .attr("height", height);


// AUSTRALIA MAP

// Define a geographical projection
const projection = d3.geoEquirectangular()
  .center([132, -27]) // Center the map on Australia
  .scale(1000) // Adjust scale
  .translate([width / 2, height / 2]);

// Increase scale like this:
projection.scale(projection.scale() * 1.3); // For example, increasing by 50%

// Create a path generator using the projection
const path = d3.geoPath().projection(projection);

// Define SVG filters for the watercolor effect
const defs = svg.append('defs');

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
  
  // Draw the states on the SVG with the watercolor filter applied
  svg.selectAll(".state")
    .data(australia.features)
    .enter().append("path")
    .attr("class", "state")
    .attr("d", path)
    .attr("fill", d => colorForState(d.properties.STATE_NAME))
    // Adjust stroke color and width for a subtle outline effect
    .attr("stroke", "#897D72")
    .attr("stroke-width", 1) // Reduce stroke width for a finer outline
    .attr("stroke-linejoin", "round")
    .attr("filter", "url(#watercolor)"); 

  // Add hover effect
  svg.selectAll(".state")
    .on("mouseover", function(event, d) {
        d3.select(this).attr("fill", colorForState(d.properties.STATE_NAME, true)); // Set to darker color
    })
    .on("mouseout", function(event, d) {
        d3.select(this).attr("fill", colorForState(d.properties.STATE_NAME)); // Revert to original color
    });

  // Add state labels
  svg.selectAll(".state-label")
    .data(australia.features)
    .enter().append("text")
    .attr("class", "state-label")
    .attr("transform", d => `translate(${path.centroid(d)})`)
    .attr("dy", ".35em")
    .text(d => d.properties.STATE_NAME)
    .attr("text-anchor", "middle")
    .attr("font-size", "9px");
}).catch(function(error) {
  console.error("Error loading the GeoJSON data:", error);
});

d3.selectAll('input[name="option"]').on('change', function() {
  var selectedValue = this.value;
  // Update your visualisation based on the selected value
  console.log("Radio button selected:", selectedValue);
});

// RADIO BUTTON 

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

//ZOOM BEHAVIOUR

// Define your zoom behavior
var zoom = d3.zoom()
    .scaleExtent([1, 8])  // This controls how much you can zoom (1X to 8X here)
    .on('zoom', zoomed);

// Apply the zoom behavior to the SVG canvas
svg.call(zoom);

function zoomed({transform}) {
  // This function will be called when zooming or panning occurs
  // 'g' is the group that contains all the elements you want to zoom
  svg.selectAll('path') // Select all paths inside the SVG
    .attr('transform', transform); // Apply the transformation

  // If you have labels or other elements you want to scale, you can select them here too
  svg.selectAll('.state-label')
    .attr('transform', function(d) {
      return `translate(${transform.apply(path.centroid(d))})`;
    })
    .style('font-size', `${1/transform.k * 10}px`); // Adjust label font-size inversely to scale
}

// Optional: Function to reset zoom
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




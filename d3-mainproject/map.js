// Define the dimensions for the SVG container
const width = 1060, height = 800;

// Select the SVG element by its ID and set its dimensions
const svg = d3.select("#map-canvas")
    .attr("width", width)
    .attr("height", height);

// Define a geographical projection
// You can adjust the scale and center to better fit the map
const projection = d3.geoEquirectangular()
        .center([132, -28]) // Center the map on Australia
        .scale(1000) // Adjust scale to see if the states fit within the canvas
        .translate([width / 2, height / 2]);

// Create a path generator using the projection
const path = d3.geoPath().projection(projection);

// Load the local GeoJSON data
d3.json("data/australian-states.json").then(function(australia) {

    // Draw the states on the SVG
    svg.selectAll(".state")
        .data(australia.features)
        .enter().append("path")
        .attr("class", "state")
        .attr("d", path)
        .attr("fill", "#ccc")
        .attr("stroke", "#333")
        .attr("stroke-width", "1px")
        .each(function(d) {
            // Log the bounding box of each path
            console.log(this.getBBox());
        });;

    // If you want to add state labels as well
    svg.selectAll(".state-label")
        .data(australia.features)
        .enter().append("text")
        .attr("class", "state-label")
        .attr("transform", function(d) {
            return "translate(" + path.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .text(function(d) {
            return d.properties.STATE_NAME; // Replace with the property that has the state's name
        })
        .attr("text-anchor", "middle")
        .attr("font-size", "9px");

}).catch(function(error) {
    console.error("Error loading the GeoJSON data:", error);
}); 


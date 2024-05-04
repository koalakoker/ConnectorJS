function updateProperties() {
  var selectedObject = document.getElementById("objectSelect").value;
  var propertiesContainer = document.getElementById("propertiesContainer");
  propertiesContainer.innerHTML = ""; // Clear previous properties

  // Dynamically load HTML content for selected object
  fetch(`object_${selectedObject}.html`)
    .then((response) => response.text())
    .then((html) => {
      propertiesContainer.innerHTML = html;
    })
    .catch((error) => console.error("Error fetching object HTML:", error));
}

function updateObject() {
  var selectedObject = document.getElementById("objectSelect").value;
  var updatedProperties = {};

  if (selectedObject === "point") {
    updatedProperties.x = parseFloat(
      document.getElementById("xCoordinate").value
    );
    updatedProperties.y = parseFloat(
      document.getElementById("yCoordinate").value
    );
  } else if (selectedObject === "line") {
    updatedProperties.start = {
      x: parseFloat(document.getElementById("startX").value),
      y: parseFloat(document.getElementById("startY").value),
    };
    updatedProperties.end = {
      x: parseFloat(document.getElementById("endX").value),
      y: parseFloat(document.getElementById("endY").value),
    };
  }
  // Add more else-if blocks for different types of objects

  // Here you can use the updated properties to update your object or perform any desired action
  console.log("Updated Object Properties:", updatedProperties);
}

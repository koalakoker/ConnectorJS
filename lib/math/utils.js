function replaceTokens(originalString, tokenNumber, replacementString) {
  // Construct the token pattern using a regular expression
  const tokenPattern = new RegExp("%" + tokenNumber, "g");

  // Replace all occurrences of the token with the replacement string
  const replacedString = originalString.replace(
    tokenPattern,
    replacementString
  );

  return replacedString;
}

function updateNestedProperty(obj, propertyPath, value) {
  // Split the property path into individual parts
  var parts = propertyPath.split(".");

  // Traverse the object to reach the nested property
  var currentObj = obj;
  for (var i = 0; i < parts.length - 1; i++) {
    currentObj = currentObj[parts[i]];
    // If any intermediate property is not an object, create an empty object
    if (typeof currentObj !== "object" || currentObj === null) {
      currentObj = {};
    }
  }

  // Update the nested property with the value
  currentObj[parts[parts.length - 1]] = value;
}

function getComponent(path) {
  return new Promise((resolve, reject) => {
    fetch(path)
      .then((response) => response.text())
      .then((html) => {
        resolve(html);
      });
  });
}

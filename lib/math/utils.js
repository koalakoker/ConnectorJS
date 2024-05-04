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

/**
 * Functionality built upon used REST-Parameters etc.
 */
const GamsREST = (() => {
  /**
   * Accesses the GAMS locale Rest parameter and returns the after the "=" following two characters.
   * @returns {string} Client's value of the ISO Lang Code e.g. "en" or "de".
   */
  const detectLocaleLang = (url: string = window.location.href): string => {
    let toFind = "locale=";
    let index = url.indexOf(toFind);
    if (index === -1)
      throw new ReferenceError(
        `No 'locale' restpathvariable could be found in the current user's location. Current urls is: ${url}`
      );

    let start = index + toFind.length;
    let result = url.substring(start, start + 2);

    //small error handling
    let commonValues = ["es", "en", "de", "fr", "it"];
    if (!commonValues.includes(result))
      console.warn(
        "gamsTemplateJs only supports two character language codes inside the locale REST parameter. Expected languages: ",
        commonValues
      );

    return result;
  };

  return {
    detectLocaleLang,
  };
})();

export default GamsREST;

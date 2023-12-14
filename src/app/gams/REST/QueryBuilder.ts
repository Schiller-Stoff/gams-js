

/**
 * Contains methods to help building GAMS related queries 
 * especially for SPARQL operations.
 */
const QueryBuilder = (() => {

   /**
   * Builds a single subparameter for the params REST variable
   * for using query objects with GAMS.
   * @param param sub-parameter name like "$1"
   * @param searchVal Value to be passed to the subparameter
   * @returns Unencoded subparameter-statement like "$1|myValue" or "$4|AnotherValue".
   */
  const buildParamsSubQuery = (param: string, searchVal: string | undefined): string => {
    if(!searchVal) throw new TypeError("Cannot construct the query when not all fields are valid.");
    return `${param}|${searchVal}`;
  }

  /**
   * Takes in a map-object of parameters and related values. Handles
   * creation of $,| and ; signs as convention on GAMS for using query objects. 
   * @param paramMap Object-map of parameters (like "$1|4;$2|5") given as subquery inside the params REST-variable.
   */
  const buildParamsRESTVariable = (paramMap: {[property: string]: string}) => {
    let paramsSubQuery = "";
    Object.keys(paramMap).forEach((prop, i) => {
      paramsSubQuery += buildParamsSubQuery(prop,paramMap[prop]);
      if(i !== Object.keys(paramMap).length-1) paramsSubQuery += ";";
    });
    return paramsSubQuery;
  }


  /**
   * Applies given url with complete params variable and according to given map.
   * @param url url to be used
   * @param paramMap parameters to be applied.
   * @returns Encoded url with set params sub parameters.
   */
  const buildFullParamsQuery = (url:string, paramMap: {[property: string]: string}) => {
    let urlParsed = new URL(url);
    urlParsed.searchParams.set('params',buildParamsRESTVariable(paramMap));
    return urlParsed.toString();
  }

  return {
    buildParamsSubQuery,
    buildParamsRESTVariable,
    buildFullParamsQuery
  }

})();

export default QueryBuilder;
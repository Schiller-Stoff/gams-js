
import QueryBuilder from "../gams/REST/QueryBuilder";

/**
 * Object that handles redirection functionalities in gams.js.
 */
const Redirector = (() => {

  /**
   * Redirects client to given url. Will replace client's history
   * so that it mimics a real http redirect (without being able to 
   * use the browser'S backbutton etc.) 
   * @param url Not encoded url as string.
   */
  const redirectTo = (url: string) => {
    let urlParsed = new URL(url);
    window.location.replace(urlParsed.toString());
  }

  /**
   * Redirects client to given redirectUrl when called. Replaces "_HASH_" inside given hashCorrectTemplate
   * with the client's current hash value. Currently only works with one query-sub-parameter e.g. "$1".
   * @param redirectUrl Target base url to where the redirect will lead
   * @param paramName Name of REST-variable "params" sub-parameter to be set e.g. "$4".
   * @param hashCorrectTemplate Tells the method where to place the hash from the client for the redirection url. Like THIS _HASH_ EXAMPLE will
   * resolves to THIS CLIENTHASH EXAMPLE. "_HASH_" will be replaced through the client's hash value.
   */
  const hashQueryRedirect = (redirectUrl: string, paramName: string, hashCorrectTemplate?: string) => {

    let hash = window.location.hash;
    let hashValue = hash.substring(1);

    if(hashCorrectTemplate){
      hashValue = hashCorrectTemplate.replace("_HASH_", hashValue);
    }
    
    if(hash){
      let url = new URL(redirectUrl);
      // build subparams if defined.
      url.searchParams.set("params",QueryBuilder.buildParamsSubQuery(paramName, hashValue));
      Redirector.redirectTo(url.toString());
      
    } else {
      console.warn("Could not find any valid hash-value inside client's url.");
    }

  }

 



  return {
    redirectTo,
    hashQueryRedirect
  }
})();

export default Redirector;
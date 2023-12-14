

/**
 * Returns true if href's value leads to an internal location with hash.
 * 
 */
const detectInternalHref = (windowLocation: Location, hrefValue: string): boolean => {
  //first invalid hrefValue errors
  if(hrefValue === "#")throw new TypeError(`The href value of clicked element is invalid. It must not be just "${hrefValue}".`);
  if((hrefValue.length === 0) || !hrefValue) throw new TypeError(`The href value can't be an empty string or validate to false. Given value: ${hrefValue}`); 
  
  // definetely no id meantioned in href.
  if(!hrefValue.includes('#'))return false; 
  
  //e.g. "#example01" - will always mean go to id on current resource.
  if(hrefValue.indexOf("#") === 0)return true; 

  // location.pathname comparison
  // when pathname is empty
  if(windowLocation.pathname === ""){
    //find server name pos.
    let pathStartIndex =  hrefValue.indexOf(windowLocation.host) + windowLocation.host.length;
    let hash = hrefValue[pathStartIndex];
    return hash === "#";
  }

  // case of full url in href (but when same url -> and "#" available could also mean id on
  // same resource) 
  if(hrefValue.includes(windowLocation.pathname)){
    let pathIndex = hrefValue.indexOf(windowLocation.pathname);
    let hashIndex = pathIndex + windowLocation.pathname.length;
    let val = hrefValue[hashIndex];

    //when mode is different -> then it's an external link
    if(!hrefValue.includes(windowLocation.search))return false;
    

    switch(val){
      case "/":         //definitely other resource
        return false;
      default:          //"?" would just indicate e.g. other parameter like different lang etc.
        return true
    }
  }

  //what is with lasst and current hash comparison???

  return false;
}

/**
 * Returns the current Digital Object's PID on GAMS
 * via reading out the pathname property. 
 * @returns pid as string.
 */
export const getCurrentPid = (): string => {

  let path = window.location.pathname;
  let fedoraObjExpr = "/archive/objects/";

  if(path.includes(fedoraObjExpr)){
    let index = path.indexOf(fedoraObjExpr);
    path = path.slice(index + fedoraObjExpr.length, path.length);
    let slashIndex = path.indexOf("/");
    // pid already available 
    if (slashIndex === -1) return path;
    return path.slice(0,slashIndex);
    
  //when no archive/objects before  
  } else {
    path = path.slice(1,path.length); //remove first '/'
    return path = path.slice(0,path.indexOf("/"));
  }

}


export const gamsUrlUtils = {
  detectInternalHref,
  getCurrentPid
}
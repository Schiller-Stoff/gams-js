import QueryBuilder from "./QueryBuilder";

/**
 * Class extends URL class with GAMS specific URL conventions.
 * - like getting the pid / sdef / params REST-subvariable.
 */
class GAMSUrl extends URL {
  private _pid: string;
  private _sdef: string;

  constructor(url?: string) {
    super(url ? url : window.location.href);
    this._pid = this._parsePid(this.pathname);
    this._sdef = this._parseSdef(this.href);
  }

  get pid() {
    return this._pid;
  }

  get sdef() {
    return this._sdef;
  }

  /**
   * Returns the pid of the given gamsUrl-pathname.
   * @param path pathname of the to be analysed url.
   */
  private _parsePid(path: string) {
    let fedoraObjExpr = "/archive/objects/";
    let pid = "";
    if(!path.includes(":")){
      throw new TypeError("No ':' found in given GAMS path. A valid pid can't be assigned.");
    }
    if(path.includes("http"))throw new TypeError("_parsePid works with the pathname not with the url string!");
    if(path.includes("?"))console.warn("Detected a '?' in given path _parsePid only works with pathnames (and not with full urls). Given path: ", path);

    if (path.includes(fedoraObjExpr)) {
      let index = path.indexOf(fedoraObjExpr);
      path = path.slice(index + fedoraObjExpr.length, path.length);
      let slashIndex = path.indexOf("/");
      // pid already available
      if (slashIndex === -1) {
        pid = path;
      } else {
        pid = path.slice(0, slashIndex);
      };
      

      //when no archive/objects before
    } else {
      path = path.slice(1, path.length); //remove first '/'
      // validate if / inside pid
      pid = !path.includes("/") ? path : path.slice(0, path.indexOf("/"));
    }

    if(!pid){
      console.error(`Invalid GAMSURL: PID not parseable out of given path: '${path}'`)
      throw new TypeError("Invalid GAMSURL: PID not parseable out of given url.");
    }
    return pid;
  }

  /**
   * Returns the service definition statement from a GAMSUrl
   * @param href href of url to be analyed
   */
  private _parseSdef(href: string) {
    if (!href.includes("sdef")) return "";
    let split = href.split("/");
    // search array item with sdef: inside and return the item.
    return split.filter((val) => val.includes("sdef:"))[0];
  }

  /**
   * Applies given url with complete params variable and given map.
   * @param param paramName to be assigned like '$1'
   * @param value value that should be assigned to the param-declaration. 
   * @returns the encoded url.
   */
  addGamsParam(param: string, value: string) {
    let curParams = this.searchParams.get("params");
    let toAdd = "";
    if (curParams) {
      toAdd = `${curParams};${QueryBuilder.buildParamsSubQuery(param, value)}`;
    } else {
      toAdd = QueryBuilder.buildParamsSubQuery(param, value);
    }
    this.searchParams.set("params", toAdd);
    return this.toString();
  }
}

export default GAMSUrl;


/**
 * Interface for GamsJS
 */
export interface GamsJs {
  dom:{
    alignHashNavAwareOnLoad: (nav: HTMLElement | null | undefined) => void,
    alignIdNavAwareOnClick: (useClassSelection: boolean, scrollBehavior: "auto" | "smooth", nav: HTMLElement | null | undefined) => void,
    assignActiveClass: (id: string) => Element,
    copyClick: Function,
    copyTextToClipboard: Function
    _dom: Object
  },
  redirect: {
    to: (url: string) => void,
    hashQueryTo: (redirectUrl: string, paramName: string) => void,
  },
  navigate: {
    to?: (url: string, mode?: "tab" | undefined) => void,
    demandHttps: () => void,
  },
  url: {
    GAMSUrl: any,
    getLocale?: () => string,
    getParams?: () => string,
    getMode?: () => string,
    getPid?: () => string,
    getSdef?: () => string,
    getServer?: () => string
    _url:Object
  }, 
  bootstrap: {
    _bootstrap: Object
  },
  query: {
    build: (url:string, paramMap: {[property: string]: string}) => string,
    QueryBuilder: Object,
  },
  utils: {
    groupBy: Function
  }
}
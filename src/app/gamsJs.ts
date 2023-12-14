/**
 *
 * File defines global constant gamsJs and only that.
 *
 */

import GamsREST from "./gams/REST/GamsREST";
import DOM from "./dom/dom";
import { userUrl } from "./url/userUrl";
import BootstrapUtils  from "./bootstrap/BootstrapUtils";
import QueryBuilder from "./gams/REST/QueryBuilder";
import { GamsJs } from "../@types/gamsJs";
import utils from "./utils/index";
import Redirector from "./url/Redirector";
import GAMSUrl from "./gams/REST/GamsURL";
import Navigator from "./url/Navigator";

/**
 * Main module for gamsJs that follows gamsJs type 
 * defined in @types folder. 
 */
export const gamsJs: GamsJs = (() => {
  return {
    dom: {
      alignHashNavAwareOnLoad: DOM.nav.alignHashNavAwareOnLoad,
      alignIdNavAwareOnClick: DOM.nav.alignIdNavAwareOnClick,
      assignActiveClass: DOM.NavHandler.assignActiveClass,
      copyClick: utils.copyClick,
      copyTextToClipboard: utils.copyTextToClipboard,
      _dom: DOM,
    },
    redirect: {
      to: Redirector.redirectTo,
      hashQueryTo: Redirector.hashQueryRedirect,
    },
    navigate : {
      demandHttps: userUrl.demandHttps,
      to: Navigator.navigateTo
    },
    url: {
      GAMSUrl,
      _url: userUrl,
    },
    bootstrap: {
      _bootstrap: BootstrapUtils,
    },
    query: {
      build: QueryBuilder.buildFullParamsQuery,
      QueryBuilder: QueryBuilder
    },
    utils: {
      groupBy: utils.groupBy
    }
  };
})();

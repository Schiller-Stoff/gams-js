

export const userUrl = (() => {

  /**
   * Checks if page is loaded via http or https. In first case it will display an alert box, asking for reload via https
   * or continuing loading.
   * @param displayText text to be displayed in the confirm dialog
   */
  const demandHttps = (displayText?: string) => {

    if(!displayText) displayText =
    "You've loaded the page with http instead of https. The page will only work via https. Reload page with https?";

    if (location.protocol !== "https:") {
      if (confirm(displayText)) {
        location.protocol = "https:";
      }
    }
  }

  return {
    demandHttps
  }

})();
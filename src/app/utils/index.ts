// closed module pattern.
// needs to be an IIFE

/**
 * Utils module to handle general js methods / functions needed in context
 * of DH research.
 */
const utils = (() => {
  /**
   * Iterate over given array and regroup nested objects according to defined property name.
   * @param array Array to be regrouped.
   * @param groupBy Name of property according to which the regrouping should be processed.
   * @returns Object of regrouped array.
   */
  const groupBy = (
    array: { [property: string]: any }[],
    grouBy: string,
    groupFunc:
      | ((aggregator: { [property: string]: any }, iterProp: string) => void)
      | undefined = undefined
  ) => {
    const groupedBy = array.reduce((aggr, value) => {
      Object.keys(value).forEach((property) => {
        aggr[value[grouBy]] = aggr[value[grouBy]] ? aggr[value[grouBy]] : {};

        if (groupFunc) {
          groupFunc(aggr, property);
        } else {
          aggr[value[grouBy]][property] = aggr[value[grouBy]][property]
            ? aggr[value[grouBy]][property]
            : [];
          aggr[value[grouBy]][property].push(value[property]);
        }
      });
      return aggr;
    }, {});
    return groupedBy;
  };


  /**
   * Copies given string to client's clipboard. Needs to add and remove 
   * a dummy textarea element to make things work.
   * @param toCopy text to be copied to the clipboard.
   */
  const copyTextToClipboard = (toCopy: string) => {
    const el = document.createElement('textarea');
    el.value = toCopy;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  /**
   * Uses copyTextToClipboard to copy an element's text 
   * content to the clipboard.
   * @param sourceId Id of element that should trigger the copying on click
   * @param targetId Id of element that contains the content to be copied.
   * @param msg Msg to be displayed when copying was succesful
   */
  const copyClick = (sourceId: string, targetId: string, msg: string = "In die Zwischenablage kopiert: ") => {

    let sourceElem = document.querySelector(`#${sourceId}`);
    let targetElem = document.querySelector(`#${targetId}`);

    if(!sourceElem){
      console.error(`GamsJs - copyClick: Could not select source element with class selector: ${sourceId}.`);
      return;
    };

    if(!targetElem){
      console.error(`GamsJs - copyClick: Could not select target element with class selector: ${targetId}.`);
      return;
    }

    sourceElem.addEventListener('click', evt => {
      if(!targetElem)return;
      if(!targetElem.textContent){
        console.error("Found no text to copy from. Given element was: ", targetElem);
        return
      }
      copyTextToClipboard(targetElem.textContent);
      alert(msg + targetElem.textContent);
    });

  }


  return {
    groupBy,
    copyClick,
    copyTextToClipboard
  };
})();

export default utils;

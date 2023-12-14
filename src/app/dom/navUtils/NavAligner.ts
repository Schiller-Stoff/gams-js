import EventRegister from "../eventUtils/EventRegister";
import { gamsUrlUtils } from "../../../utils/gamsUrlUtils";

const NavAligner = (() => {
  // used in method jumpToElemFixedNavAware to "remember" the last
  // elem the "gamsJs--dom-alignedElem" class was assigned to.
  let oldTarget: undefined;
  /**
   * Moves viewport to given element, BUT takes fixed navbar onto considartion.
   * (a fixed nav won't hide the target element)
   * Assigns the class "gamsJs--dom-alignedElem" to the jumped elem.
   * @param {HTMLElement} nav nav position-fixed via css or javascript.
   * @param {HTMLElement} targetElem elem to that the viewport should be top-aligned.
   */
  const jumpToElemFixedNavAware = (
    nav: HTMLElement,
    targetElem: HTMLElement,
    scrollBehavior: "auto" | "smooth" = "auto"
  ) => {
    setTimeout(function () {
      let elemPos = targetElem.getBoundingClientRect().top;
      let newPos = elemPos - (nav.offsetHeight as number);

      //@ts-ignore
      if (oldTarget) oldTarget.classList.remove("gamsJs--dom-alignedElem");
      targetElem.classList.add("gamsJs--dom-alignedElem");
      //@ts-ignore
      oldTarget = targetElem;

      let userScroll = document.documentElement.scrollTop;
      newPos = newPos + userScroll;
      window.scrollTo({ top: newPos, behavior: scrollBehavior });
    }, 50);
  };

  /**
   * Realigns fixed navigation-bar when a specific element should be aligned in user's scroll viewport.
   * (otherwise the <nav> would hide the aligned element)
   * Assigns click events to either all <a> tags or to all elements with given class.
   *
   * @param nav Fixed Navigation element that should be taken into view-alignment consideration.
   * @param classSelector Optional css class-selector to specify certain elements .
   * @param scrollBehavior Animation of scroll to element.
   */
  const _onClickJumpToFixedNavAware = (
    nav: HTMLElement | null = document.querySelector("nav"),
    classSelector: string | undefined = undefined,
    scrollBehavior: "auto" | "smooth" = "auto"
  ) => {
    let elems = classSelector
      ? document.querySelectorAll(classSelector)
      : document.querySelectorAll(`a`);
    if (!elems || elems.length === 0)
      throw new ReferenceError(
        `Failed to select elements via '${
          classSelector ? classSelector : "a"
        }' selector`
      );

    if (!nav) {
      throw new ReferenceError(
        `Nav validated to false (undefined, null, false etc.). Maybe the default selection inside _onClickJumpToFixedNavAware failed.`
      );
    }

    elems.forEach((elem: Element) => {
      let href = elem.getAttribute("href");
      if (!href)
        return console.warn(
          "GamsJS - _onClickJumpToFixedNavAware: Found <a> without href assigned to it. Aborting operations. Given element was: ",
          elem
        );
      if (!href.includes("#")) return;

      let hashIndex = href.search("#");
      let hrefWithoutHash = href.substring(hashIndex + 1, href.length);

      EventRegister.onClick(elem, (evt: any) => {
        let curHref = elem.getAttribute("href");
        if (curHref) {
          let isInternal: boolean;
          try {
            isInternal = gamsUrlUtils.detectInternalHref(
              window.location,
              curHref
            );
          } catch (e) {
            console.warn(e);
            isInternal = false;
          }
          if (isInternal) {
            // prevents default auto-jump
            evt.preventDefault();
            // sets current url from client - updates hash value without auto scrolling!
            history.pushState({}, "", curHref);
            return jumpToIdFixedNavAware(
              hrefWithoutHash as string,
              scrollBehavior,
              nav
            );
          }
        }
      });
    });
  };

  /**
   * Fixes the hash jump --> if nav is fixed. Requires the elements that initiate the hash jump -via click event - as input-parameter.
   * Reads the href from the target elem -->  prevents default hash jump --> calcs the offset().top of the target elem --> takes nav-height into account
   * --> scrolls to pos. Also method can smooth scroll between a certain distance. --> Optional second parameter smoothDist_px --> needs px value as input.
   * e.g.
   * let myElems = document.querySelectorAll('a.myClass');
   * let smoothScrollDistance = 5000
   * gamsTemplateJs.fixHashjump(myElems, smoothScrollDistance)
   *
   * @param elems Elems that initiate the hash-jump.
   * @param smoothDist_px smooths the hashjump to a scrolling animation when inside given distance (clickedElem --> targetElem)
   */
  const jumpToIdFixedNavAware = (
    id: string,
    scrollBehavior: "auto" | "smooth" = "auto",
    nav: HTMLElement | null = document.querySelector("nav")
  ) => {
    if (!nav)
      throw new ReferenceError(
        `Can't find a <nav> on the page. Make sure to pass in a custom navigation-element when no <nav> is present on the current page.`
      );
    let target = document.getElementById(id);
    if (!target) throw new ReferenceError(`Can't find element with id: ${id}`);
    jumpToElemFixedNavAware(nav, target, scrollBehavior);
  };

  /**
   * Method 'repairs' the hashchange-jump if a navigation is fixed.
   * Takes the fixed navigation as input.
   * Reads the hash from the URL --> selects element via id selector --> calcs it's position (plain js)
   * --> after 1ms jumps to position.
   * because of the height calculation this method should be called AFTER the DOM is finished!
   * example Call:
   * let nav = document.querySelector("nav");
   * gamsTemplateJs.repairHashLoadJump(nav)
   *
   * @param nav
   */
  const jumpToHashFixedNavAware = (
    nav: HTMLElement | null | undefined = document.querySelector("nav")
  ): void => {
    if (!nav)
      throw new ReferenceError(
        `Can't acces the <nav> element. Aborting repairHashLoadJump at gamsTemplateJs.`
      );
    if (window.location.hash === "") return;
    if (!window.location.hash)
      return console.warn(
        "window.location.hash validated to false (but is not undefined)"
      );

    //select elem based on hash -> id selection.
    let hash = window.location.hash;
    hash = hash.substring(1, hash.length); //removes '#'
    let elem = document.getElementById(hash);
    if (!elem)
      throw new ReferenceError(
        `Can't repair the hash-jump onload. Unable to select the element which id corresponds to given hash: ${hash}.\n Make sure that the element to that should be "jumped to" is already rendered in the DOM at the moment jumptToHashFixedNavAware is called.`
      );
    //last initiate jump to element.
    jumpToElemFixedNavAware(nav, elem);
  };

  /**
   * Realigns fixed navigation-bar when a specific element should be aligned in user's scroll viewport, on load.
   * (otherwise the &lt;nav&gt; would hide the aligned element). Assigns the class "gamsJs--dom-alignedElem" to the "jumped on" element.
   * Internally registers the function on DOMContentLoaded and then calls jumpToHashFixedNavAware (inside _selectAndFixJumpFixedNavAware).
   * @param nav Nav to be taken into viewport-alignment calculation.
   */
  const alignHashNavAwareOnLoad = (nav: HTMLElement | null | undefined) => {
    EventRegister.onDomRendered(() => {
      try {
        return jumpToHashFixedNavAware(nav);
      } catch (e) {
        console.warn(
          "Something went wrong when trying to realign via alignHashNavAwareOnLoad."
        );
        console.warn(e);
      }
    });
  };

  /**
   * Realigns fixed navigation-bar when a specific element should be aligned in user's scroll viewport.
   * Called at DOMContentLoaded event.
   * (otherwise the <nav> would hide the aligned element)
   * Assigns the class "gamsJs--dom-alignedElem" to the "jumped on" element.
   * Internally registers the function on DOMContentLoaded and then calls jumpToHashFixedNavAware (inside _selectAndFixJumpFixedNavAware).
   * @param useClassSelection Controls if links should be auto-selected or via the class-selector ".gamsjs--dom-alignFixedNavLink".
   * Default is false.
   * @param scrollBehavior Controls the scroll-behavior. "Auto" is default and means "no-animation".
   * @param nav Optional parameter to pass in a specific nav element to the function. By default it would select the <nav> element.
   */
  const alignIdNavAwareOnClick = (
    useClassSelection: boolean = false,
    scrollBehavior: "auto" | "smooth" = "auto",
    nav: HTMLElement | null | undefined = undefined
  ) => {
    let alignLinkClassSelector = useClassSelection
      ? ".gamsjs--dom-alignFixedNavLink"
      : undefined; // if true selector tries these links later.
    EventRegister.onDomRendered(() => {
      // throws error when href is not valid.
      try {
        return _onClickJumpToFixedNavAware(
          nav,
          alignLinkClassSelector,
          scrollBehavior
        );
      } catch (e) {
        console.warn(e);
      }
    });
  };

  return {
    jumpToElemFixedNavAware,
    _onClickJumpToFixedNavAware,
    jumpToIdFixedNavAware,
    jumpToHashFixedNavAware,
    alignHashNavAwareOnLoad,
    alignIdNavAwareOnClick,
  };
})();

export default NavAligner;

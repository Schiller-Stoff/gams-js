
/**
 * Class to encapsulate / specify common events that 
 * projet workers need with GAMS development.
 */
const EventRegister = (() => {
  /**
   * Assings given callback function to the "DOMContentLoaded" event.
   * @param {function} callBack Any function be called. NEEDS to be given via returned Function call
   * or VIA BIND! like: .onDomRenderd(() => MYFUNCTION(ARGS));
   */
  const onDomRendered = (callBack: Function): void => {
    document.addEventListener("DOMContentLoaded", () => {
      callBack();
    });
  };

  /**
   * Assings given callback function to the "click" event.
   * @param {function} callBack Any function be called. NEEDS to be given via returned Function call
   * or VIA BIND! like: .onDomRenderd(() => MYFUNCTION(ARGS));
   */
  const onClick = (elem: Element, callBack: Function): void => {
    if (!elem) throw new ReferenceError("Given element is undefined.");
    elem.addEventListener("click", (evt) => {
      callBack(evt);
    });
  };

  return {
    onDomRendered,
    onClick,
  };
})();

export default EventRegister;

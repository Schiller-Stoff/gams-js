
/**
 * Handles general utilites concerning the navbar like,
 * assigning active classes to given <a> elements.
 * 
 */
const NavHandler = (() => {

  /**
   * Assigns the class "active" to the element with given id.
   * @param {string} id id of given element
   */
  const assignActiveClass = (id: string) => {
    let elem = document.querySelector(`#${id}`);
    if(!elem)throw new ReferenceError(`gamsJS: Cannot select element with given id: ${id}. Make sure to assign the id before the gamsJs method assignActiveClass is called.`);
    if(elem.classList.contains("active")){
      throw new TypeError(`gamsJs: Element with id: ${id} already has the class active assigned to it. Aborting operations`);
    }
    
    elem.classList.add('active');
    return elem;
  }


  return {
    assignActiveClass
  }

})();


export default NavHandler;
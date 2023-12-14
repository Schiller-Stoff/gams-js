

/**
 * Class handles operations that send a client to another page
 * except redirections.
 */
const Navigator = (() => {

  /**
   * Opens given address in a new tab or sends 
   * client to it.
   * @param url 
   */
  const navigateTo = (url: string, mode: "tab" | undefined = undefined) => {
    if(mode === "tab"){
      window.open(url,'_blank');
    } else {
      window.location.href = url;
    }    
  }


  return {
    navigateTo
  }

})();


export default Navigator;
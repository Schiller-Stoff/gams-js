import NavAligner from "./navUtils/NavAligner";
import EventRegister from "./eventUtils/EventRegister";
import NavHandler from "./navUtils/NavHandler";

const DOM = (() => {
  return {
    nav: NavAligner,
    EventRegister,
    NavHandler,
  };
})();

export default DOM;
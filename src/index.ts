/*
Allows modern features of javascript to be used
like async and await even in older Browsers.
*/
//import "core-js/stable";
import "regenerator-runtime/runtime";

/*
import of actual typescript code.
*/
import { gamsJs } from "./app/gamsJs";

/*
 writes constant to global window object.
*/
(window as any).gamsJs = gamsJs;

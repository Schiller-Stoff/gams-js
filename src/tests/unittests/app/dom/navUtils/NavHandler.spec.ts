import "jest";
import NavHandler from "app/dom/navUtils/NavHandler";
import { tearDown } from "tests/utils/testUtils";


describe("Unittests against NavHandler", () => {
    const DUMMY_ID = "test_id";
    describe("assignActiveClass", () => {
      describe("functional Tests", () => {
        it("should assign the class 'active' to element with given id", () => {
          
          let elem = document.createElement("p");
          elem.setAttribute("id", DUMMY_ID);
          document.body.appendChild(elem);
          let returned = NavHandler.assignActiveClass(DUMMY_ID);
          expect(elem).toStrictEqual(returned);
          expect(returned.getAttribute('class')).toBe('active');
          elem.remove();
        });
        afterEach(() => {
          tearDown();
        })
      });

      describe("inner implementation tests", () => {
        it("should throw a ReferenceError if no elem with given id was found", () => {
          expect(() => {
            NavHandler.assignActiveClass(DUMMY_ID);
          }).toThrow(ReferenceError);
        });

        it("should throw a TypeError if given element already contains the 'active' class", () => {
          let elem = document.createElement("p");
          elem.setAttribute("id", DUMMY_ID);
          elem.setAttribute("class", "active");
          document.body.appendChild(elem);
          expect(() => {
            NavHandler.assignActiveClass(DUMMY_ID);
          }).toThrow(TypeError);
          elem.remove();
        });

        afterEach(() => {
          tearDown();
        })

      });


    })
}); 

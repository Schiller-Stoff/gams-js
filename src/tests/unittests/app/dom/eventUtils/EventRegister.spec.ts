import "jest";
import { tearDown } from "../../../../utils/testUtils";
import EventRegister from "../../../../../app/dom/eventUtils/EventRegister";

describe("Unittests against the EventAssigner class", ()=>{

  describe("onDomRendered", () => {

      let addEventListenerMock: jest.SpyInstance<any>;
      
      beforeEach(() => {
          addEventListenerMock = jest.spyOn(document, "addEventListener").mockImplementation((evtName, callback)=>callback);
      });
      it("Calls the addEventListener method exactly once", () => {
          //when
          EventRegister.onDomRendered(()=>{});
          //then
          expect(addEventListenerMock).toBeCalledTimes(1);
      });
      afterEach(()=>{
          tearDown();
      });
  });

  describe("onClick", () => {
      let stubParagraph = document.createElement("p");
      let addEventListenerMock: jest.SpyInstance<any>;
      beforeEach(() => {
          addEventListenerMock = jest.spyOn(stubParagraph, "addEventListener").mockImplementation((evtName, callback)=>callback);
      });
      it("Throws an ReferenceError if given elem is undefined", () => {
          //given
          //when + then
          expect(() => {
            EventRegister.onClick(undefined as any, () => {});
          }).toThrow(ReferenceError);
      });
      it("Calls the addEventListener method exactly once", () => {
          //given
          //when
          EventRegister.onClick(stubParagraph, () => {});
          //then
          expect(addEventListenerMock).toBeCalledTimes(1);
      });
      afterEach(()=>{
          tearDown();
      });
  });
});
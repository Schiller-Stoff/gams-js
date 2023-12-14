
import "jest";
import NavAligner from "../../../../../app/dom/navUtils/NavAligner";
import EventRegister from "../../../../../app/dom/eventUtils/EventRegister";
import { tearDown } from "../../../../utils/testUtils";

describe("unittests against the NavAligner",()=>{

  describe("jumpToHashFixedNavAware()", () => {

    let windowScrollToMock: jest.SpyInstance<any>;
    let locationGetterMock: jest.SpyInstance<any>;
    let stubParagraph: HTMLParagraphElement;
    let mockIdSelector: jest.SpyInstance<any>;
    let mockConsoleWarn: jest.SpyInstance<any>;
    let stubNav: HTMLElement;

    beforeEach(()=>{
      windowScrollToMock = jest.spyOn(window, "scrollTo");
      locationGetterMock = jest.spyOn(window, "location", "get");
      stubParagraph = document.createElement("p");
      mockIdSelector = jest.spyOn(document, "getElementById");
      mockConsoleWarn = jest.spyOn(console, "warn").mockImplementation(()=>undefined);
      stubNav = document.createElement("nav");
      stubParagraph = document.createElement("p");
    });

    it("Throws an Error if given parameter is null", () => {
      let badNavSelection = null;
      try {
        NavAligner.jumpToHashFixedNavAware(badNavSelection as any);
        fail();
      } catch (e) {}
    });

    it("Should call console.warn once when window.location.has is undefined", () => {
      //given
      locationGetterMock.mockImplementation(() => {
        return {
          hash:undefined as any
        } as Location
      });
      //when
      NavAligner.jumpToHashFixedNavAware(stubNav);
      //then
      expect(mockConsoleWarn).toBeCalledTimes(1);
    });

    it("window.scrollTo() is not called when empty hash value was detected in window.location.hash.", () => {
      windowScrollToMock.mockImplementation(()=>{});
      locationGetterMock.mockImplementation(() => {
        return {
          hash:""
        } as Location
      });
      // returns when no hash detected.
      expect(windowScrollToMock).toBeCalledTimes(0);
      
    });

    it("window.scrollTo() is called once when a hash value was detected in window.location.hash and ", ()=>{
      //given: first mock
      windowScrollToMock.mockImplementation(()=>{});
      mockIdSelector.mockImplementation(()=>stubParagraph);
      locationGetterMock.mockImplementation(() => {
        return {
          hash:"#nice"
        } as Location
      });

      // gamsTemplate uses setTimeout -> needs to mocked and "spanned around" by jest 
      // fake timer capabilities. 
      jest.useFakeTimers();
      NavAligner.jumpToHashFixedNavAware({} as any);
      jest.runAllTimers();
      expect(windowScrollToMock).toBeCalledTimes(1);
    });

    it("Function calls window.scrollTo once inside intern jumpToElemFixedNavAware() call.", ()=>{
      // GIVEN
      windowScrollToMock.mockImplementation(()=>{});
      mockIdSelector.mockImplementation(()=>stubParagraph);
      locationGetterMock.mockImplementation(() => {
        return {
          hash:"#nice"
        } as Location
      });

      //WHEN
      // gamsTemplate uses setTimeout -> needs to mocked and "spanned around" by jest 
      // fake timer capabilities. 
      jest.useFakeTimers();
      NavAligner.jumpToHashFixedNavAware(stubNav);
      jest.runAllTimers();

      //THEN
      expect(windowScrollToMock).toBeCalledTimes(1);
    });

    afterEach(()=>{
      tearDown();
    });
  });

  describe("jumpToElemFixedNavAware()", () => {

    let windowScrollToMock: jest.SpyInstance<any>;
    let stubParagraph: HTMLParagraphElement;
    let mockIdSelector: jest.SpyInstance<any>;

    beforeEach(()=>{
      windowScrollToMock = jest.spyOn(window, "scrollTo");
      stubParagraph = document.createElement("p");
      mockIdSelector = jest.spyOn(document, "getElementById");
    });

    it("Function calls window.scrollTo({top:EXPECTED}, behavior:'auto') with expected mocked top value of mock-element and mock-nav.", () => {

      // GIVEN
      windowScrollToMock.mockImplementation(()=>{});
      mockIdSelector.mockImplementation(()=>stubParagraph);
      // position values
      let stubParagraphClientTop = 25;
      let stubNavHeight = 10;
      let expectedTop = stubParagraphClientTop - stubNavHeight; // value to be expected.
      // getBoundingClientRect return mock-top
      jest.spyOn(stubParagraph,"getBoundingClientRect").mockImplementation(() => {
        return {top:stubParagraphClientTop} as any
      });
      //create mock nav.
      let stubNav = document.createElement("nav");
      jest.spyOn(stubNav, "offsetHeight", "get").mockImplementation(()=>stubNavHeight);

      //WHEN
      // gamsTemplate uses setTimeout -> needs to mocked and "spanned around" by jest 
      // fake timer capabilities. 
      jest.useFakeTimers();
      NavAligner.jumpToElemFixedNavAware(stubNav, stubParagraph);
      jest.runAllTimers();

      expect(windowScrollToMock).toBeCalledWith({top:expectedTop, behavior: "auto"});

    });

    afterAll(()=>{
      tearDown();
    })

  });

  describe("jumpToIdFixedNavAware", () => {

    let getElemByIdMock: jest.SpyInstance<any>;
    let mockQuerySelector: jest.SpyInstance<any>;
    let mockJumpToElemFixedNavAware: jest.SpyInstance<any>;

    let stubJumpTarget: HTMLParagraphElement;
    let stubId = "test";
    let mockNav: HTMLElement;
    let mockNavInnerHtml = "test";
    let stubScrollBehavior: "auto" | "smooth" = "auto"
    
    beforeEach(()=>{
      //creating spies.
      getElemByIdMock = jest.spyOn(document, "getElementById");
      mockQuerySelector = jest.spyOn(document, "querySelector");
      mockJumpToElemFixedNavAware = jest.spyOn(NavAligner, "jumpToElemFixedNavAware").mockImplementation(()=>null); 

      //creating stubs
      stubJumpTarget = document.createElement("p");
      mockNav = document.createElement("nav");
      mockNav.innerHTML = mockNavInnerHtml;
    })

    it("Should throw an refernce error if nav is undefined.", () => {
      mockNav = undefined as any;
      expect(() => {
        NavAligner.jumpToIdFixedNavAware(stubId, stubScrollBehavior, mockNav)}
      ).toThrow(ReferenceError);
    })

    it("Should select the <nav> by itself when not given as param, via calling document.querySelector('nav')", () => {
      mockQuerySelector.mockImplementation(()=>mockNav);
      //catch following errors.
      try {
        NavAligner.jumpToIdFixedNavAware(stubId);
      fail();
      } catch(e){
      }
      expect(mockQuerySelector).nthCalledWith(1, "nav");
    });

    it("Should throw an reference error if nav is not selectable", () => {
      // default called query selector returns null.
      mockQuerySelector.mockImplementation(() => null);
      expect(()=>{
        NavAligner.jumpToIdFixedNavAware(stubId);
      }).toThrow(ReferenceError);
    });

    it.skip("Should call jumpToIdFixedNavAware exactly once when every possible exeption is caught via mocks.", () => {
      //given
      mockQuerySelector.mockImplementation(()=>mockNav);
      getElemByIdMock.mockImplementation(()=>stubJumpTarget);

      //when
      NavAligner.jumpToIdFixedNavAware(stubId);

      //then
      expect(mockJumpToElemFixedNavAware).toBeCalledTimes(1);
    });

    afterEach(()=>{
      tearDown();
    });

  });

  describe("alignIdNavAwareOnClick", () => {

    let stubNav: HTMLElement | null;
    let stubClassName = "repair";
    let stubScrollBehavior: "auto" | "smooth" = "auto";

    let querySelectorMock: jest.SpyInstance<any>;
    let querySelectorAllMock: jest.SpyInstance<any>;
    let onDomRenderedMock: jest.SpyInstance<any>;
    let onClickJumpToFixedNavAwareMock: jest.SpyInstance<any>;

    beforeEach(()=>{
      stubNav = document.createElement("nav");
      stubNav.innerHTML = "test";

      querySelectorMock = jest.spyOn(document, "querySelector");
      querySelectorAllMock = jest.spyOn(document, "querySelectorAll");
      onDomRenderedMock = jest.spyOn(EventRegister, "onDomRendered");
      onClickJumpToFixedNavAwareMock = jest.spyOn(NavAligner, "_onClickJumpToFixedNavAware");
      onClickJumpToFixedNavAwareMock.mockImplementation(() => true);

    });

    it("Throws a Reference Error if given nav is null with different parameter constellations.", () => {
      //given
      stubNav = null
      //then + when
      expect(()=>{
        NavAligner.alignIdNavAwareOnClick(false, stubScrollBehavior, stubNav);
        //in test-dom <nav> is not defined.
        NavAligner.alignIdNavAwareOnClick(true);
        NavAligner.alignIdNavAwareOnClick();
      });
    });

    it("Throws no Reference Error when <nav> is undefined. Auto selection of <nav> is not handled here (<nav> might not be rendered).", ()=>{
      //given
      querySelectorMock.mockImplementation(()=>undefined);
      //when + then
      NavAligner.alignIdNavAwareOnClick(false, "auto", undefined);
    });

    it("Calls onDomRendered once in normal behavior.", () => {
      //given (done in setup)
      //when
      NavAligner.alignIdNavAwareOnClick(false, stubScrollBehavior, stubNav);
      //then
      expect(onDomRenderedMock).toBeCalledTimes(1);
    });

    it.skip("should call _onClickJumptToFixedNavedAware one time with expeceted parameters, when onDomRendered is mocked to directly call it's callback given as parameter.", () => {
      //given (done in setup)
      onDomRenderedMock.mockImplementation((callback)=>callback());
      //when
      NavAligner.alignIdNavAwareOnClick(false, stubScrollBehavior, stubNav);
      //then
      expect(NavAligner._onClickJumpToFixedNavAware).toBeCalledTimes(1);
      expect(NavAligner._onClickJumpToFixedNavAware).toBeCalledWith(stubNav, undefined, stubScrollBehavior);
    });

    afterEach(()=>{
      tearDown();
    })
    
  });

  describe("_onClickJumpToFixedNavAware", () => {

    let stubClassName = `test`;
    let stubElemArray = [document.createElement("a"), document.createElement("a")];
    let stubScrollBehavior: 'auto' | 'smooth' = 'auto';
    let stubNav: HTMLElement;
    let stubA1: HTMLAnchorElement;
    let stubA2: HTMLAnchorElement;
    let stubElemCollection: HTMLElement[];

    let querySelectorAllMock: jest.SpyInstance<any>;
    let jumpToIdFixedNavAwareSpy: jest.SpyInstance<any>;
    let registerOnClickMock: jest.SpyInstance<any>;
    
    
    beforeEach(() => {
      stubNav = document.createElement("nav");
      stubA1 = document.createElement("a");
      stubA1.setAttribute("href", "http://example.com#123");
      stubA2 = document.createElement("a");
      stubA2.setAttribute("href", "http://example.com#444");
      stubElemCollection = [stubA1, stubA2];

      querySelectorAllMock = jest.spyOn(document, "querySelectorAll").mockImplementation(() => stubElemCollection as any);
      jumpToIdFixedNavAwareSpy = jest.spyOn(NavAligner, "jumpToIdFixedNavAware").mockImplementation(()=>{});
      registerOnClickMock = jest.spyOn(EventRegister, "onClick").mockImplementation((elem, callback: any)=>{
        callback();
        return elem;
      });  //mock returns object with params inside.
    });

    it("Should throw an ReferenceError when querySelectorAll returns an empty array. (simulates querySelectorAll doesn't find anything)", () => {
      //given
      querySelectorAllMock.mockImplementationOnce(()=>[]);
      //let elems = document.querySelectorAll("a"); //will return [] because of mock.
      //when + then
      expect(()=>{
        NavAligner._onClickJumpToFixedNavAware(stubNav, undefined, stubScrollBehavior);
        NavAligner._onClickJumpToFixedNavAware(stubNav, ".my-class", stubScrollBehavior);
      }).toThrow(ReferenceError);
    });

    it("Should throw an ReferenceError when given an undefined nav.", () => {
      //given
      querySelectorAllMock.mockImplementationOnce(() => stubElemArray);
      stubNav = undefined as any;
      //when + then
      expect(()=>{
        NavAligner._onClickJumpToFixedNavAware(stubNav, undefined, stubScrollBehavior);
      }).toThrow(ReferenceError);
    });

    it("Should call console.warn once when one of the selected elements has no href assigned to it", () => {
      //given
      stubA1.setAttribute("href", "");
      let consoleWarnMock: jest.SpyInstance = jest.spyOn(console, 'warn').mockImplementation( () => undefined);
      
      //when + then
      NavAligner._onClickJumpToFixedNavAware(stubNav, undefined, stubScrollBehavior)
      expect(consoleWarnMock).toBeCalledTimes(1);
    });

    it("Should return when one of the selected elements has only '#' as href value.",() => {

      stubA1.setAttribute("href", "#");
      let consoleWarnMock: jest.SpyInstance = jest.spyOn(console, 'warn').mockImplementation( () => undefined);
      
      //when + then
      let expUndefined = NavAligner._onClickJumpToFixedNavAware(stubNav, undefined, stubScrollBehavior)
      expect(consoleWarnMock).toBeCalledTimes(1);

      // should return undefined because of mock
      expect(expUndefined).toBe(undefined);

    });

    it("Should call EventRegister.onclick() as often as elements inside found element collection (through querySelectorAll)", () => {
        //given: everything setup.
        let expCallCount = stubElemCollection.length;
        //when
        NavAligner._onClickJumpToFixedNavAware(stubNav, undefined, stubScrollBehavior);
        //then
        expect(registerOnClickMock).toBeCalledTimes(expCallCount);
    });

    afterEach(()=>{
      tearDown();
    });

  });

  describe("alignHashNavAwareOnLoad", () => {

    let onDomRenderedMock: jest.SpyInstance<any>;
    let jumpToHashFixedNavAwareMock: jest.SpyInstance<any>;
    let stubNav = document.createElement("nav");
    
    beforeEach(()=>{
      onDomRenderedMock = jest.spyOn(EventRegister,"onDomRendered").mockImplementation(()=>()=>true);
      jumpToHashFixedNavAwareMock = jest.spyOn(NavAligner,"jumpToHashFixedNavAware").mockImplementation(()=>true);
    })

    it("Should call onDomRendered exactly once.", () => {
      NavAligner.alignHashNavAwareOnLoad(stubNav);
      expect(onDomRenderedMock).toBeCalledTimes(1);
    });

    it("Should not call jumpToHashFixedNavAware because it is assigned to an event listener.", () => {
      NavAligner.alignHashNavAwareOnLoad(stubNav);
      expect(jumpToHashFixedNavAwareMock).toBeCalledTimes(0);
    })

    afterEach(()=>{
      tearDown();
    });

  });
});
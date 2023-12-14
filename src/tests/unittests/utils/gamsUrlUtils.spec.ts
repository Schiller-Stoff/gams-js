import "jest";
import { tearDown } from "../../utils/testUtils";
import {gamsUrlUtils} from "../../../utils/gamsUrlUtils";


describe("Unittests against gamsUrlUtils", () => {

  let locationGetterMock: jest.SpyInstance<any>;

  describe("detectInternalHref()", () => {

    beforeEach(()=>{
      locationGetterMock = jest.spyOn(window, "location", "get");
    })

    it("Should return false when no '#' is in the given href", () => {
      //when
      let noHashHref = "https://example.com";
      let isInternal =  gamsUrlUtils.detectInternalHref(window.location, noHashHref);
      //then
      expect(isInternal).toBe(false);
    });

    it("Should return true when just linked to id on same page via '#myId' in href.", () => {
      let hashHref = "#example01";
      let isInternal =  gamsUrlUtils.detectInternalHref(window.location, hashHref);
      //then
      expect(isInternal).toBe(true);
    });

    it("Should throw a TypeError if given hrefValue is just '#'", () => {
      //when
      let hashHref = "#";
      //then
      expect( () => {
        gamsUrlUtils.detectInternalHref(window.location, hashHref)
      }).toThrow(TypeError);
    });

    it("Should throw a TypError if given hrefValue is an empty string", () => {
      let emptyHref = "";
      //then
      expect( () => {
        gamsUrlUtils.detectInternalHref(window.location, emptyHref)
      }).toThrow(TypeError);  
    });

    it('Should return false if given href value starts with "/"', () => {
      //when
      let slashHref = "/path";
      let isInternal =  gamsUrlUtils.detectInternalHref(window.location, slashHref);
      //then
      expect(isInternal).toBe(false);
    });

    it("Should return true if href Value contains '#' and the current pathname.", () => {
      //when
      let hostMock = "example.com"
      let pathNameMock = "/test";
      let currentHrefMock = `https://${hostMock}${pathNameMock}`;
      let currentLocMock = {href: currentHrefMock, pathname: pathNameMock, host: hostMock, search:""};
      let internHrefMock = `${currentHrefMock}#example01`;

      locationGetterMock.mockImplementation(()=>currentLocMock);
      let isInternal =  gamsUrlUtils.detectInternalHref(window.location, internHrefMock);

      //then 
      expect(isInternal).toBe(true);
    });

    it("Should return false if href Value contains '#', means a link on same server but a different resource (different pathname).", () => {
      //when
      let hostMock = "example.com"
      let pathNameMock = "/test";
      let currentHrefMock = `https://${hostMock}${pathNameMock}`;
      let currentLocMock = {href: currentHrefMock, pathname: pathNameMock, host: hostMock};
      let internHrefMock = `https://${hostMock}/differentPath#example01`;

      locationGetterMock.mockImplementationOnce(()=>currentLocMock);
      let isInternal =  gamsUrlUtils.detectInternalHref(window.location, internHrefMock);

      //then
      expect(isInternal).toBe(false);
    });


    it("Should return false if '#' in href, same server, location.pathname is empty and href leads to different resource.", () => {

      //when
      let hostMock = "example.com"
      let pathNameMock = "";
      let currentHrefMock = `https://${hostMock}${pathNameMock}`;
      let currentLocMock = {href: currentHrefMock, pathname: pathNameMock, host: hostMock};
      let internHrefMock = `https://${hostMock}${pathNameMock}/anotherPath#example01`;

      locationGetterMock.mockImplementationOnce(()=>currentLocMock);
      let isInternal =  gamsUrlUtils.detectInternalHref(window.location, internHrefMock);

      //then
      expect(isInternal).toBe(false);

    });

    //it("Should return true if '#' in href, same server, location.pathname is empty and BUT  ")

    afterEach(()=>{
      tearDown();
    });

  });


});



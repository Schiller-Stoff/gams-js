import "jest";
import { tearDown } from "../../../utils/testUtils";
import utils from "../../../../app/utils/index";

describe("Tests against utils", () => {
  describe("groupBy", () => {
    const input = {
      cities: {
        state: [
          {
            name: "Alabama",
            city: "Abbeville",
            number: "1",
          },
          {
            name: "Alabama",
            city: "Adamsville",
            number: "1",
          },
          {
            name: "Alabama",
            city: "Addison",
            number: "1",
          },
          {
            name: "Alabama",
            city: "Akron",
            number: "2",
          },
          {
            name: "Missouri",
            city: "Jefferson City",
            number: "1",
          },
          {
            name: "Missouri",
            city: "Columbia",
            number: "2",
          },
          {
            name: "Kansas",
            city: "Manhattan",
            number: "1",
          },
          {
            name: "Kansas",
            city: "Topeka",
            number: "2",
          },
        ],
      },
    };
    const expResult = {
      Alabama: {
        name: ["Alabama", "Alabama", "Alabama", "Alabama"],
        city: ["Abbeville", "Adamsville", "Addison", "Akron"],
        number: ["1", "1", "1", "2"],
      },
      Missouri: {
        name: ["Missouri", "Missouri"],
        city: ["Jefferson City", "Columbia"],
        number: ["1", "2"],
      },
      Kansas: {
        name: ["Kansas", "Kansas"],
        city: ["Manhattan", "Topeka"],
        number: ["1", "2"],
      },
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Returns the expected object from given array", () => { 
      let result = utils.groupBy(input.cities.state, "name");
      expect(result).toMatchObject(expResult);
    });

    afterEach(() => {
      tearDown();
    });
  });

  describe("copyTextToClipboard", () => {

    let dummyCopyText = "Nicely done!";
    let execCommandMock: jest.SpyInstance<any>;

    beforeEach(() => {
      jest.clearAllMocks();
      
      execCommandMock = jest.fn(() => true);
      //@ts-ignore
      document.execCommand = execCommandMock;
      
    });

    it("should call document.execCommand('copy') exactly once", () => {
      //given
      
      //when
      utils.copyTextToClipboard(dummyCopyText);
      //then
      expect(execCommandMock).toHaveBeenCalledWith('copy');
      //@ts-ignore
      document.execCommand = undefined;
    });

    it("should call document.body.appendChild -  a textarea element with the text-to-copy as text value", () => {
      //given
      let appendChildMock: jest.SpyInstance<any>;
      jest.spyOn(document.body, "removeChild").mockImplementationOnce(() => undefined as any);

      let textarea: Node | undefined = undefined
      appendChildMock = jest.spyOn(document.body, "appendChild")
        .mockImplementationOnce(el => {
          return textarea = el;
        });
      //when
      utils.copyTextToClipboard(dummyCopyText);
      //then
      //@ts-ignore
      expect(textarea.value).toBe(dummyCopyText);

    });

    afterEach(() => {
      tearDown();
    });

  });


  describe("copyClick", () => {

    const FAIL_SOURCE_ID = "FAIL_SOURCE_ID";
    const FAIL_TARGET_ID = "FAIL_TARGET_ID";

    const VALID_SOURCE_ID = "VALID_SOURCE_ID";
    const VALID_TARGET_ID = "VALID_TARGET_ID";

    let source_elem: HTMLElement | undefined = undefined
    let target_elem: HTMLElement | undefined = undefined

    beforeEach(() => {
      jest.clearAllMocks();

      source_elem = document.createElement("button")
      source_elem.setAttribute("id",VALID_SOURCE_ID);
      target_elem = document.createElement("p");
      target_elem.setAttribute("id",VALID_TARGET_ID);

      document.body.appendChild(source_elem);
      document.body.appendChild(target_elem);
    });


    it("should call console.error exactly once if no source element with given id was found", () => {
      //given
      let consErrMock = jest.spyOn(console, "error").mockReturnValueOnce((() => undefined) as any);
      //when
      utils.copyClick(FAIL_SOURCE_ID, FAIL_TARGET_ID);
      //then
      expect(consErrMock).toBeCalledTimes(1);
    });


    it("should call console.error if no target element with given id was found, with expected error msg", () => {
      //given
      let consErrMock = jest.spyOn(console, "error").mockReturnValueOnce((() => undefined) as any);
      //when
      utils.copyClick(VALID_SOURCE_ID, FAIL_TARGET_ID);
      //then
      expect(consErrMock).toBeCalledWith(`GamsJs - copyClick: Could not select target element with class selector: ${FAIL_TARGET_ID}.`);
    });

    it.skip('should call addEventListener with click as first parameter exactly once', () => {
      //given
      let consErrMock = jest.spyOn(console, "error").mockImplementationOnce((() => undefined) as any);
      if(!source_elem)return;
      let evtListenerMock = jest.fn(() => undefined);
      source_elem.addEventListener = evtListenerMock;
      //when
      utils.copyClick(VALID_SOURCE_ID, VALID_TARGET_ID);
      //then
      expect(consErrMock).toBeCalledTimes(0);
      expect(evtListenerMock).toBeCalledTimes(1);
    });

    afterEach(() => {
      tearDown();
    });


  });
});

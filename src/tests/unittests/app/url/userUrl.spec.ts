import "jest";
import { userUrl } from "../../../../app/url/userUrl";
import { tearDown } from "../../../utils/testUtils";

describe("Tests against userUrl", () => {

  describe("demandHttps()", () => {
    let locationGetterMock: jest.SpyInstance<Location, []>;
    let confirmMock: jest.SpyInstance<boolean, any>;
    let consoleWarnMock: jest.SpyInstance<any>;

    beforeAll(() => {
      consoleWarnMock = jest.spyOn(console, "warn").mockImplementation(()=>{});
      locationGetterMock = jest.spyOn(window, "location", "get");
      confirmMock = jest
        .spyOn(window, "confirm")
        .mockImplementation(() => true);
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("When the protocol is http the window.location getter is called two times and .confirm() excatly once.", () => {
      locationGetterMock.mockImplementation(() => {
        return {
          protocol: "http:",
          href: "http://gams.uni-graz.at"
        } as Location;
      });
      userUrl.demandHttps();
      expect(locationGetterMock).toBeCalledTimes(2);
      expect(confirmMock).toBeCalledTimes(1);
    });

    it("When the protocol is https the window.location getter is just called 1 and confirm 0 times.", () => {
      locationGetterMock.mockImplementation(() => {
        return {
          protocol: "https:",
          href: "http://gams.uni-graz.at"
        } as Location;
      });
      userUrl.demandHttps();
      expect(locationGetterMock).toBeCalledTimes(1);
      expect(confirmMock).toBeCalledTimes(0);
    });
    it("When a display text was given, confirm is called with the expected text.", () => {
      let mockDisplayText = "bla"
      locationGetterMock.mockImplementation(() => {
        return {
          protocol: "http:",
          href: "http://gams.uni-graz.at/locale=de"
        } as Location;
      });
      userUrl.demandHttps(mockDisplayText);
      expect(confirmMock).toBeCalledWith(mockDisplayText);
    });
    afterAll(() => {
      tearDown();
    });
  });



});
import "jest";
import Navigator from "app/url/Navigator";
import { tearDown } from "tests/utils/testUtils";
import lodash from "lodash";


describe("Unittests against Navigator", () => {

  describe("navigateTo",()=>{

    const DUMMY_URL =
    "http://glossa.uni-graz.at/archive/objects/query:derla.oneperson/methods/sdef:Query/get?params=$1|<https://gams.uni-graz.at/o:derla.data#victim_26>";

    describe("Whitebox tests", () => {

      it("should call window.open when mode was set to tab. Parameter should be as expected.", () => {
        //given
        let winOpenSpy = jest.spyOn(window, "open");
        let exp = "";
        //@ts-ignore
        winOpenSpy.mockImplementationOnce(url => exp = url);
        //when
        Navigator.navigateTo(DUMMY_URL, "tab");
        //then
        expect(exp).toBe(DUMMY_URL);
        expect(winOpenSpy).toBeCalledTimes(1);
      });

      it("should not call window.open when no mode param was given", () => {
        //given
        let winOpenSpy = jest.spyOn(window, "open");
        // supress console error from jest 
        jest.spyOn(console, "error").mockImplementationOnce(()=>undefined);
        //when
        Navigator.navigateTo(DUMMY_URL);
        //then
        expect(winOpenSpy).toBeCalledTimes(0);
      });

      afterEach(() => {
        tearDown();
      })

    });

  });

  



});

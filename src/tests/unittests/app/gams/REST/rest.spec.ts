import "jest";
import gamsRest from "../../../../../app/gams/REST/GamsREST";
import { tearDown } from "../../../../utils/testUtils";


describe("unittests against gamsRest", () => {

  describe(`detectLocaleLang()`, () => {
    let localeParam = "es";
    let exampleUrl = `https://gams.uni-graz.at/locale=${localeParam}`;
    let consWarnSpy: jest.SpyInstance<any>;

    beforeEach(() => {
      consWarnSpy = jest.spyOn(console, "warn").mockImplementation(()=>{});
    });

    it(`Returns 'es' at given url: ${exampleUrl}. console.warn() is not even called once.`, () => {
      let result = gamsRest.detectLocaleLang(exampleUrl);
      expect(result).toEqual("es");
      expect(consWarnSpy).toBeCalledTimes(0);
    });

    it("console.warn() called once when an unusual language code was detected inside the two following characters (locale rest parameter)", () => {
      let unusualParam = "rus";
      gamsRest.detectLocaleLang(
        `https://gams.uni-graz.at/locale=${unusualParam}`
      );
      expect(consWarnSpy).toBeCalledTimes(1);
    });

    afterEach(() => {
      tearDown();
    });
  });



});
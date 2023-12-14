import "jest";
import Redirector from "app/url/Redirector";
import { tearDown } from "tests/utils/testUtils";
import lodash from "lodash";

describe("Unittests against Redirector", () => {
  const DUMMY_URL =
    "http://glossa.uni-graz.at/archive/objects/query:derla.oneperson/methods/sdef:Query/get?params=$1|<https://gams.uni-graz.at/o:derla.data#victim_26>";

  describe("redirectTo", () => {
    describe("functional tests", () => {
      it("should call window.location.replace with expected url", () => {
        let exp = "";
        let windowLocationCopy = lodash.cloneDeep(window.location);
        //@ts-ignore
        delete window.location;
        //@ts-ignore
        window.location = {
          replace: (url) => (exp = url),
        };
        Redirector.redirectTo(DUMMY_URL);
        expect(exp).toBe(new URL(DUMMY_URL).toString());
        window.location = windowLocationCopy;
      });

      afterEach(() => {
        tearDown();
      });
    });
  });


  describe("hashQueryRedirect", () => {
    describe("functional / behavioral tests", () => {
      it("calls intern redirectTo method with hash-built url", () => {

        let called = ""
        jest.spyOn(Redirector, "redirectTo").mockImplementation(url => called = url);

        //@ts-ignore
        delete window.location;
        //@ts-ignore
        window.location = {
          hash: "#testHash",
          replace: () => undefined
        };

        Redirector.hashQueryRedirect("http://glossa.uni-graz.at/archive/objects/query:derla.oneperson/methods/sdef:Query/get", "$1");

        expect(called).toBe("http://glossa.uni-graz.at/archive/objects/query:derla.oneperson/methods/sdef:Query/get" + "?params=%241%7CtestHash");

      });
    });
  });

});

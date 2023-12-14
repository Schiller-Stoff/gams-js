import "jest";
import GAMSUrl from "app/gams/REST/GAMSUrl";
import { tearDown } from "tests/utils/testUtils";

describe("Unittests against GAMSURl", () => {
  const DUMMY_PID = "context:test";
  const STUB_URL = `https://gams.uni-graz.at/${DUMMY_PID}/sdef:TEI/get`;
  const STUB_GAMS_URL_ARCHIVE = `/archive/objects/${DUMMY_PID}/sdef:TEI/get`;
  const STUB_URL_MALFORMED = "ht9213j";
  const STUB_NO_GAMS_URL = "https://google.com";
  const SDEF_TEST_DATA = [
    [
      "http://glossa.uni-graz.at/archive/objects/o:derla.vor5/methods/sdef:TEI/get?mode=&locale=de",
      "sdef:TEI",
    ],
    [
      "http://gams.uni-graz.at/archive/objects/query:grotefend.kalenderall/methods/sdef:Query/get",
      "sdef:Query",
    ],
    ["http://glossa.uni-graz.at/o:kfug.3", ""],
    [
      "http://glossa.uni-graz.at/archive/objects/container:lge-aggasiz/methods/sdef:Context/get?locale=de&mode=person",
      "sdef:Context",
    ],
    [
      "http://gams.uni-graz.at/archive/objects/context:htx/methods/sdef:Context/get?mode=advanced_search",
      "sdef:Context",
    ],
    [
      "http://gams.uni-graz.at/query:htx.search-structured?params=%241%7C%3Ftext%20bds%3Asearch%20%22asd%22%20%3B%20bds%3AmatchAllTerms%20true%20.%3B%242%7C%20keywords%3Dasd",
      "",
    ],
  ];
  const PID_PATHNAME_TEST_DATA = [
    ["/archive/objects/o:derla.vor5/methods/sdef:TEI/get", "o:derla.vor5"],
    ["/context:wiesinger", "context:wiesinger"],
    [
      "/archive/objects/query:grotefend.kalenderall/methods/sdef:Query/get",
      "query:grotefend.kalenderall",
    ],
    [
      "/archive/objects/container:lge-aggasiz/methods/sdef:Context/get",
      "container:lge-aggasiz",
    ],
    ["/archive/objects/context:via/methods/sdef:Context/get", "context:via"],
    [
      "/archive/objects/o:santonino.itinerar.2/methods/sdef:TEI/get",
      "o:santonino.itinerar.2",
    ],
    ["/o:kfug.3", "o:kfug.3"],
    ["/archive/objects/o:kfug.1/methods/sdef:TEI/get", "o:kfug.1"],
    ["/query:htx.map", "query:htx.map"],
    ["/query:htx.search-structured", "query:htx.search-structured"],
    ["/context:lima", "context:lima"],
  ];
  const PARAM_TEST_DATA = [
    [
      "$1",
      "<https://gams.uni-graz.at/o:derla.data#victim_23>",
      "?params=%241%7C%3Chttps%3A%2F%2Fgams.uni-graz.at%2Fo%3Aderla.data%23victim_23%3E",
    ],
    ["$23", "asdasddd", "?params=%2423%7Casdasddd"],
    [
      "$4",
      "<myName____isBRIAN><<>>!§'''''.,d-",
      "?params=%244%7C%3CmyName____isBRIAN%3E%3C%3C%3E%3E%21%C2%A7%27%27%27%27%27.%2Cd-",
    ],
  ];
  const MULTI_PARAM_TEST_DATA = [
    [
      {
        $1: "<https://gams.uni-graz.at/o:derla.data#victim_23>",
        $2: "<https://gams.uni-graz.at/o:derla.data#victim_23>",
      },
      "?params=%241%7C%3Chttps%3A%2F%2Fgams.uni-graz.at%2Fo%3Aderla.data%23victim_23%3E%3B%242%7C%3Chttps%3A%2F%2Fgams.uni-graz.at%2Fo%3Aderla.data%23victim_23%3E",
    ],
    [
      {
        $44: "<http://glossa.uni-graz.at/o:ontology.persons#TomSawyer>",
        $532: "<http://glossa.uni-graz.at/o:ontology.places#stepanakert>",
      },
      "?params=%2444%7C%3Chttp%3A%2F%2Fglossa.uni-graz.at%2Fo%3Aontology.persons%23TomSawyer%3E%3B%24532%7C%3Chttp%3A%2F%2Fglossa.uni-graz.at%2Fo%3Aontology.places%23stepanakert%3E",
    ],
    [
      {
        $45: "filz",
        $12: "kafoffel",
        $4: "perch",
        $42: "<https://wikidata/Q12323123>",
        $45254: "niche",
      },
      "?params=%2445%7Cfilz%3B%2412%7Ckafoffel%3B%244%7Cperch%3B%2442%7C%3Chttps%3A%2F%2Fwikidata%2FQ12323123%3E%3B%2445254%7Cniche",
    ],
    [
      {
        $peter: "gerhard",
        $35: "<<<<<lkmasdp;;;sadsd>>",
        $6: "MY_SAMMPLE_VALUE",
      },
      "?params=%24peter%7Cgerhard%3B%2435%7C%3C%3C%3C%3C%3Clkmasdp%3B%3B%3Bsadsd%3E%3E%3B%246%7CMY_SAMMPLE_VALUE",
    ],
    [
      {
        $1: "<https://gams.uni-graz.at/o:szd.personen#SZDPER.4>",
        $2: "de",
      },
      "?params=%241%7C%3Chttps%3A%2F%2Fgams.uni-graz.at%2Fo%3Aszd.personen%23SZDPER.4%3E%3B%242%7Cde",
    ],
  ];

  describe("Constructor tests", () => {
    let getLocationMock: jest.SpyInstance<any>;
    const STUB_LOCATION = {
      href: STUB_URL,
    };

    beforeEach(() => {
      getLocationMock = jest.spyOn(window, "location", "get");
      //suppress console error in test.
      jest.spyOn(console, "error").mockImplementation(() => undefined);
    });

    it("should not crash when a correct url is passed in.", () => {
      new GAMSUrl(STUB_URL);
    });

    it("should crash when a malformed url was given", () => {
      expect(() => {
        new GAMSUrl(STUB_URL_MALFORMED);
      }).toThrow();
    });

    it("should throw when no pid is found in given url", () => {
      expect(() => {
        new GAMSUrl(STUB_NO_GAMS_URL);
      }).toThrow();
    });

    it("should take the window.location.href value when no argument was given to", () => {
      //will be reset in tearDown();
      getLocationMock.mockImplementation(() => STUB_LOCATION);

      let url = new GAMSUrl();
      expect(getLocationMock).toBeCalled(); // window.location is accessed in constructor
      //should contain mocked url - google and NOT localhost
      expect(url.toString()).toContain(STUB_URL);
    });

    afterEach(() => {
      tearDown();
    });
  });

  describe("GAMSURl specfic getters", () => {

    describe("get pid", () => {
      it("does return the pid from given url", () => {
        let gamsURl = new GAMSUrl(STUB_URL);
        expect(gamsURl.pid).toBe(DUMMY_PID);
      })
    });


    describe("get sdef", () => {
      it("does return the expected sdef from given url", () => {
        let gamsUrl = new GAMSUrl(STUB_URL);
        expect(gamsUrl.sdef).toBe("sdef:TEI");
      });
    });

    afterEach(() => {
      tearDown();
    });
  });

  describe("_parsePid", () => {
    it("should throw when no ':' is inside given path", () => {
      let url = new GAMSUrl(STUB_URL);
      expect(() => {
        //@ts-ignore --- only in ts private.
        url._parsePid("/malformed/gams/path");
      }).toThrow();
    });

    it("should return the pid correctly when /archive/objects is inside given url", () => {
      let url = new GAMSUrl(STUB_URL);
      //@ts-ignore --- only in ts private.
      let pid = url._parsePid(STUB_GAMS_URL_ARCHIVE);
      expect(pid).toBe(DUMMY_PID);
    });

    it("should return the pid correctly when after fedora /archive/objects directly follows the pid", () => {
      let url = new GAMSUrl(STUB_URL);
      //@ts-ignore
      let pid = url._parsePid("/archive/objects/o:derla.vor56");
      expect(pid).toBe("o:derla.vor56");
    });

    it("should throw an error with when the calucalted pid validates to false in the end", () => {
      let url = new GAMSUrl(STUB_URL);
      //suppress console error msg.
      jest.spyOn(console,'error').mockImplementationOnce(()=>undefined);
      expect(() => {
        //@ts-ignore
        url._parsePid(":");
      }).toThrow();
    });

    it("should throw a TypeError when given path includes 'http'", () => {
      let url = new GAMSUrl(STUB_URL);
      expect(() => {
        //@ts-ignore
        url._parsPid("http://gams.uni-graz.at/o:derla.test");
      }).toThrow(TypeError);
    });

    it("should call console.warn if a '?' is inside given pathname", () => {
      let url = new GAMSUrl(STUB_URL);
      let consoleWarnSpy = jest.spyOn(console, "warn");
      //@ts-ignore
      url._parsePid("/archive/objects/o:derla.vor23?test");
      expect(consoleWarnSpy).toBeCalled();

    });


    //dynamic tests generated from PID_PATHNAME_TEST_DATA
    //first array item is test-url secod expected value.
    test.each(PID_PATHNAME_TEST_DATA)(
      "Given gams-url %p _parsePid should extract pid value: %p",
      (testUrl, exp) => {
        let gamsUrl = new GAMSUrl(STUB_URL);
        //@ts-ignore -- only in compile time private.
        expect(gamsUrl._parsePid(testUrl)).toBe(exp);
      }
    );

    afterEach(() => {
      tearDown();
    });
  });

  describe("_parseSdef", () => {
    test.each(SDEF_TEST_DATA)(
      "Given %p _parseSdef should extract: %p",
      (arg01, arg02) => {
        let gamsUrl = new GAMSUrl(STUB_URL);
        //@ts-ignore -- only in compile time private.
        expect(gamsUrl._parseSdef(arg01)).toBe(arg02);
      }
    );

    afterEach(() => {
      tearDown();
    });
  });

  describe("addGamsParam", () => {
    const BASE_URL_DUMMY =
      "http://glossa.uni-graz.at/archive/objects/query:derla.oneperson/methods/sdef:Query/get";

    test.each(PARAM_TEST_DATA)(
      "Given param %p and value %p; GAMSURl should return the encoded url: %p",
      (param, searchVal, exp) => {
        let gamsUrl = new GAMSUrl(BASE_URL_DUMMY);
        gamsUrl.addGamsParam(param, searchVal);
        expect(gamsUrl.search).toBe(exp);
      }
    );

    test.each(MULTI_PARAM_TEST_DATA)(
      "Given paramMap %p. GAMSUrl should return encoded url: %p",
      //@ts-ignore
      (paramMap, exp) => {
        let gamsUrl = new GAMSUrl(BASE_URL_DUMMY);
        Object.keys(paramMap).forEach((key) => {
          let param = key;
          let val = (paramMap as { [property: string]: string })[key];
          gamsUrl.addGamsParam(param, val);
        });
        expect(gamsUrl.search).toBe(exp);
      }
    );

    afterEach(() => {
      tearDown();
    });
  });
});

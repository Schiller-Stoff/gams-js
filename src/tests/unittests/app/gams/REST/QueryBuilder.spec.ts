import "jest";
import QueryBuilder from "app/gams/REST/QueryBuilder";
import { tearDown } from "tests/utils/testUtils";

describe("Behavioral / functional Unittests against QueryBuilder", () => {

  const PARAMS_TEST_DATA = [
    [
      "$1",
      "mySearchVal",
      "$1|mySearchVal"
    ],
    [
      "$3",
      "yyasdmömoaskd",
      "$3|yyasdmömoaskd"
    ],
    [
      "perch",
      "sigurd",
      "perch|sigurd"
    ]
  ];

  const PARAMS_REST_VARIABLE_TEST_DATA = [
    [
      {
        "$1": "peter",
        "$2": "<fritzi>",
        "$6": "Kurt"
      },
      "$1|peter;$2|<fritzi>;$6|Kurt"
    ],
    [
      {
        "$4": "kumpel"
      },
      "$4|kumpel"
    ],
    [
      {
        "$4": "fritzi",
        "$7": "kanu"
      },
      "$4|fritzi;$7|kanu"
    ],
    [
      {
        $5: "ijasdasd",
        $77: 98
      },
      "$5|ijasdasd;$77|98"
    ] 
  ]

  const PARAMS_FULL_TEST_DATA = [
    [
      "http://glossa.uni-graz.at/archive/objects/o:derla.vor5/methods/sdef:TEI/get?mode=&locale=de",
      {
        $1:"hund",
        "$45": "kartoffel"
      },
      "http://glossa.uni-graz.at/archive/objects/o:derla.vor5/methods/sdef:TEI/get?mode=&locale=de&params=%241%7Chund%3B%2445%7Ckartoffel"
    ],
    [
      "http://glossa.uni-graz.at/archive/objects/o:derla.vor5/methods/sdef:TEI/get?mode=&locale=de",
      {
        $4: "<https://gams-uni-graz.at/o:oled.1>",
        $45: "flies",
        "$67": "peter"
      },
      "http://glossa.uni-graz.at/archive/objects/o:derla.vor5/methods/sdef:TEI/get?mode=&locale=de&params=%244%7C%3Chttps%3A%2F%2Fgams-uni-graz.at%2Fo%3Aoled.1%3E%3B%2445%7Cflies%3B%2467%7Cpeter"
    ]
  ]

  describe("buildParamsSubQuery", () => {
    test.each(PARAMS_TEST_DATA)(
      "Given param %p and param value %p, buildParamsSubQuery should return: %p",
      (param, paramVal, exp) => {
        //given
        //when
        let result = QueryBuilder.buildParamsSubQuery(param, paramVal);
        //then
        expect(result).toBe(exp);
      }
    )

    afterEach(() => {
      tearDown();
    });
  });

  describe("buildParamsRESTVariable", () => {
    test.each(PARAMS_REST_VARIABLE_TEST_DATA)(
      "Given paramMap %p buildParamsRESTVariable will construct subParam %p", 
      //@ts-ignore
      (paramMap, exp) => {
        //given
        //when
        let result = QueryBuilder.buildParamsRESTVariable(paramMap as any);
        //then
        expect(result).toBe(exp);
      }
    )
  });

  describe("buildFullParamsQuery", () => {
    test.each(PARAMS_FULL_TEST_DATA)(
      "Given baseURl %p and paramMap %p buildFullParamsQuery will construct: %p",
      //@ts-ignore
      (baseUrl, paramMap, exp) => {
        //given
        //when
        let result = QueryBuilder.buildFullParamsQuery(baseUrl as any, paramMap as any);
        //then
        expect(result).toBe(exp)
      }
    )


  });

});

describe("Internal / whitebox tests against QueryBuilder", () => {
  describe("buildParamsSubQuery", () => {
    it("throws a TypeError when one field of the paramMap validates to false", () => {
      expect(() => {
        QueryBuilder.buildParamsSubQuery("$4", undefined)
      }).toThrow(TypeError);
    });
  });
});
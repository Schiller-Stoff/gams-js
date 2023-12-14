//needed for transpiling async / promises in es5 -> tests crash without import
import "regenerator-runtime/runtime";
import "jest";
import { gamsJs } from "../../../app/gamsJs";
import { tearDown } from "../../utils/testUtils";

describe("Initial Smoketests against the gamsTemplate.js (check if base config works) -- Checks if Test setup / Transpilation / Typecheck runs correctly", () => {
  it("SmokeTest: Checks if base properties are defined.", () => {
    expect(gamsJs.dom).toBeDefined();
    expect(gamsJs.bootstrap).toBeDefined();
    expect(gamsJs.url).toBeDefined();
  });
  it("Can run a function with ES7 features applied without crashing", () => {
    let array = [1,2,3,4]
    array.includes(2);
    let four = 2**2;
  });
  afterEach(()=> {
    tearDown()
  });
});
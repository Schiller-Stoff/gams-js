import "jest";

describe("Initial Tests if installed environment is as expected, like node version.", () => {
    it("Tests if in the current process.version.node the number 12 is inside.", () => {
        expect(process.versions.node).toContain(12);
    });
});
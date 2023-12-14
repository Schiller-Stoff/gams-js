import "jest";
import lodash from "lodash";

const documentCopy = lodash.cloneDeep(document);
const windowCopy = lodash.cloneDeep(window);

/**
 * Calls common jest specific global mock / stub resetting methods. 
 */
export const tearDown = () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.clearAllTimers();
    document = lodash.cloneDeep(documentCopy);
    window = lodash.cloneDeep(windowCopy);
}
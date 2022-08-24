// @ts-check

/**
 * 
 * @param {string} str 
 * @returns {string}
 */
export const toInitialCap = (str) =>
    str ? `${str[0].toUpperCase()}${str.slice(1)}` : str;

/**
 * Converts kebab-case string to PascalCase.
 * @param {string} str 
 * @returns {string}
 */
export const kebabToPascalCase = (str) =>
    toInitialCap(str).replace(/-[a-z]/g, (m) => m[1].toUpperCase());
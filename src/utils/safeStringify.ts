/**
 * Safely handles circular references
 * @param obj 
 * @param indent 
 * @returns string
 */
const safeStringify = (obj: any, indent: number = 2): string => {
  let cache: any[] | null = [];
  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      typeof value === 'object' && value !== null
        ? cache?.includes(value)
          ? undefined // Duplicate reference found, discard key
          : cache?.push(value) && value // Store value in our collection
        : value,
    indent
  );
  cache = null;
  return retVal;
};

export default safeStringify;

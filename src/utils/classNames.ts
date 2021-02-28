import { isArray } from './is';

interface ClassNameObjectType {
  [key: string]: boolean;
}
/**
 * Merge classNames by conditions.
 * @param {ClassNameObjectType} args The className to merge
 */
export default function(
  ...args: (string | string[] | ClassNameObjectType | undefined)[]
) {
  let result: string[] = [];
  args.forEach(item => {
    if (typeof item === 'string') {
      result.push(item);
    } else if (isArray(item)) {
      result = result.concat(item);
    } else if (item) {
      Object.keys(item).forEach(key => {
        if (item[key]) {
          result.push(key);
        }
      });
    }
  });
  return result.join(' ');
}

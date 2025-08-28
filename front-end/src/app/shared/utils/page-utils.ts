/**
 * Set active page
 * T is representative of enum datatype for page that want to be displayed
 * */

export function setActivePage<T>(current: T, choice: T): T {
  return choice;
}

export function classNames(classes: (string|false)[]) {
  if (Array.isArray(classes)) {
    return classes.join(" ");
  }

  return classes;
}

export function formatDate(timestamp?: number) {
  if (!timestamp) {
    return '';
  }

  const date = new Date(timestamp * 1000);
  return `${paddZero(date.getHours())}:${paddZero(date.getMinutes())}`;
}

function paddZero(str: number) {
  return str.toString().length === 1 ? `0${str}` : str;
}

export function isEmpty(obj: object) {
  return !Object.keys(obj).length;
}

export function formatNumber(str: string) {
  return str.replace(/\D/g, "");
}

export function getNameInitials(fullName?: string) {
  return fullName
    ? fullName
        .split(" ")
        .map((name) => name[0].toUpperCase())
        .join(" ")
    : "";
}

export function recreateStructure(value: unknown) {
  let newValue = value;

  if (isArray(value)) {
    newValue = [];
    (value as Array<unknown>).forEach((v: unknown) => (newValue as Array<unknown>).push(recreateStructure(v)));
    return newValue;
  }

  if (isObject(value)) {
    newValue = {};
    for (let key in value as Record<string, unknown>) {
      (newValue as  Record<string, unknown>)[key] = recreateStructure((value as Record<string, unknown>)[key]);
    }
    return newValue;
  }

  return newValue;
}

function isObject(x: unknown) {
  return Object.prototype.toString.call(x) === "[object Object]";
}

function isArray(x: unknown) {
  return Array.isArray(x);
}

export function generateNoPhoneWarning (phoneNumber: string) {
  alert(`Phone number: ${phoneNumber} doesn't exist!`);
}

export function findRight <T>(arr: Array<T>, cb: (el: T) => boolean) {
  return [...arr].reverse().find(cb);
}

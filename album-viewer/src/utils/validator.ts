// function named `validateDate` which validates a date from text input in a french format and converts it to a date object.
export function validateDate(dateString: string): Date | null {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateString.match(regex);
    if (!match) {
        return null;
    }
    const day = parseInt(match[1] ?? '0', 10);
    const month = parseInt(match[2] ?? '0', 10) - 1; // Months are zero-based in JS Date
    const year = parseInt(match[3] ?? '0', 10);

    const date = new Date(year, month, day);
    if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
        return date;
    }
    return null;
}


// function that validates the format of a GUID string.
export function validateGUID(guid: string): boolean {
    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regex.test(guid);
}


// function that validates the format of a IPV6 address string and is named `validateIPV6`.
export function validateIPV6(ipv6: string): boolean {
    const regex = /^(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}$|^(?:[A-Fa-f0-9]{1,4}:){1,7}:$|^(?:[A-Fa-f0-9]{1,4}:){1,6}:[A-Fa-f0-9]{1,4}$|^(?:[A-Fa-f0-9]{1,4}:){1,5}(?::[A-Fa-f0-9]{1,4}){1,2}$|^(?:[A-Fa-f0-9]{1,4}:){1,4}(?::[A-Fa-f0-9]{1,4}){1,3}$|^(?:[A-Fa-f0-9]{1,4}:){1,3}(?::[A-Fa-f0-9]{1,4}){1,4}$|^(?:[A-Fa-f0-9]{1,4}:){1,2}(?::[A-Fa-f0-9]{1,4}){1,5}$|^[A-Fa-f0-9]{1,4}:(?::[A-Fa-f0-9]{1,4}){1,6}$|^:(?::[A-Fa-f0-9]{1,4}){1,7}$|^::$/;
    return regex.test(ipv6);
}
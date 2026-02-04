import {describe, it, expect} from 'vitest';
import { validateDate   , validateIPV6 } from './validator';

describe('validateDate', () => {
    it('should return a Date object for valid date string', () => {
        const result = validateDate('25/12/2020');
        expect(result).toBeInstanceOf(Date);
        expect(result?.getFullYear()).toBe(2020);
        expect(result?.getMonth()).toBe(11); // Months are zero-based
        expect(result?.getDate()).toBe(25);
    }),

    it( "should return null  for invalid date string", () => {
        const result = validateDate('31/02/2020'); // Invalid date
        expect(result).toBeNull();
    } );
});

describe('validateIPV6', () => {
    it('should return true for valid IPV6 address', () => {
        expect(validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
        expect(validateIPV6('2001:db8:85a3::8a2e:370:7334')).toBe(true); // compressed format
    });

    it('should return false for invalid IPV6 address', () => {
        expect(validateIPV6('12345::6789')).toBe(false); // too many digits
        expect(validateIPV6('invalid-ipv6')).toBe(false); // non-matching format
    });
});
import { isCNPJValid, isCPFValid, isEmailValid } from "~/utils/str";

export const Validations = {
    /**
     * Validation builder that allows you to determine a value as not fullfilled.
     * For example, if the value is -1 and the data passed is -1, it will be considered invalid.
     * @param value 
     * @returns 
     */
    requiredDefault: (value: any) => {
        return (data: unknown) => {
            if(value == data) {
                return true;
            }
            if (typeof data === "undefined") {
                return true;
            }
            if (typeof data === 'string') {
                if (data.replaceAll(/\s/g, '').length <= 0) {
                    return true;
                }
            }
            return data === null;
        }
    },
    /**
     * Validate if a given string is empty.
     * @param data
     * @returns 
     */
    required: (data: unknown) => {
        if (typeof data === "undefined") {
            return true;
        }
        if (typeof data !== 'string') {
            return true;
        }
        if (data.replaceAll(/\s/g, '').length <= 0) {
            return true;
        }
        return false;
    },
    /**
     * Validate if a given number is bigger than min.
     * @param min: number
     */
    min: (min: number) => {
        return (data: unknown) => {
            if(typeof data !== 'number') return true;
            return data < min;
        }
    },
    /**
     * Validate if a given data of type string or number only contains number
     * @param {string | number} data 
     * @returns {boolean}
     */
    onlyNumbers: (data: unknown) => {
        if(typeof data !== 'string' && typeof data !== 'number') {
            return true;
        }
        if(typeof data === 'number') {
            return false;
        }
        const str = data as string;
        const matches = str.match(/\D/);
        return matches !== null;
    },
    cpf: (data: unknown) => {
        if(typeof data !== 'string') {
            return true;
        }
        return !isCPFValid(data);
    },
    cnpj: (data: unknown) => {
        if(typeof data !== 'string') {
            return true;
        }
        return !isCNPJValid(data);
    },
    email: (data: unknown) => {
        if(typeof data !== 'string') {
            return true;
        }
        return !isEmailValid(data);
    },
    /**
     * Helper to skip a given validation, if needed
     * @param data 
     * @returns 
     */
    skip: (data: unknown) => false,
    /**
     * Validate if a given string is a valid brazilian phone.
     * @param data 
     * @returns 
     */
    brazilPhone: (data: unknown) => {
        if(typeof data !== 'string') {
            return true;
        }
        const value = data.replaceAll(/\D/g, '');
        if(value.length != 11) {
            return true;
        }
        return value.charAt(2) !== '9';
    }
}

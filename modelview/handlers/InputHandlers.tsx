import { ChangeEvent } from "react";

export function HandleInput<T extends { [key: string]: any }>(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    model: T,
    k: string,
    update: (m: T) => void
) {
    const value = e.target.value;
    const newModel = { ...model };
    (newModel as { [key: string]: any })[k] = value;
    update(newModel);
}

export function HandleInputWithMask<T extends { [key: string]: any }>(
    e: ChangeEvent<HTMLInputElement>,
    model: T,
    k: string,
    update: (m: T) => void,
    mask: RegExp
) {
    const value = e.target.value;
    const treatedRegexp = new RegExp(mask.source, 'g');
    const treated = value.replaceAll(treatedRegexp, '');
    const newModel = { ...model };
    (newModel as { [key: string]: any })[k] = treated;
    update(newModel);
}

export function HandleInputOnlyText<T extends { [key: string]: any }>(
    e: ChangeEvent<HTMLInputElement>,
    model: T,
    k: string,
    update: (m: T) => void
) {
    const value = e.target.value;
    const treatedValue = value.replaceAll(/\d/g, '');
    const newModel = { ...model };
    (newModel as { [key: string]: any })[k] = treatedValue;
    update(newModel);
}

export function HandleInputOnlyNumbers<T extends { [key: string]: any }>(
    e: ChangeEvent<HTMLInputElement>,
    model: T,
    k: string,
    update: (m: T) => void,
    onlyNaturals: boolean = false
) {
    if (e.target.value === '') {
        const newModel = { ...model };
        (newModel as { [key: string]: any })[k] = e.target.value;
        return update(newModel);
    }
    let number = Number.parseInt(e.target.value);
    if (Number.isNaN(number)) {
        return;
    }
    if (onlyNaturals) {
        if (number < 0) {
            number *= -1;
        }
    }
    const strval = `${number}`;
    const newModel = { ...model };
    (newModel as { [key: string]: any })[k] = strval;
    update(newModel);
}
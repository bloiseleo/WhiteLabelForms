import { useState } from "react";

export interface Address {
    street: string,
    number: number,
    complement?: string,
    locality: string,
    city: string,
    region: string,
    region_code: string,
    country: string,
    country_code?: string,
    postal_code: string,
}

function makePropertiesOptional<T>(obj: T): Partial<{ [K in keyof T]?: { message: string } | undefined }> {
    // Convertendo todas as propriedades para opcionais com mensagem de erro
    const optionalProperties: Partial<{ [K in keyof T]: { message: string } }> = {};
    for (const key in obj) {
        optionalProperties[key as keyof T] = undefined;
    }
    return optionalProperties;
}
 

export function useAddress(): [Address, (newAddress: Address) => void, any] {
    const [address, setAddress] = useState<Address>({
        street: '',
        number: 0,
        locality: '',
        city: '',
        region: '',
        region_code: '',
        country: '',
        postal_code: ''
    });

    const [errors, setErrors] = useState(makePropertiesOptional(address));

    const handleChange = (newAddress: Address) => setAddress(newAddress);

    return [address, handleChange, errors];
}
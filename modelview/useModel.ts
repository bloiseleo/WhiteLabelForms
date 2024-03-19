import { useState } from "react";

interface ModelInitializer<T> {
    data: T,
    validations: {[K in keyof T]?: {[key: string]: (data: unknown) => boolean}}
}

function buildErrors<T>(initializer: ModelInitializer<T> ): {[K in keyof T]: {[key: string]: boolean}} { 
    const errors: {[K in keyof T]: {[key: string]: boolean}} = {} as {[K in keyof T]: {[key: string]: boolean}};
    for (const key in initializer.data) {
        if(initializer.validations[key]) {
            const validationsDeclared = initializer.validations[key]!;
            Object.keys(validationsDeclared).map(validationKey => {
                if(!errors[key as keyof T]) {
                    errors[key as keyof T] = {} as {[key: string]: boolean};
                }
                (errors[key as keyof T] as { [key: string]: boolean })[validationKey] = false;
            }); 
        }
    }
    return errors; 
}

export function useModel<T>(initializer: ModelInitializer<T>): [model: T, errors: {[K in keyof T]: {[key: string]: boolean}}, updateModel: (newModel: T) => void, () => boolean] {
    const [model, setModel] = useState({
        data: initializer.data,
        errors: buildErrors(initializer),
        validations: initializer.validations
    });
    const getNewErrors = (newModel: T) => {
        const newErrors = {
            ...model.errors
        }
        for(const key in newModel) {
            if(model.validations[key as keyof T]) {
                const modelValidations = model.validations[key as keyof T]!;
                Object.keys(modelValidations).forEach(k => {
                    if(newErrors[key as keyof T]) {
                        (newErrors[key] as {[key: string]: boolean})[k] = modelValidations[k]!(newModel[key])
                    }
                });
            }
        }
        return newErrors;
    }
    const isValid = () => {
        const errors = getNewErrors(model.data);
        const responses: boolean[] = [];       
        for( const key in model.data) { // MUST REVIEW 
            if(model.validations[key as keyof T]) {
                const modelValidations = model.validations[key as keyof T]!;
                Object.keys(modelValidations).forEach(k => {
                    if(errors[key as keyof T]) {
                        const isinvalidValue = modelValidations[k]!(model.data[key as keyof T]);
                        responses.push(isinvalidValue);
                    }
                });
            }
        }
        setModel({
            ...model,
            errors
        })
        return responses.filter(r => r).length <= 0;
    }
    const updateModel = (newModel: T) => {
        const newErrors = getNewErrors(newModel);
        setModel({
            ...model,
            data: newModel,
            errors: newErrors
        });
    }

    return [model.data, model.errors, updateModel, isValid];
}
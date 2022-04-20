import { useMemo, useState } from 'react';


export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    useMemo(() => { }, [initialState])

    const reset = () => {
        setValues(initialState);
    }


    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [target.name]: target.value
        });

    }

    return [values, handleInputChange, reset];

}
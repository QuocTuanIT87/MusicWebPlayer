import { createContext, useState } from 'react';

export const formContext = createContext();

function FormProvider({ children }) {
    const [isLogin, setIsLogin] = useState();
    const [isShowForm, setIsShowForm] = useState();

    const hideShowForm = () => {
        setIsShowForm(!isShowForm);
    };

    const value = {
        isLogin,
        isShowForm,
        hideShowForm,
        setIsLogin,
    };

    return <formContext.Provider value={value}>{children}</formContext.Provider>;
}

export default FormProvider;

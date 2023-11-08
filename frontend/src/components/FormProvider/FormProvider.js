import { createContext, useState } from 'react';

export const formContext = createContext();

function FormProvider({ children }) {
    const [isLogin, setIsLogin] = useState();
    const [isShowForm, setIsShowForm] = useState();
    const [isShowFormUpload, setIsShowFormUpload] = useState();

    const hideShowForm = () => {
        setIsShowForm(!isShowForm);
    };

    const hideShowFormUpload = () => {
        setIsShowFormUpload(!isShowFormUpload);
    };

    const value = {
        isLogin,
        isShowForm,
        isShowFormUpload,
        setIsShowForm,
        setIsShowFormUpload,
        hideShowForm,
        setIsLogin,
        hideShowFormUpload,
    };

    return <formContext.Provider value={value}>{children}</formContext.Provider>;
}

export default FormProvider;

import {createContext, useState, useContext } from 'react';

const loginContext = createContext({
    openLoginModal: false,
    setOpenLoginModal: (value: boolean) => {},
});

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);

    return (
        <loginContext.Provider value={{openLoginModal, setOpenLoginModal}}>
            {children}
        </loginContext.Provider>
    )
}

export const useLoginContext = () => {
    return useContext(loginContext);
};
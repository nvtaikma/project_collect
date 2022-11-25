import { createContext } from 'react';

export const productProvider = createContext();

function ProductProvider({ data, children }) {
    // console.log(data);
    return <productProvider.Provider value={data}>{children}</productProvider.Provider>;
}

export default ProductProvider;

import React from "react";
import axios from "axios";

type Categoria = {
    
}

type MyContextType = {                      //interfaz del tipado el valor del context
    categorias: Categoria[];
}

const CategoriasContext = React.createContext<MyContextType | undefined>(undefined) //contexto es MyContextType o undefined con valor inicial undefined

type MyProviderProps = {            //interfaz que define el tipado de children
    children: React.ReactNode;      //tipado de children
};

const CategoriasProvider = ({children}: MyProviderProps) => {   //: MyProviderProps es la interfaz de children

    const [categorias, setCategorias] = React.useState([])
    const obtenerCategorias = async () => {         //obtiene la lista categorias de bebidas

        try {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const {data} = await axios(url)
            setCategorias(data.drinks)              //establece el state con data.drinks
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(() => {
        obtenerCategorias();
    }, []);
        
    return (
        <CategoriasContext.Provider
            value={{
                //aqui van los datos dados por el provider
                categorias
            }}
        >
            {children}
        </CategoriasContext.Provider>
    )
}
export {
    CategoriasProvider
}
export default CategoriasContext

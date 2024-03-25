import React, { useState, useEffect } from "react";
import axios from "axios";

type Bebida = { 
    //aqui van los tipos de los atributos de bebidas
    idDrink: string;
}
type Datos = {          //parámetros que toma la funcion consultarBebida
    nombre: string;
    categoria: string;
}
type ID = {
    //aqui van los tipos de los atributos de bebidas
}
type IDRecetaFav = {

}
type RecetasFavoritas = {
    
}
type IDRecetaEliminada = {
    
}
type MyContextType = {                      //interfaz del tipado el valor del context
    bebidas: Bebida[];
    consultarBebida: (datos: Datos) => Promise<void>;    //toma como argumento de tipo Datos y retorna una promesa de tipo void
    handleModalClick: () => void;                           //toma como argumento nada y retorna nada
    modal: boolean;
    handleBebidaIdClick: (id: ID) => void;
    receta: object;
    spinner: boolean;
    handleAddFavorite: (idRecetaFav: IDRecetaFav) => void;
    modalFav: boolean;
    handleModalFav: () => void;
    obtenerRecetas: () => void;
    recetasFavoritas: RecetasFavoritas[];
    handleEliminarFavorito: (idRecetaEliminada: IDRecetaEliminada) => void;
    alerta: string;
    setModalFav: () => void;
    setModal: () => void;
}

const BebidasContext = React.createContext<MyContextType | undefined>(undefined) //contexto es MyContextType o undefined con valor inicial undefined

type MyProviderProps = {            //interfaz que define el tipado de children
    children: React.ReactNode;      //tipado de children
};

const BebidasProvider = ({children}: MyProviderProps) => {   //: MyProviderProps es la interfaz de children | Componente del Provider
    
    const [bebidas, setBebidas] = useState([])      //1 inicializa el state como array vacío
    const [modal, setModal] = useState(false)       //2 modal activo
    const [bebidaId, setBebidaId] = useState(null)  //3state de id de la bebida para consultar la receta
    const [receta, setReceta] = useState({})        //4state que guarda la receta del modal
    const [spinner, setSpinner] = useState(false)   //5 state que guarda state del spinner
    const [modalFav, setModalFav] = useState(false) //6state modal de favoritos
    //obtener favoritos de localStorage
    const favoritosLS = JSON.parse(localStorage.getItem('favoritos') || '""')
    const [favoritos, setFavoritos] = useState(favoritosLS)  //7 arreglo que guarda los favoritos
    const [alerta, setAlerta] = useState('');       //8 alerta de que no hay favoritos
    const [recetasFavoritas, setRecetasFavoritas] = useState([])    //9recetas favoritas consultadas

    useEffect(() => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos))
        console.log(favoritos)
    }, [favoritos]);
    
    //funcion para desplegar favoritos obteniendo sus recetas
    const obtenerRecetas = async () => {
        setSpinner(true);
        if(!favoritos || favoritos.length === 0){
            setAlerta('No hay Favoritos');
            return;
        }
        try {
            const favRecetas = await Promise.all(favoritos.map( async id => {
                const url = `http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}` 
                const {data} = await axios(url);
                return data.drinks[0];
            }));
            setAlerta('')
            setRecetasFavoritas(favRecetas);
            // console.log(recetasFavoritas);
        } catch (error) {
            console.log(error)
        }

        setSpinner(false)
    }

    //funcion que consulta la API para que obtenga la receta de la bebida
    useEffect(() => {
        const obtenerReceta = async () => {
            // console.log(bebidaId)
            setSpinner(true)                           //se hace visible el spinner
            if(!bebidaId) return
            try {
                const url = `http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
                const {data} = await axios(url)

                setReceta(data.drinks[0])       //pasa al state de receta la receta
            } catch (error) {
                console.log(error)
            }   
            setSpinner(false)                   //quita el spinner
        }
        
        obtenerReceta();        

    }, [bebidaId]);

    const consultarBebida = async datos => {        //toma como parámetro datos que viene del formulario
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`
            const {data} = await axios(url)                 //consulta la API
            // console.log(data.drinks)
            setBebidas(data.drinks)                         //pasa al state las bebidas consultadas
        } catch (error) {
            console.log(error)
        } 
    }

    //funcion que cambia el estado del modal
    const handleModalClick = () => { 
        
        setModal(!modal);   //activa el modal

    }
        
    //funcion para setear el id de la bebida en el state bebidaId
    const handleBebidaIdClick = (id) => {

        setBebidaId(id);
    }

    //funcion para agregar al LocalStorage los favoritos
    const handleAddFavorite = (idRecetaFav) => {
        //revisar si el id ya está en favoritos
        if(favoritos.includes(idRecetaFav)) return;

        const nuevosFavoritos = [...favoritos, idRecetaFav]
        console.log(nuevosFavoritos);
        setFavoritos(nuevosFavoritos)
    }

    //funcion para abrir del modal de favoritos
    const handleModalFav = () => {
        setModalFav(!modalFav)
    }
    //funcion para eliminar favorito
    const handleEliminarFavorito = (idRecetaEliminada) => {
        console.log('Eliminando...', idRecetaEliminada)
        const noEliminados = favoritos.filter(favorito => favorito !== idRecetaEliminada);

        setFavoritos(noEliminados)
    }

    return (
        <BebidasContext.Provider
            value={{
                //aqui van los datos dados por el provider
                consultarBebida,
                bebidas,
                handleModalClick,
                modal,
                handleBebidaIdClick,
                receta, 
                spinner,
                handleAddFavorite,
                modalFav,
                handleModalFav, 
                obtenerRecetas,
                recetasFavoritas,
                handleEliminarFavorito,
                alerta,
                setModalFav,
                setModal
            }}
        >
            {children}
        </BebidasContext.Provider>
    )
}
export {
    BebidasProvider
}
export default BebidasContext

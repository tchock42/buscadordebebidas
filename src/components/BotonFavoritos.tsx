import { Button } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"

const BotonFavoritos = () => {
    const context = useBebidas();
    if(!context){
        return null;
    }
    const { handleModalFav, obtenerRecetas } = context;

    return (
        <Button
            variant="primary"
            onClick={() => {
                handleModalFav()    //activa el modal
                obtenerRecetas();   //obtiene las recetas
            }}
        >Favoritos</Button>
    )
}

export default BotonFavoritos

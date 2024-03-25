import { Button } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"

const BotonFavoritos = () => {

    const { handleModalFav, obtenerRecetas } = useBebidas();

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

import useBebidas from "../hooks/useBebidas"
import { Row } from "react-bootstrap";
import Bebida from './Bebida'

const ListadoBebidas = () => {
    const context = useBebidas();
    if(!context){
        return null;
    }
    const { bebidas } = context;         //extrae el arreglo de bebidas
    // console.log(bebidas)
    return (
        <Row className="mt-5">
            {bebidas.map(bebida => (
                <Bebida
                    key = {bebida.idDrink}
                    bebida = {bebida}   //pasa el prop con el objeto bebida
                />
            ))}
        </Row>
    )
}

export default ListadoBebidas

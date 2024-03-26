import { Col, Card, Button } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";   //hook personalizado

type BebidaType = {         //define el tipo de Bebida, dentro están los atributos de bebida
    idDrink: string;
    strDrink?: string;
    strDrinkThumb?:string;
}
type BebidaProps = {        //define el tipo de los props
    bebida: BebidaType;
}

const Bebida = ({bebida}: BebidaProps) => {    //extrae el prop bebida con el tipo definido en BebidaProps
    const context =useBebidas();    //asegurar que el context no sea undefined
    if(!context){
        return null;
    }

    const {handleModalClick, handleBebidaIdClick} = context;   //se extrae la funcion del BebidasProvider

    return (
        <Col md={6} lg={3} className="mt-2">
            <Card>
                <Card.Img
                    variant="top"
                    src={bebida.strDrinkThumb}
                    alt={`Imagen de ${bebida.strDrink}`}
                />
                <Card.Body>
                    <Card.Title>{bebida.strDrink}</Card.Title>
                    
                    <Button
                        onClick={() => {
                            handleModalClick()                      //cambia el state del modal
                            handleBebidaIdClick(bebida.idDrink)     //pasa el id de la bebida
                        }}  //se coloca como callback para tener varias funciones
                        className="w-100 text-uppercase mt-2" variant="info"
                    >Ver Receta</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Bebida

import { Button, Modal, Row, Spinner } from "react-bootstrap"
import Alerta from "./Alerta"
import useBebidas from "../hooks/useBebidas"
import BebidaFavorita from "./BebidaFavorita"

const ModalFavoritos = () => {
  
    const {modalFav, handleModalFav, spinner, recetasFavoritas, alerta, setModalFav} = useBebidas()
    
    const handleClose = () => {
        setModalFav(false)
    }

    return (
        <Modal show={modalFav} onHide={handleModalFav}>

            { alerta ? <Alerta/> : (spinner ? (
                <div style={{
                    display:'flex', justifyContent:'center', alignItems:'center'
                }}>
                    <Spinner animation="border" variant="danger" className="m-5"/>
                </div>
            ) : (
                <>
                    <Modal.Header>
                        <Modal.Title>Favoritos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="mt-5">
                            {recetasFavoritas.map(recetaFavorita => (
                                <BebidaFavorita                 //imprime la bebida favorita
                                    key={recetaFavorita.idDrink}
                                    recetaFavorita={recetaFavorita}
                                />
                            ))}
                        </Row>
                    </Modal.Body>
                </>
            ))}
            <Modal.Footer>
                <Button 
                    variant="secondary"
                    onClick={() => {handleClose()}}
                >Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalFavoritos

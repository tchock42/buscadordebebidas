//este modal se activa mediante el state de modal y se llena con la consulta de la aPI para ver la receta
import { Modal, Image, Spinner, Button } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"
import React from "react";

const ModalBebida = () => {

  const [isLoading, setLoading] = React.useState(false) //inicializa cargando en falso
  React.useEffect(() => { //temporiza el texto del boton Agregando a Favoritos
    if(isLoading){
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    }
  }, [isLoading]);
  
  const {bebidas, handleModalClick, modal, receta, spinner, handleAddFavorite, setModal} = useBebidas();       //extrae del provider la funcion del modal, el state de modal y la receta de la API
  // console.log(receta)

  const mostrarIngredientes = () => {
    let ingredientes = [];                                      //arreglo vacío de ingredientes

    for(let i = 1; i < 16; i++){                                //inicializa el iterador
      if(receta[`strIngredient${i}`]){                           //revisa que el key sea válido (no tenga un null) del atributo strIngredients
        ingredientes.push(                                      //agrega a ingredientes el html que sigue
          <li key={i}>{receta[`strIngredient${i}`]}: {receta[`strMeasure${i}`]}</li>  //imprime el ingrediente y su medida
        )
      }
    }
   
    return ingredientes;
  }

  const handleClose = () => {
    setModal(false)
  }
  return (
    <Modal show={modal} onHide={handleModalClick}>  
        {spinner ? (
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'
            }}>
            <Spinner animation="border" variant="danger" className="m-5"/>
          </div>
        ) : (
          <>
            <Image                                          
              src={receta.strDrinkThumb}
              alt={`Imagen de receta ${receta.strDrink}`}
            />  
            <Modal.Header>
              <Modal.Title>{receta.strDrink}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="p-3">
                <h2>Instrucciones</h2>
                <p>{receta.strInstructions}</p>
                <h2>Ingredientes y Cantidad</h2>
                {mostrarIngredientes()}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant="secondary"
                onClick={() => {handleClose()}}
              >Cerrar</Button>
              <Button 
                variant="primary"
                onClick={() => {
                  setLoading(true)
                  handleAddFavorite(receta.idDrink)}}
              >{isLoading ? 'Agregando a Favoritos' : 'Agregar a favoritos'}</Button>

            </Modal.Footer>
          </>
        )}
      
    </Modal>
  )
}

export default ModalBebida

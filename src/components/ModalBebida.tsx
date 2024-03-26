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
  
  const context =useBebidas();    //asegurar que el context no sea undefined
  if(!context){
      return null;
  }
  const {handleModalClick, modal, receta, spinner, handleAddFavorite, setModal} = context;       //extrae del provider la funcion del modal, el state de modal y la receta de la API

  const mostrarIngredientes = () => {
    let ingredientes = [];                                      //arreglo vacío de ingredientes
    let string1:string= 'strIngredient';                        //string para buscar ingredientes y medidas
    let string2:string= 'strMeasure';
    var arreglo = [];                                           //arreglo para guardar los valores de receta

    for ( const par of Object.entries(receta)){             //extrae todos los elementos de receta como pares en un array de arrays
      arreglo.push(par);
    }
    const arreglo1 = arreglo.filter(elemento => elemento[0].includes(string1) && elemento[1] !== null);//filtra por string y nulos
    const arreglo2 = arreglo.filter(elemento => elemento[0].includes(string2) && elemento[1] !== null);

    for(let i = 0; i < arreglo1.length; i++){ //itera para crear la lista de ingredientes
      ingredientes.push(
        <li>{arreglo1[i][1]}: {arreglo2[i][1]}</li>
      )
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

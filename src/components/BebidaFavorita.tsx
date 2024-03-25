import { Card, Button } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"
import React from "react"

type RecetaFavoritaType = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
}
type RecetaFavoritaProps = {
  recetaFavorita: RecetaFavoritaType
}

const BebidaFavorita = ({recetaFavorita}: RecetaFavoritaProps) => {

  const {handleEliminarFavorito} = useBebidas();
  
  const [isLoading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if(isLoading){
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    }
  }, [isLoading]);

  const mostrarIngredientes = () => {
    let ingredientes = [];                                      //arreglo vacío de ingredientes

    for(let i = 1; i < 16; i++){                                //inicializa el iterador
      if(recetaFavorita[`strIngredient${i}`]){                           //revisa que el key sea válido (no tenga un null) del atributo strIngredients
        ingredientes.push(                                      //agrega a ingredientes el html que sigue
          <li key={i}>{recetaFavorita[`strIngredient${i}`]}: {recetaFavorita[`strMeasure${i}`]}</li>  //imprime el ingrediente y su medida
        )
      }
    }
   
    return ingredientes;
  }

  return (
    <Card className="mt-2">
      <Card.Img
        className="mt-2"
        variant="top"
        src={recetaFavorita.strDrinkThumb}
        alt={`Imagen de receta favorita ${recetaFavorita.strDrink}`}
      />
      <Card.Body>
        <Card.Title>{recetaFavorita.strDrink}</Card.Title>
        <h2>Instrucciones</h2>
        <Card.Text>{recetaFavorita.strInstructions}</Card.Text>
        <h2>Ingredientes y Cantidad</h2>
        <Card.Text>{mostrarIngredientes()}</Card.Text>
        <Card.Text></Card.Text>
      </Card.Body>

      <Button
        onClick={() => {
          setLoading(true)
          handleEliminarFavorito(recetaFavorita.idDrink)}}
        className="w-100 text-uppercase mb-2"
        variant="danger"
      >
        {isLoading ? 'Eliminando!' : 'Eliminar Favorito'}
      </Button>
    </Card>
  )
}

export default BebidaFavorita

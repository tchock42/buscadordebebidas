import { Card, Button } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"
import React from "react"

type RecetaFavoritaType = {
  idDrink: string;
  strDrink?: string;
  strDrinkThumb?: string;
  strInstructions?: string;
};
type RecetaFavoritaProps = {
  recetaFavorita: RecetaFavoritaType;
};

const BebidaFavorita = ({recetaFavorita}: RecetaFavoritaProps) => {
  const context =useBebidas();    //asegurar que el context no sea undefined
  if(!context){
      return null;
  }
  const {handleEliminarFavorito} = context;
  
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
    let string1:string= 'strIngredient';                        //string para buscar ingredientes y medidas
    let string2:string= 'strMeasure';
    var arreglo = [];                                           //arreglo para guardar los valores de receta

    for ( const par of Object.entries(recetaFavorita)){             //extrae todos los elementos de receta como pares en un array de arrays
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

  const idRecetaEliminada = recetaFavorita.idDrink ?? "";
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
          handleEliminarFavorito(idRecetaEliminada)}}
        className="w-100 text-uppercase mb-2"
        variant="danger"
      >
        {isLoading ? 'Eliminando!' : 'Eliminar Favorito'}
      </Button>
    </Card>
  )
}

export default BebidaFavorita

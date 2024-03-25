import { Container, Col, Row } from "react-bootstrap"
import Formulario from "./components/Formulario"
import BotonFavoritos from "./components/BotonFavoritos"
import ListadoBebidas from "./components/ListadoBebidas"
import ModalBebida from "./components/ModalBebida"
import ModalFavoritos from "./components/ModalFavoritos"
import {CategoriasProvider} from "./context/CategoriasProvider"
import { BebidasProvider } from "./context/BebidasProvider"


function App() {
  
  return (
    <CategoriasProvider>
      <BebidasProvider>
        <header className="py-5">
          <Row> 
            <Col xs={12} md={6}     //ocupa cada columa 12 espacios en mobile y la mitad en desktop
            >
              <h1 style={{ fontSize:25, fontWeight:700 }}>Buscador de Bebidas</h1>
            </Col>
            <Col xs={12} md={6}>
              <BotonFavoritos/>
            </Col>
          </Row>
        
        </header>
        <Container className="mt-5">
          <Formulario/>
          <ListadoBebidas/>
          <ModalBebida/>
          <ModalFavoritos/>
        </Container>
      </BebidasProvider>
    </CategoriasProvider>
  )
}

export default App

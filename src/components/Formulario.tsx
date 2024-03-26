import { Button, Form, Col, Row, FormGroup, Alert } from "react-bootstrap"
import useCategorias from "../hooks/useCategorias"          //importa custom hook
import React, { useState } from "react"
import useBebidas from "../hooks/useBebidas"                //importa el hook para consultar bebidas

const Formulario = () => {

    const [busqueda, setBusqueda] = React.useState({        //objeto con los datos del formulario, nombre y categoria
        nombre: '',
        categoria: ''
    })
    const [alerta, setAlerta] = useState('')                    //state para la alerta
    //context de Categorias
    const context = useCategorias();
    if(!context){
        return null;
    }
    const {categorias} = context                   //extrae las categorias del Provider. useCategorias retorna un arreglo    

    //context de Bebidas
    const contexto = useBebidas();
    if(!contexto){
        return null;
    }
    const {consultarBebida} = contexto;                //extrae la funcion que consulta las bebidas del Provider de Bebidas        

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {    //funcion asociada al formulario
        e.preventDefault();
        /**Validacion de formulario */
        if(Object.values(busqueda).includes('')){   //revisa que el state busqueda no esté vacío
            setAlerta('Todos los campos son obligatorios')
            return;                                         //sale de la función
        }
        setAlerta('') /*Pasa la validación, se elimina la alerta*/

        //se consultan la API de bebidas
        consultarBebida(busqueda)                      //llama a la funcion que consulta las Bebidas con nombre y categoria
    }
    return (
        <Form 
            onSubmit={e => handleSubmit(e)}
        >
            {alerta && <Alert variant="danger" className="text-center">{alerta}</Alert>}
            <Row>                   
                <Col md={6}>
                    <FormGroup className="mb-3">
                        <Form.Label htmlFor="nombre">
                            Nombre Bebida
                        </Form.Label>
                        
                        <Form.Control   //input type="text"
                            id="nombre"
                            type="text"
                            placeholder="Ej: Tequila, Vodka, etc"
                            name="nombre"
                            value={busqueda.nombre}
                            onChange={e => setBusqueda({        //pasa busqueda y un atributo que sustituye al atributo anterior modificado en el onChange
                                ...busqueda,                    //copia de busqueda
                                [e.target.name]: e.target.value //atributo modificado en el onChange
                            })}
                        />
                            
                    </FormGroup>   

                </Col>
                <Col md={6}>
                <FormGroup className="mb-3">
                        <Form.Label htmlFor="categoria">
                            Categoría de Bebida
                        </Form.Label>
                        
                        <Form.Select                    //input type select
                            id="categoria" 
                            name="categoria"
                            value={busqueda.categoria}
                            onChange={e => setBusqueda({    //pasa busqueda y un atributo nuevo que sustituye a uno de busqueda
                                ...busqueda,
                                [e.target.name]: e.target.value
                            })}
                        >
                            <option>-- Selecciona Categoría --</option>
                            {categorias.map(categoria => (
                                <option
                                    key={categoria.strCategory}
                                    value={categoria.strCategory}
                                >{categoria.strCategory}
                                </option>
                            ))}
                        </Form.Select>
                        
                    </FormGroup>   
                </Col>
            </Row>
            <Row className="justify-content-end">
                <Col md={3} > 
                    <Button 
                        variant="danger" 
                        className="text-uppercase w-100"
                        type="submit"
                    >
                        Buscar Bebidas
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Formulario

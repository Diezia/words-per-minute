import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MostrarPalabra } from './MostrarPalabra';
import { useLayoutEffect } from 'react';

export const MyApp = () => {
  const [state, setState] = useState({
    texto: "Feliz 53' cumpleaños, doctor. Bienvenido al primer día de su muerte. Pertenezco a algún momento de su pasado. Usted arruinó mi vida. Quizá no sepa cómo, por qué o cuándo, pero lo hizo. Llenó todos mis instantes de desastre y tristeza. Arruinó mi vida. Y ahora estoy decidido a arruinar la suya. Al principio pensé que debería matarlo para ajustarle las cuentas, sencillamente. Pero me di cuenta de que eso era demasiado sencillo. Es un objetivo patéticamente fácil, doctor. De día, no cierra las puertas con llave. Da siempre el mismo paseo por la misma ruta de lunes a viernes. Los fines de semana sigue siendo de lo más predecible, hasta la salida del domingo por la mañana para comprar el 'Times' y tomar un bollo y un café con dos terrones de azúcar y sin leche en el moderno bar situado dos calles más abajo de su casa. Demasiado fácil. Acecharlo y matarlo no habría supuesto ningún desafío. Y, dada la facilidad de ese asesinato, no estaba seguro de que me proporcionara la satisfacción necesaria. He decidido que prefiero que se suicide. Ricky Starks se movió incómodo en el asiento. Podía notar el calor que desprendían las palabras, como el fuego de una estufa de leña que le acariciara la frente y las mejillas. Tenía los labios secos y se los humedeció en vano con la lengua. Suicídese, doctor. Tírese desde un puente. Vuélese la tapa de los sesos con una pistola. Arrójese bajo un autobús. Láncese a las vías del metro. Abra el gas de la estufa. Encuentre una buena viga y ahórquese. Puede elegir el método que quiera.",
    irf: 1000,   // Intervalo de Repetición de función.
    control_button: false,
    button_variant: 'outline-success',
    button_value: 'Iniciar'
  })

  const { texto, irf, control_button, button_variant, button_value } = state;
  const textareaRef = useRef();

  // mide el textarea del texto y le da una altura según la cantidad de líneas de texto que tenga
  useLayoutEffect(() => {
    textareaRef.current.style.height = "auto";
    const textareaHeight = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = textareaHeight < 300 ? textareaHeight + "px" : "300px";
  }, [texto])

  // calcula el intervalo de repetición que se le pasa al setInterval que muestra las palabras
	const irfCalculator = (e) => {
		let ppm = e.target.value; // palabras por minuto.
		let pps = ppm / 60; // palabras por segundo.
		let irf = (1 / pps) * 1000;
		setState({
      ...state,
      irf: irf
    })
	};

  const handleChange = (e) => {
		setState({
      ...state,
      texto: e.target.value
    });
	}

	const handleClick = () => {
		if (!control_button) {
			setState({
        ...state,
				control_button: true,
				button_variant: 'outline-danger',
				button_value: 'Stop',
			});
		} else {
			setState({
        ...state,
				control_button: false,
				button_variant: 'outline-success',
				button_value: 'Iniciar',
			})
		}
	}
	
  return (
    <div className="App">
      <Container className='localstyle-mt-100'>
        <Row>
          <Col xl={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Body>
                <Card.Title className="localstyle-font-size-dos text-center">Lector de palabras por minuto</Card.Title>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text className="localstyle-font-size-uno25">Texto</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl ref={textareaRef} id="text_input" value={texto} onChange={handleChange} as="textarea" />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text className="localstyle-font-size-uno25">Palabras por Minuto</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl type="number" as="input" size="lg" min="60" max="500" placeholder="60" id="words_minute_input" onChange={irfCalculator} />
                  <Button variant={button_variant} size="xxl" onClick={handleClick}>{button_value}</Button>
                </InputGroup>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body className="localstyle-text-center">
                { control_button && <MostrarPalabra texto={texto} irf={irf}/> }
              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </div>
  )
}


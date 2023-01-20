import ReactDOM from 'react-dom';

import { Overlay, Container, Footer} from  './styles';
import PropTypes from 'prop-types';

import Button from '../Button'

export default function Modal({ danger }) {
  // createPortal: É justamente um portal em que referencio a qual tag no index.html quero renderizar este componente

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Título do modal</h1>
        <p>
          Corpo do modal
        </p>

        <Footer>
          <button type="button" className='cancel-button'>
            Cancelar
          </button>
          <Button type="button" danger={danger}>
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  )
}

Modal.propTypes = {
  danger: PropTypes.bool,
}

// Necessário informar defaultProps pela propriedade não ser required
Modal.defaultProps = {
  danger: false,
}

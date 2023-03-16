import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { Overlay, Container, Footer} from  './styles';
import PropTypes from 'prop-types';

import Button from '../Button'
import ReactPortal from '../ReactPortal';

export default function Modal({
  danger,
  visible,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  isLoading
}) {

  const [shouldRender, setShouldRender] = useState(visible);

  const overlayRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const overlayRefElement = overlayRef.current;

    if(!visible && overlayRefElement){
      overlayRefElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (overlayRefElement) {
        overlayRefElement.removeEventListener('animationend', handleAnimationEnd);
      }
    }
  }, [visible]);

  if(!shouldRender){
    return null;
  }

  // createPortal: É justamente um portal em que referencio a qual tag no index.html quero renderizar este componente

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={overlayRef}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>
          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              type="button"
              className='cancel-button'
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>

            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  )
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool
}

// Necessário informar defaultProps pela propriedade não ser required
Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
  isLoading: false
}

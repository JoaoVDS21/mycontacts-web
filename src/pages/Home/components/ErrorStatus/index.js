import PropTypes from 'prop-types';
import { Container } from "./styles";

import sad from '../../../../assets/images/sad.svg';
import Button from '../../../../components/Button';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="" />

      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
        <Button
          onClick={onTryAgain}
          type="button"
        >
          Tentar novamente
        </Button>
      </div>
    </Container>
  )
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired
}

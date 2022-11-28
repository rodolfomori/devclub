import Ionicons from '@expo/vector-icons/Ionicons';
import { Container, ContainerItems } from './styles';
import { useHome } from '../../hooks/HomeContext';

export function TopMenu({ goBack }) {
  const { changeIframe, iFrame } = useHome();

  return (
    <Container>
      <ContainerItems onPress={() => goBack()}>
        <Ionicons name="caret-back" size={32} color="#FFF" />
      </ContainerItems>

      <ContainerItems>
        <Ionicons name="ios-reload-circle-sharp" size={32} color="#FFF" onPress={() => changeIframe(iFrame)} />
      </ContainerItems>
    </Container>
  );
}

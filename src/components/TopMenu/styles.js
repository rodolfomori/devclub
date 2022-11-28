import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  position: absolute;
  top: 25px;
  background: transparent;
  width: 100%;
  height: 78px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;

export const ContainerItems = styled(TouchableOpacity)`
  height: 100%;
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

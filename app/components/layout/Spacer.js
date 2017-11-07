import styled from 'styled-components/native';

export default Spacer = styled.View`
    height: ${props => props.height || '0' };
    width: ${props => props.width || '100' };
`
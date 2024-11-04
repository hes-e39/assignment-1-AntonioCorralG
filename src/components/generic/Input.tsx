import styled from "styled-components";

const StyledInput = styled.input`
  type: ${(props) => {
    return props.type;
  }};
  height: ${(props) => {
    return props.height;
  }}px;
  border-radius: 10px;
  &:hover {
    background-color: #c2c5d1;
  }
  width: ${(props) => {
    return props.width;
  }}px;
  padding: 0.5rem;
  margin: 0.25rem;
  cursor: text;
`;

const Input = ({ height, width, type }) => {
  return <StyledInput height={height} width={width} type={type} />;
};

export default Input;

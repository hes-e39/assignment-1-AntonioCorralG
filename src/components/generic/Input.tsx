import styled from "styled-components";

interface Props {
  type: string;
  height: number;
  width: number;
}

const StyledInput = styled.input<Props>`
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

const Input = ({
  height,
  width,
  type,
}: {
  height: number;
  width: number;
  type: string;
}) => {
  return <StyledInput height={height} width={width} type={type} />;
};

export default Input;

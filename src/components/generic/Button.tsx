import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(p) => {
    if (p.type === "start") {
      return "#32a852";
    } else if (p.type === "pause") {
      return "#d4c57b";
    } else if (p.type === "reset") {
      return "#d4847b";
    } else {
      return "#7b8bd4";
    }
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
  cursor: pointer;
  font-weight: 700;
`;

const Button = ({
  children,
  type,
  height,
  width,
  onClick,
}: {
  children: React.ReactNode;
  type: string;
  height: number | undefined;
  width: number | string;
  onClick: () => void;
}) => {
  return (
    <StyledButton type={type} height={height} width={width} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;

import styled from "styled-components";

export const StyledForm = styled.form`
  padding: 0.5em;
  margin: 0.5rem;
`;

export const StyledSelect = styled.select`
  margin: 0.5rem;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #3b89a8;
  color: #b8bebf;
  font-weight: 600;
  font-size: 16px;
  width: 50px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(34, 100, 195, 0.5);
  }
`;

export const Label = styled.label`
  align-items: center;
  display: flex;
  width: 100%;
  flex-direction: rows;
  max-width: 200px;
  color: #919a9c;
`;

//To do: figureout how styling the dropdown option works
export const StyledOption = styled.option`
  background-color: #3b89a8;
  color: #fff;
`;

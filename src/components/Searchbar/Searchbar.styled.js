import styled from 'styled-components';

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;
export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`;
export const SearchBtn = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 20px;
`;
export const SearchBtnLabel = styled.label`
  margin-left: 5px;
`;
export const HeaderSearchbar = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: purple;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

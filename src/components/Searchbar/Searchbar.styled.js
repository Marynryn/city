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
  font-size: 18px;
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

export const Error = styled.p`
  display: flex;
  align-items: center;
  color: red;
  margin-top: 20px;
  padding: 20px;
  font-size: 22px;
`;

export const Result = styled.p`
  margin-top: 20px;
  font-size: 18px;
`;

export const Loader = styled.div`
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

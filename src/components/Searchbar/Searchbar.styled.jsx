import styled from '@emotion/styled';
import { Form, Field } from 'formik';

export const SearchForm = styled(Form)`
  width: 230px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid blue;
  display: flex;
  flex-direction: column;
  padding: 15px;
  /* align-items: center; */
`;
export const FormInputLabel = styled.label`
  text-align: left;
  display: flex;
  flex-direction: column;
  width: 200px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const FormInput = styled(Field)`
  margin-top: 5px;
`;

export const FormBtn = styled.button`
  width: 100px;
  padding: 5px;
  border-radius: 5px;
  border: none;
  background-color: #29cec6;
`;
export const FormErrorMessage = styled.div`
  color: red;
`;

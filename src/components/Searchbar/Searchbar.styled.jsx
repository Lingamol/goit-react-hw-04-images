import styled from '@emotion/styled';
import { Form, Field } from 'formik';
export const SearchBar = styled.header`
  /* width: 230px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid blue;
  display: flex;
  flex-direction: column;
  padding: 15px; */
  /* align-items: center; */
  top: 0;
  left: 0;
  position: sticky;
  /* z-index: 1100; */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const SearchForm = styled(Form)`
  /* width: 230px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid blue;
  display: flex;
  flex-direction: column;
  padding: 15px; */
  /* align-items: center; */
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

export const FormInput = styled(Field)`
  /* margin-top: 5px; */
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;
  &::placeholder {
    font: inherit;
    font-size: 18px;
  }
`;

export const FormBtn = styled.button`
  /* width: 100px;
  padding: 5px;
  border-radius: 5px;
  border: none;
  background-color: #29cec6; */
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  /* background-image: url('https://image.flaticon.com/icons/svg/149/149852.svg'); */
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 1;
  }
`;
export const FormErrorMessage = styled.div`
  color: red;
  background-color: #3f51b5;
`;

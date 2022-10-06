import { Formik, ErrorMessage } from 'formik';
// import PropTypes from 'prop-types';
// import { ReactComponent as Envelope } from '../img/envelope.svg';
import {
  SearchForm,
  FormInput,
  FormErrorMessage,
  SearchBar,
  // SearchFormButtonLabel,
  FormBtn,
  SvgBtn,
} from './Searchbar.styled';
import * as yup from 'yup';
import { Component } from 'react';

class Searchbar extends Component {
  initialValues = { search: '' };

  onSubmitForm = (values, { resetForm }) => {
    console.log('values', values);
    //   console.log('actions', actions);
    this.props.onSubmit(values);
    resetForm();
  };

  schema = yup.object().shape({
    search: yup
      .string()
      .max(20)
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .required(),
  });

  render() {
    return (
      <SearchBar className="searchbar">
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.schema}
          onSubmit={this.onSubmitForm}
        >
          <SearchForm className="form">
            <FormBtn type="submit" className="button" aria-label="Search">
              <SvgBtn />
              {/* <SearchFormButtonLabel className="button-label">
              Search
            </SearchFormButtonLabel> */}
            </FormBtn>

            <FormInput
              className="input"
              name="search"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <ErrorMessage name="search" component={FormErrorMessage} />
          </SearchForm>
        </Formik>
        {/* <Envelope width="90" height="90" color="red" /> */}
      </SearchBar>
    );
  }
}
export default Searchbar;

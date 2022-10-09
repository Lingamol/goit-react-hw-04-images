import { Formik, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
// import { ReactComponent as Envelope } from '../img/envelope.svg';
import {
  SearchForm,
  FormInput,
  FormErrorMessage,
  SearchBarWrapper,
  // SearchFormButtonLabel,
  FormBtn,
  SvgBtn,
  FormRadioInput,
  RadioWraper,
  LabelRadio,
} from './Searchbar.styled';
import * as yup from 'yup';
import { Component } from 'react';

class SearchBar extends Component {
  initialValues = {
    search: '',
    pagination: this.props.paginationMode ? 'Pagination' : 'LoadMore',
  };

  onSubmitForm = (values, { resetForm }) => {
    // console.log('values', values);
    //   console.log('actions', actions);
    this.props.onSubmit(values);
    // resetForm();
  };

  schema = yup.object().shape({
    search: yup
      .string()
      .max(20)
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'Search may contain only letters, apostrophe, dash and spaces. '
      )
      .required(),
  });

  render() {
    return (
      <SearchBarWrapper className="searchbar">
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.schema}
          onSubmit={this.onSubmitForm}
        >
          <SearchForm className="form">
            <FormBtn
              type="submit"
              disabled={this.props.isSabmiting}
              className="button"
              aria-label="Search"
            >
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
            {/* <div id="my-radio-group">Pagination select</div> */}
            <RadioWraper role="group" aria-labelledby="my-radio-group">
              <LabelRadio>
                <FormRadioInput
                  type="radio"
                  name="pagination"
                  value="LoadMore"
                />
                LoadMore
              </LabelRadio>
              <LabelRadio>
                <FormRadioInput
                  type="radio"
                  name="pagination"
                  value="Pagination"
                />
                Pagination
              </LabelRadio>
            </RadioWraper>
          </SearchForm>
        </Formik>
        {/* <Envelope width="90" height="90" color="red" /> */}
      </SearchBarWrapper>
    );
  }
}
export default SearchBar;
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  paginationMode: PropTypes.bool.isRequired,
  isSabmiting: PropTypes.bool.isRequired,
};

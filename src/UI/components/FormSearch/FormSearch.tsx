import { observer } from 'mobx-react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';

import { booksStore } from '../../../stores/BooksStore';
import { categoriesData, sortingData } from '../../../mockData';

import './FormSearch.scss';

type FormSearchProps = {
    setSearch: (arg: string) => void,
    setCategory: (arg: string) => void,
    setSort: (arg: string) => void,
    setLoader: (arg: boolean | undefined) => void,
}

const FormSearch = observer(({ setSearch, setCategory, setSort, setLoader }: FormSearchProps) => {

    const optionCategory = categoriesData.map((item, i) => {
        return (
            <option value={item} key={i}>{item}</option>
        )
    });

    const optionSort = sortingData.map((item, i) => {
        return (
            <option value={item} key={i}>{item}</option>
        )
    });

    return (
        <div className="form__container">
            <Formik
                initialValues={{
                    searchName: '',
                    categories: 'all',
                    sorting: 'relevance'
                }}
                onSubmit={async ({ searchName, categories, sorting }) => {
                    booksStore.clearBooks();
                    setLoader(true)
                    await booksStore.loadBooks(searchName ? searchName : categories, 0, sorting)
                    setSearch(searchName);
                    setCategory(categories);
                    setSort(sorting);
                    setLoader(false)

                }}
            >
                <Form className="form__search">
                    <div className="form__search-wrapper">
                        <Field
                            className="form__search_searchName"
                            id="searchName"
                            name='searchName'
                            type='text'
                            placeholder="Book Search"
                        />
                        <div className="form__search_selects">
                            <div>
                                <label className="form__search_label" htmlFor="categories">Categories</label>
                                <Field
                                    className="form__search_select"
                                    component="select"
                                    id="categories"
                                    name="categories"
                                    multiple={false}
                                >
                                    {optionCategory}
                                </Field>
                            </div>
                            <div>
                                <label className="form__search_label" htmlFor="sorting">Sorting by</label>
                                <Field
                                    className="form__search_select"
                                    component="select"
                                    id="sorting"
                                    name="sorting"
                                    multiple={false}
                                >
                                    {optionSort}
                                </Field>
                            </div>
                        </div>
                        <button
                            type='submit'
                            className="button button__search"
                        >
                            find
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="book__search-error" name="bookName" />
                </Form>
            </Formik>
        </div>
    )
})

export default FormSearch;


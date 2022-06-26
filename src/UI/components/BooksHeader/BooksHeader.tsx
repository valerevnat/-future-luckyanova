import { observer } from 'mobx-react';
import FormSearch from '../FormSearch/FormSearch';

import './booksHeader.scss';

type BooksHeaderProps = {
    setSearch: (arg: string) => void,
    setCategory: (arg: string) => void,
    setSort: (arg: string) => void,
    setLoader: (arg: boolean | undefined) => void,
}

const BooksHeader = observer(({ setSearch, setCategory, setSort, setLoader }: BooksHeaderProps) => {

    return (
        <div className="header">
            <div className="header__title">
                Search for books
            </div>
            <div className="header__forms">
                <FormSearch
                    setSearch={setSearch}
                    setCategory={setCategory}
                    setSort={setSort}
                    setLoader={setLoader}
                />
            </div>
        </div>
    )
})

export default BooksHeader;
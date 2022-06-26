import { useState } from "react";

import BooksHeader from "../../BooksHeader/BooksHeader";
import BooksList from "../../BooksList/BooksList";

const BooksPage = () => {

    const [search, setSearch] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<string>('');
    const [loader, setLoader] = useState<boolean>();

    return (
        <>
            <BooksHeader
                setSearch={setSearch}
                setCategory={setCategory}
                setSort={setSort}
                setLoader={setLoader}
            />
            <BooksList
                searchData={search}
                categoryData={category}
                sortData={sort}
                setLoader={setLoader}
                loader={loader}
            />
        </>
    )
}

export default BooksPage;
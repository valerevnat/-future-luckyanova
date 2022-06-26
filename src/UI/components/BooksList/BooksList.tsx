import { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

import { booksStore } from '../../../stores/BooksStore';
import Modal from '../Modal/Modal';
import BookInfo from '../BookInfo/BookInfo';
import Spinner from '../Spinner/Spinner';

import '../../../styles/buttons.scss';
import './booksList.scss';

type BooksListProps = {
    searchData: string,
    categoryData: string,
    sortData: string,
    setLoader: (arg: boolean | undefined) => void,
    loader: boolean | undefined;
}

const BooksList = observer(({ searchData, setLoader, loader }: BooksListProps) => {

    const [modalActive, setModalActive] = useState(false);
    const [bookInfo, setBookInfo] = useState([]);
    const start = booksStore.books?.length + 1
    const spinner = loader ? <Spinner /> : null;


    useEffect(() => {
        const initialRequest = async () => {
            setLoader(true)
            await booksStore.loadBooks(searchData ? searchData : 'all', 0);
            setLoader(false)
        }
        initialRequest();
    }, [])

    const updateBook = async (id: string) => {
        await booksStore.loadBookById(id);
        const book: any = booksStore.bookByID;

        setBookInfo(book.volumeInfo);
    }

    const loadMore = async () => {
        await booksStore.loadBooks(searchData ? searchData : 'all', start);
    }

    const elements = booksStore.books?.map((item) => {
        const { id } = item;
        const { authors, categories, title } = item.volumeInfo;
        const { thumbnail } = item.volumeInfo.imageLinks;

        return (
            <li
                className='books__item'
                key={id}
                onClick={async () => {
                    setModalActive(true);
                    await updateBook(id);
                }}
            >
                <div className="books__img"><img src={thumbnail} alt={title} /></div>
                <div className="books__categories">{categories}</div>
                <div className="books__title-img">{title.length > 25 ? `${title.slice(0, 25)}...` : title}</div>
                <div className="books__authors">{authors ? authors[0] : 'Author unknown'}</div>
            </li>
        )
    });

    return (
        <div className="books__content">
            {spinner}
            <div
                className="books__amount"
                style={{
                    display: loader ? 'none' : 'block'
                }}
            > Found {booksStore.totalItems} results </div>
            <ul className="books__grid"
            >
                {elements}
            </ul>
            <button
                className="button"
                disabled={false}
                onClick={loadMore}
                style={{
                    display: loader ? 'none' : 'block'
                }}
            >
                <div className="inner">load more</div>
            </button>
            <Modal
                active={modalActive}
                setActive={setModalActive}>
                <button className='button button_mini'
                    onClick={() => setModalActive(false)}>X</button>
                <BookInfo
                    bookInfo={bookInfo} />
            </Modal>
        </div>
    );
})

export default BooksList;



import { observer } from "mobx-react";

import './bookInfo.scss';


type BooksInfoProps = {
    bookInfo: any,
}


const BookInfo = observer(({ bookInfo }: BooksInfoProps) => {

    const { authors, categories, title, subtitle } = bookInfo;
    const { thumbnail } = bookInfo.imageLinks ? bookInfo.imageLinks : 'Not found image';


    return (
        <div className="info">
            <div className="info__container">
                <div className="info__books">
                    <div>
                        <img src={thumbnail} alt={title} />
                    </div>
                </div>
                <div className="info__descr">
                    <div className="info__descr_category">{categories}</div>
                    <div className="info__descr_title">{title}</div>
                    <div className="info__descr_author">{authors}</div>
                    <div className="info__descr_text">{subtitle}</div>
                </div>
            </div>

        </div >
    )
})


export default BookInfo;
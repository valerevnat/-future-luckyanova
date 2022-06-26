import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { getAllBooks, getBookById } from '../api'

class BooksStore {
    private _books: any[] = [];
    private _totalItems: number = 0;
    private _bookByID: any[] = [];


    constructor() {
        makeAutoObservable(this);
    }

    get books() {
        return toJS(this._books);
    }

    get totalItems() {
        return toJS(this._totalItems);
    }

    get bookByID() {
        return toJS(this._bookByID);
    }

    async loadBooks(q: string, startIndex: number, orderBy?: string) {
        const data = (await getAllBooks(q, startIndex, orderBy)).data;
        const books = await data.items;
        const totalItems = data.totalItems;

        runInAction(() => {
            this._books = [...toJS(this._books), ...books];
            this._totalItems = toJS(totalItems);
        })
    }

    async loadBookById(id: string) {
        const data = (await getBookById(id)).data;
        runInAction(() => {
            this._bookByID = data;
        })
    }

    clearBooks() {
        this._books = [];
    }
}

export const booksStore = new BooksStore();


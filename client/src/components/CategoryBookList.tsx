import '../types';
import '../assets/css/CategoryBookList.css';
import CategoryBookListItem from './CategoryBookListItem';
import CategoryNav from './CategoryNav';
import {BookItem, backendApi} from "../types";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Loader from "./Loader";

function CategoryBookList() {

    const {categoryId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState([]);
    useEffect(() => {
        axios.get(`http://${backendApi}/api/categories/name/${categoryId}/books`)
            .then((result) => {
                setBooks(result.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, [categoryId]);
    localStorage.setItem('joblincategoryId', categoryId as string);
    return (
        <>{isLoading ? <Loader/> : <><CategoryNav/>
                <div className="category-book-list">
                    {books.map((books: BookItem) => (
                        <CategoryBookListItem key={books.bookId} bookId={books.bookId} isPublic={books.isPublic}
                                              price={books.price} title={books.title} author={books.author} categoryId={books.categoryId}/>))}
                </div>
        </>
        }
        </>
    )
}

export default CategoryBookList;

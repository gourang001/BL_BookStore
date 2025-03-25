import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Books from "./Books";
import bookCover from "../../assets/bookImage.png";
import bookCover2 from "../../assets/bookImage2.png";
import bookCover3 from "../../assets/Image 12.png";
import bookCover4 from "../../assets/Image 23.png";
import bookCover5 from "../../assets/Image 36.png";
import bookCover6 from "../../assets/Image 7.png";
import bookCover7 from "../../assets/Image 22.png";
import bookCover8 from "../../assets/Image 18.png";
import { fetchBooks } from "../../Redux/bookSlice";
import type { RootState } from "../../Redux/store";

const bookCovers = [
  bookCover,
  bookCover2,
  bookCover3,
  bookCover4,
  bookCover5,
  bookCover6,
  bookCover7,
  bookCover8,
];

const BooksCard = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(fetchBooks() as any); 
  }, [dispatch]);

  
  const booksWithCovers = books.map((book) => ({
    ...book,
    pic: bookCovers[Math.floor(Math.random() * bookCovers.length)],
  }));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {booksWithCovers.map((book: any, index: number) => (
        <NavLink key={index} to={`/bookDetail/${book._id}`} state={{ book }}>
          <div className="flex justify-center">
            <Books book={book} />
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default BooksCard;
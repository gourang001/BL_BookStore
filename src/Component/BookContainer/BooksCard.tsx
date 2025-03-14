import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Books from "./Books";
import bookCover from "../../assets/bookImage.png";
import bookCover2 from "../../assets/bookImage2.png";
import bookCover3 from "../../assets/Image 12.png";
import bookCover4 from "../../assets/Image 23.png";
import bookCover5 from "../../assets/Image 36.png";
import bookCover6 from "../../assets/Image 7.png";
import bookCover7 from "../../assets/Image 22.png";
import bookCover8 from "../../assets/Image 18.png";
import { getAllBooks } from "../../Utils/API.js";

// Array of all book covers
const bookCovers = [
  bookCover,
  bookCover2,
  bookCover3,
  bookCover4,
  bookCover5,
  bookCover6,
  bookCover7,
  bookCover8
];

const BooksCard = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const results = await getAllBooks();

        const updatedBooks = results.map((book: any) => ({
          ...book,
          pic: bookCovers[Math.floor(Math.random() * bookCovers.length)]
        }));

        setBooks(updatedBooks);
      } catch (error) {
        // Error already logged in the API file
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {books.map((book: any, index: number) => (
        <NavLink key={index} to={`/bookDetail/${book._id}`} state={{ book }}>
          <div className='flex justify-center'>
            <Books book={book} />
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default BooksCard;


// import React from "react";
// import bookCover from '../../assets/bookImage.png'
// import bookCover2 from '../../assets/bookImage2.png'
// import { NavLink } from "react-router-dom";
// import Books from "./Books";


// const books = [
//     {
//       title: "Don't Make Me Think",
//       author: "Steve Krug",
//       rating: 4.5,
//       price: 1500,
//       pic: bookCover
//     },
//     {
//       title: "Don't Make Me Think",
//       author: "Steve Krug",
//       rating: 4.5,
//       price: 1500,
//       pic: bookCover
//     },
//     {
//       title: "Don't Make Me Think",
//       author: "Steve Krug",
//       rating: 4.5,
//       price: 1500,
//       pic: bookCover
//     },
//     {
//       title: "Don't Make Me Think",
//       author: "Steve Krug",
//       rating: 4.5,
//       price: 1500,
//       pic: bookCover
//     },
//     {
//       title: "Don't Make Me Think",
//       author: "Steve Krug",
//       rating: 4.5,
//       price: 1500,
//       pic: bookCover2
//     },
//     {
//       title: "Don't Make Me Think",
//       author: "Steve Krug",
//       rating: 4.5,
//       price: 1500,
//       pic: bookCover2
//     },
//     {
//       title: "Don't Make Me Think",
//       author: "Steve Krug",
//       rating: 4.5,
//       price: 1500,
//       pic: bookCover2
//     },
//     {
//       title: "Don't Make Me Think",
//       author: "Steve Krug",
//       rating: 4.5,
//       price: 1500,
//       pic: bookCover2
//     },
//     {
//       title: "Don't Make Me Think",
//       author: "Steve Krug",
//       rating: 4.5,
//       price: 1500,
//       pic: bookCover
//     },
//     {
//       title: "Don't Make Me Think",
//       author: "Steve Krug",
//       rating: 4.5,
//       price: 1500,
//       pic: bookCover
//     },
//     {
//       title: "Don't Make Me Think",
//       author: "Steve Krug",
//       rating: 4.5,
//       price: 1500,
//       pic: bookCover
//     },
//     {
//       title: "Don't Make Me Think",
//       author: "Steve Krug",
//       rating: 4.5,
//       price: 1500,
//       pic: bookCover
//     },
//   ]
  

// const BooksCard = () => {
//   return (
//     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
//       {books.map((book, index) => (
//         <NavLink 
//           key={index}
//           to={{
//             pathname: `/bookDetail/${index}`,
//             state: { book }  // Pass book data through NavLink state
//           }}
//         >
//           <div className='flex justify-center'>
//             <Books book={book} />
//           </div>
//         </NavLink>
//       ))}
//     </div>
//   );
// };

// export default BooksCard;

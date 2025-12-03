import { getTopBooks } from "./api/apiBooks.js";
import { useEffect, useState } from "react";
let Topbooks = ({ lisaabtn }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      try {
        const data = await getTopBooks();
        setBooks(data);
      } catch (err) {
        console.error("Failed to get the books");
      }
    };
    fetchData();
  }, []);

  return (
    <div id="container">
      <h2>Kirjat</h2>
      <div id="kirjat">
        {books.map((k) => (
          <div key={k.book_id} className="kirjakortti">
            <img src={`${k.img_url}`} alt={k.title} width={300} height={400} /> <br />
            {`Nimi: ${k.title}`} <br />
            {`Julkaisija: ${k.author}`} <br />
            {`Hinta: ${k.price}`} <br />
            <button onClick={() => lisaabtn(k)}>Lisää ostoskoriin</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topbooks;

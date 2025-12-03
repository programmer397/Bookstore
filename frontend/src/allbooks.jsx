import "./styles/kirjat.css";
let Kirjatiedot = ({ books, lisaabtn }) => {
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

export default Kirjatiedot;

let Ostoskori = ({ ostoskori, setOstoskori }) => {
  if (ostoskori.length === 0) {
    return <p>Ostoskori on tyhjä</p>;
  }

  const kokonaishinta = ostoskori.reduce((summa, kirja) => summa + kirja.price * kirja.maara, 0).toFixed(2);

  let lisaakpl = (k) => {
    setOstoskori(ostoskori.map((kirja) => (kirja.book_id === k.book_id ? { ...kirja, maara: kirja.maara + 1 } : kirja)));
  };
  let miinuskpl = (k) => {
    setOstoskori(ostoskori.map((kirja) => (kirja.book_id === k.book_id && k.maara > 1 ? { ...kirja, maara: kirja.maara - 1 } : kirja)));
  };

  let poista = (k) => {
    setOstoskori(ostoskori.filter((kirja) => k.book_id !== kirja.book_id));
  };
  return (
    <>
      <div id="ostoskori">
        {ostoskori.map((k) => (
          <div className="ostoskirja" key={k.book_id}>
            <img src={k.img_url} alt={k.title} width={100} />
            <div id="kirjatiedot">
              {`Nimi: ${k.title}`}
              {`Hinta: ${k.price}`}
              {`Kpl: ${k.maara}`}
            </div>
            <div id="buttons">
              <button onClick={() => lisaakpl(k)}>+</button>
              <button onClick={() => miinuskpl(k)}>-</button>
              <button onClick={() => poista(k)}>&#128465;</button>
            </div>
          </div>
        ))}
        <p id="kokonaishinta">Summa: {kokonaishinta} €</p>
      </div>
    </>
  );
};

export default Ostoskori;

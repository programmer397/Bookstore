import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import "./styles/App.css";
import Kirjatiedot from "./allbooks.jsx";
import Ostoskori from "./ostoskori.jsx";
import Home from "./home.jsx";
import Topbooks from "./topbooks.jsx";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
import Profile from "./profile.jsx";
import MainLayout from "./components/mainLayout.jsx";
import AuthLayout from "./components/authLayout.jsx";
import { getBooks } from "./api/apiBooks.js";
import { useState, useEffect } from "react";

export default function App() {
  //Kaikki kirjat
  const [books, setBooks] = useState([]);
  useEffect(() => {
    let fetchData = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        console.error("Failed to get the books");
      }
    };
    fetchData();
  }, []);
  //Ostoskori
  const [ostoskori, setOstoskori] = useState([]);

  useEffect(() => {
    console.log("Ostoskori päivittyi:", ostoskori);
  }, [ostoskori]);

  const lisaaOstoskoriin = (kirja) => {
    const olemassa = ostoskori.find((k) => k.book_id === kirja.book_id);
    if (olemassa) {
      setOstoskori(
        ostoskori.map((k) => {
          if (k.book_id === kirja.book_id) {
            return { ...k, maara: k.maara + 1 };
          } else {
            return k;
          }
        })
      );
    } else {
      setOstoskori([...ostoskori, { ...kirja, maara: 1 }]);
    }
  };

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/books"
            element={
              <MainLayout>
                <Kirjatiedot books={books} lisaabtn={lisaaOstoskoriin} />
              </MainLayout>
            }
          />
          <Route
            path="/ostoskori"
            element={
              <MainLayout>
                <Ostoskori ostoskori={ostoskori} setOstoskori={setOstoskori} />
              </MainLayout>
            }
          />
          <Route
            path="/home"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/topbooks"
            element={
              <MainLayout>
                <Topbooks />
              </MainLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <MainLayout>
                <Profile />
              </MainLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <Signup />
              </AuthLayout>
            }
          />
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

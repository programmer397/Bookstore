import "./styles/home.css";

import { useNavigate } from "react-router-dom";

let Home = () => {
  const navigate = useNavigate();
  //Hover hidastus

  const handleMouseEnter = () => {
    document.querySelectorAll(".group").forEach((group) => {
      const anim = group.getAnimations()[0];
      if (anim) anim.playbackRate = 0.0;
    });
  };

  const handleMouseLeave = () => {
    document.querySelectorAll(".group").forEach((group) => {
      const anim = group.getAnimations()[0];
      if (anim) anim.playbackRate = 1;
    });
  };

  return (
    <>
      <div id="home-bg">
        <div id="introduction">
          <div id="introduction-bg">
            <h2>Welcome to Storyscape</h2>
            <p>
              Your Gateway to the Best Fantasy Reads! Discover a carefully curated collection of the finest fantasy books, from timeless classics to
              modern epics. Our site is dedicated to helping readers explore imaginative worlds, unforgettable characters, and thrilling adventures.
              Whether you’re a seasoned fantasy fan or just beginning your journey, you’ll find recommendations, top picks, and detailed pages for
              each book to guide your next great read. At Storyscape, we believe that every story matters. Our goal is to celebrate the creativity of
              fantasy literature, making it easy to find books that inspire, entertain, and transport you to new worlds. Dive into our collections,
              explore themed anthologies, or discover hidden gems — there’s something here for every reader. Join us on a journey through magic,
              heroism, and imagination. Explore, discover, and get lost in the worlds of fantasy!
            </p>
          </div>
        </div>
        <div>
          <div className="carousel-wrapper" onClick={() => navigate("/books")}>
            <div className="carousel" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="group">
                <img src="/kuvat/cherry.webp" alt="" className="card" />
                <img src="/kuvat/detective.jpg" alt="" className="card" />
                <img src="/kuvat/fire.jpg" alt="" className="card" />
                <img src="/kuvat/ice.jpg" alt="" className="card" />
                <img src="/kuvat/war.jpg" alt="" className="card" />
                <img src="/kuvat/fire.jpg" alt="" className="card" />
              </div>
              <div aria-hidden className="group">
                <img src="/kuvat/cherry.webp" alt="" className="card" />
                <img src="/kuvat/detective.jpg" alt="" className="card" />
                <img src="/kuvat/fire.jpg" alt="" className="card" />
                <img src="/kuvat/ice.jpg" alt="" className="card" />
                <img src="/kuvat/war.jpg" alt="" className="card" />
                <img src="/kuvat/fire.jpg" alt="" className="card" />
              </div>
              <div className="carousel-text-container">
                <button type="button" className="btn-grad">
                  Check all of our books here!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;

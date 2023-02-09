import React from "react";
import Draggable from "react-draggable";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/434i5j.png",
  });
  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main className="mid">
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />

        <button className=" pushable form--button" onClick={getMemeImage}>
          <span className="front">Get a new meme image 🖼</span>
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />

        <Draggable>
          <h2 className="  meme--text top">{meme.topText}</h2>
        </Draggable>

        <Draggable>
          <h2 className=" meme--text bottom">{meme.bottomText}</h2>
        </Draggable>
      </div>
    </main>
  );
}

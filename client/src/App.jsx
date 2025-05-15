import { useState } from "react";
import "./App.css";
import { IoIosSend } from "react-icons/io";
import ImageGrid from "./Components/ImageGrid";
import axios from "axios";

function App() {
  const [grid, setGrid] = useState();
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handelClick = async () => {
    const response = await axios.post("http://localhost:5000/", {
      prompt: prompt,
    });

    if (response.status != 200) {
      alert("Error: " + response.statusText);
    } else {
      setGrid(response.data.image);
      setHistory([
        {
          prompt: prompt,
          image: response.data.image,
        },
        ...history,
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handelClick();
    }
  }

  return (
    <section className="h-screen w-screen flex items-center justify-center flex-row">
      <div className="w-2xs h-full bg-gray-800 flex flex-col justify-start items-center gap-2">
        {history.map((his, i) => {
          return (
            <div
              key={i}
              className="w-full h-15 px-5 text-white flex flex-row justify-between items-center"
            >
              <p className="text-sm">{his.prompt}</p>
              <button
                onClick={() => {
                  setGrid(his.image);
                  setPrompt(his.prompt);
                }}
                className="w-7.5 h-7.5 bg-transparent border-none flex justify-center items-center active:scale-90"
              >
                <IoIosSend className="text-5xl" />
              </button>
            </div>
          );
        })}
      </div>
      <div className="bg-gray-900 h-full w-full flex items-center justify-center flex-col gap-15">
        {grid && <ImageGrid grid={grid} />}
        <div className="w-2xl h-15 bg-gray-800 rounded-3xl px-5 text-white border-white border flex flex-row justify-start items-center">
          <input
            value={prompt}
            onChange={handleChange}
            type="text"
            placeholder="Give me a Prompt"
            className="h-full w-full px-5 border-none outline-none"
            onKeyDown={handleKeyDown}
          ></input>
          <button
            onClick={handelClick}
            className="w-7.5 h-7.5 bg-transparent border-none flex justify-center items-center active:scale-95"
          >
            <IoIosSend className="text-5xl" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;

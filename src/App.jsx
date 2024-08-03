import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [number, setnumber] = useState(false);
  const [character, setcharacter] = useState(false);
  const [Password, setpassword] = useState();

  const PasswordRef = useRef(null);

  const PasswordGenreator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "123567890";
    if (character) str += "!@#$%^&*()-+~";

    for (let i = 1; i <= length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }

    setpassword(pass);
  }, [length, number, character, setpassword]);

  useEffect(() => {
    PasswordGenreator();
  }, [length, number, character, PasswordGenreator]);

  const copyToClipBoard = useCallback(() => {
    PasswordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  return (
    <>
      <div
        className="w-full max-w-xl mx-auto shadow-lg rounded-lg px-4
      m-8 text-orange-500 bg-gray-600 "
      >
        Password Genereator
        <div className="flex shadow-2xl bg-slate-500 rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            placeholder="Password"
            className="outline-none w-full py-1 px-3 m-3 rounded-lg"
            readOnly
            ref={PasswordRef}
          />

          <button
            onClick={copyToClipBoard}
            className="bg-blue-600 rounded-lg outline-none px-3 py-0.5 shrink-0 m-2"
          >
            Copy
          </button>
        </div>
        <div className="flex text gap-x-2 ">
          <div className="flex items-center gap-x-1 mb-4">
            <input
              type="range"
              min={8}
              max={16}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(parseInt(e.target.value));
              }}
            />
            <label>Length : {length}</label>
          </div>

          <div>
            <input
              type="checkbox"
              checked={number}
              onChange={(e) => {
                setnumber(e.target.checked);
              }}
            />
            <label className="">Numbers</label>
          </div>

          <div>
            <input
              type="checkbox"
              checked={character}
              onChange={(e) => {
                setcharacter((prev) => !prev);
              }}
            />
            <label className="text-sm ">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

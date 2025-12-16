
import React, {  useState } from "react";


export default function TragarSzoKereso() {
  const [text, setText] = useState("");
  
  const badWords = ["csúnyaszó1", "csúnya2", "csúnya"];

  const highlightBadWords = (input) => {
    let output = input;

    badWords.forEach((word) => {
      
      if (output.toLowerCase().includes(word.toLowerCase())) {

        const pattern = new RegExp(word, "gi");

        output = output.replace(pattern, (match) => {
          return `<span class="bad-word">${match}</span>`;
        });
      }
    });

    return output;
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Írd ide a szöveget…"
        rows={5}
      />

      <div
        className="output"
        dangerouslySetInnerHTML={{ __html: highlightBadWords(text) }}
      ></div>

      <style>{`
        .bad-word {
          background-color: red;
          color: white;
          padding: 2px 4px;
          border-radius: 4px;
        }

        .output {
          margin-top: 10px;
          white-space: pre-wrap;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}








































/*
import React, { useState } from "react";



export default function TragarSzoKereso() {
  const [text, setText] = useState("");

  const badWords = [
    "csúnya1",
    "csúnya2",
    "csúnya"
  ];

  const TragarSzoKereso = (input) => {
    const pattern = new RegExp(`\\b(${badWords.join("|")})\\b`, "gi");
    return input.replace(pattern, (match) => {
      return `<span class="bad-word">${match}</span>`;
    });
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Írd ide a szöveget…"
        rows={5}
      />

      <div
        className="output"
        dangerouslySetInnerHTML={{ __html: TragarSzoKereso(text) }}
      ></div>

      <style>{`
        .bad-word {
          background-color: red;
          color: white;
          padding: 2px 4px;
          border-radius: 4px;
        }

        .output {
          margin-top: 10px;
          white-space: pre-wrap;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}
  */
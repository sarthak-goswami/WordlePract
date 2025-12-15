import "./App.css";

import React, { useEffect, useState } from "react";

const App = () => {
  const [solution, setSolution] = useState("REACT");
  const [guesses, setGuesses] = useState(
    new Array(6).fill(new Array(5).fill(""))
  );
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(new Array(5).fill(""));
  const [turn, setTurn] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
 
  //useEffect for getting the correct word
  useEffect(() => {
    setSolution("Apple");
  }, []);

  function checkAnswer(solution, guess) {
    const solArray = solution.toUpperCase().split("");
    let Result=[];
    if(guess===solArray){
      let i =0;
      console.log("correct answer");
      guess.forEach((letter)=>{
        Result[i]={letter,status:"correct"}
      })
      return
    }
    let place = 0;
    guess.forEach(index => {
      if(index===solArray[place]){
        console.log(index," it is at the right place ")
        Result[place]={index,status:"correct"}
      }
      else if(solArray.includes(index)){
        console.log(index," solution includes")
        Result[place]={index,status:"present"}
      }
      else {
        console.log(index," is not present");
        Result[place]={index,status:"absent"}
      }
        place++;
    });

    console.log(Result)
    return Result;
  }

  useEffect(() => {
    //this works perfectly no changes required 😎😎
    const handleKeyDown = (e) => {
      if (gameStatus != "playing") return;
      // console.log("key pressed", e.key);

      if (e.key === "Backspace") {
        handleBackspace();
      }
      if (e.key === "Enter") {
        handleEnter();
        checkAnswer(solution, currentGuess);
      }
      if (/^[a-zA-Z]$/.test(e.key)) {
        // console.log("key inside the handler:", e.key);
        handleLetter(e.key.toUpperCase());
      } else {
        return;
      }
    };
    //this function is working properly no need to edit 😎😎
    function handleBackspace() {
      setCurrentGuess((prevGuess) => {
        if (letterCount === 0) return prevGuess;

        const newGuess = [...prevGuess];
        const indexToRemove = letterCount - 1;
        newGuess[indexToRemove] = "";
        setGuesses((prevGuesses) => {
          const newGuesses = [...prevGuesses];
          newGuesses[wordCount] = newGuess;
          return newGuesses;
        });
        return newGuess;
      });
      setLetterCount((prev) => Math.max(prev - 1, 0));
    }

    function handleEnter() {
      // console.log("Enter is handle correctly");
      // console.log("enter wale new guesses", guesses);
      if (wordCount > 4) {
        return;
      }
      if (currentGuess.includes("") == 1) {
        return;
      }

      setWordCount((prevWordCount) => {
        const newWordCount = prevWordCount + 1;
        setGuesses((prevGuesses) => {
          const newGuesses = [...prevGuesses];
          newGuesses[newWordCount] = new Array(5).fill("");
          setCurrentGuess(["", "", "", "", ""]);

          return newGuesses;
        });
        return newWordCount;
      });

      setLetterCount(0);
    }

    function handleLetter(key) {
      if (letterCount >= 5) {
        return;
      }
      //

      setCurrentGuess((prevGuess) => {
        const newGuess = [...prevGuess];
        newGuess[letterCount] = key;
        setGuesses((prevGuesses) => {
          const newGuesses = [...prevGuesses];
          newGuesses[wordCount] = newGuess;
          return newGuesses;
        });

        return newGuess;
      });

      setLetterCount((prev) => prev + 1);
    }

    console.log("current guess array", currentGuess);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guesses, turn, gameStatus, wordCount, letterCount]);

  

  return (
    <main>
      <h1>WORDLE</h1>
      {guesses.map((word, index) => {
        return <WordLine key={index} word={word} />;
      })}
    </main>
  );
};

function WordLine({ word }) {
  return (
    <div className="row">
      {word.map((cell, i) => {
        return <LetterShow key={i} letter={cell}  />;
      })}
    </div>
  );
}

function LetterShow({ letter }) {
  return <div  className="cell">{letter}</div>;
}

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");

  const appendValue = (value) => {
    if (display.length >= 20) return;
    setDisplay((prev) => prev + value);
  };

  const clearDisplay = () => setDisplay("");
  const deleteLast = () => setDisplay((prev) => prev.slice(0, -1));

  const calculate = () => {
    try {
      const fixed = display
        .replace(/log10\(/g, "Math.log10(")
        .replace(/e\^\(/g, "Math.exp(")
        .replace(/Math\.log10\(([^()]*)$/, 'Math.log10($1)')
        .replace(/log2\(/g, "Math.log2(")
        .replace(/log3\(/g, "Math.log(x) / Math.log(3)")
        .replace(/(\d+)\s*\/\/\s*(\d+)/g, 'Math.floor($1 / $2)')
        .replace(/round\(([^()]+)\)/g, 'Math.round($1)')
  
      const result = eval(fixed);
      if (
        result === Infinity ||
        result === -Infinity ||
        isNaN(result)
      ) {
        setDisplay("Error");
      } else {
        setDisplay(result.toString());
      }
    } catch {
      setDisplay("Error");
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        deleteLast();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <h1 className="title">Calculator: Simplifying the World, One Click at a Time 💡</h1>
      <div className="calculator">
        <input type="text" className="display" value={display} readOnly />
        <div className="buttons">
          <button onClick={clearDisplay}>C</button>
          <button onClick={() => appendValue("/")}>/</button>
          <button onClick={() => appendValue("*")}>*</button>
          <button onClick={deleteLast}>←</button>

          <button onClick={calculate}>=</button>
          <button onClick={() => appendValue("**")}>xʸ</button>
          <button onClick={() => appendValue("%")}>%</button>
          <button onClick={() => appendValue("e^(")}>e^x</button>
          <button onClick={() => appendValue("9")}>9</button>
          <button onClick={() => appendValue("8")}>8</button>
          <button onClick={() => appendValue("+")}>+</button>
          <button onClick={() => appendValue("-")}>-</button>
          <button onClick={() => appendValue("**2")}>x²</button>
          <button onClick={() => appendValue("7")}>7</button>
          <button onClick={() => appendValue("6")}>6</button>
          <button onClick={() => appendValue(".")}>.</button>
          <button onClick={() => appendValue("log10(")}>log</button>
          <button onClick={() => appendValue("log2(")}>log₂</button>
          <button onClick={() => appendValue("5")}>5</button>
          <button onClick={() => appendValue("4")}>4</button>
          <button onClick={() => appendValue("log3(")}>log₃</button>
          <button onClick={() => appendValue("**")}>xʸ</button>
          <button onClick={() => appendValue("**3")}>x³</button>
          <button onClick={() => appendValue("3")}>3</button>
          <button onClick={() => appendValue("2")}>2</button>
          <button onClick={() => appendValue("round(")}>round</button>
          <button onClick={() => appendValue("//")}>//</button>
          <button onClick={() => appendValue("1")}>1</button>
          <button onClick={() => appendValue("0")} className="zero">0</button>
        </div>
      </div>
    </>
  );
}

export default App;

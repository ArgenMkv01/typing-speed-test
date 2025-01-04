import React, { useState, useEffect, useRef } from "react";

const InputBox = ({ text, timer, setTimer, restart, testDuration, onRestart }) => {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const visibleTextLength = 20; // Number of characters visible at a time
  const textRef = useRef(null);

  useEffect(() => {
    if (timer > 0 && hasStarted) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, hasStarted, setTimer]);

  useEffect(() => {
    setValue("");
    setIsError(false);
    setCorrectChars(0);
    setErrorCount(0);
    setCurrentIndex(0);
    setHasStarted(false);
  }, [restart]);

  const handleInputChange = (e) => {
    if (!hasStarted) {
      setHasStarted(true);
    }

    const inputValue = e.target.value;
    const expectedChar = text[currentIndex];

    if (inputValue[inputValue.length - 1] !== expectedChar) {
      setIsError(true);
      setErrorCount((prev) => prev + 1);
      return;
    }

    setIsError(false);
    setValue(inputValue);
    setCorrectChars((prev) => prev + 1);
    setCurrentIndex((prev) => prev + 1);
  };

  const isTestCompleted = timer === 0 || currentIndex === text.length;

  const handleTestCompletion = () => {
    const speed = ((correctChars + errorCount) / testDuration).toFixed(2);
    return (
      <div className="test-completion">
        <h2>Тест завершён!</h2>
        <p>Правильных символов: {correctChars}</p>
        <p>Ошибок: {errorCount}</p>
        <p>Скорость: {speed} символов в минуту</p>
        <button onClick={onRestart}>Начать заново</button>
      </div>
    );
  };

  const getVisibleText = () => {
    return text.substring(currentIndex, currentIndex + visibleTextLength).replace(/ /g, '\u00A0'); // Заменяем пробелы на неразрывные пробелы
  };
  

  

  return (
    <div className="input-container">
      {!isTestCompleted ? (
        <>
          <p className="correct-chars">Правильные символы: {correctChars}</p>
          <p className="error-chars">Ошибки: {errorCount}</p>
          <div className="text" ref={textRef}>
            <span className="test-text">
              {getVisibleText().split("").map((char, index) => (
                <span
                  key={index}
                  className={`char ${index === 0 ? "current-char" : ""}`}
                  style={{
                    backgroundColor: isError && index === 0 ? "#ffdddd" : "transparent",
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          </div>
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            className={isError ? "error-input" : ""}
            disabled={isTestCompleted}
          />
        </>
      ) : (
        handleTestCompletion()
      )}
    </div>
  );
};

export default InputBox;

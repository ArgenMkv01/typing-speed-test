import React, { useState, useEffect } from "react";
// import InputBox from "./components/InputBox";


const App = () => {
  const texts = [
    "Дети жили, как хотели. Старший сын Вана после многочисленных болезней умер от СПИДа. Второй практически жил в свинарнике, философствуя о том, что наш мир это свалка грязи, мусора и нечистот. Дочь стала богатой и успешной. Но ее молодой любовник, скопировав ее подпись, оставил девушку без гроша в кармане. Тогда она вернулась к папе и под мантру Все сволочи, все подонки взялась за книги по самосовершенствованию.",
    "И нет сомнений, что многие известные личности лишь добавляют фракционных разногласий и указаны как претенденты на роль ключевых факторов. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: разбавленное изрядной долей эмпатии, рациональное мышление предоставляет широкие возможности для инновационных методов управления процессами! Есть над чем задуматься: интерактивные прототипы указаны как претенденты на роль ключевых факторов. Задача организации, в особенности же постоянное информационно пропагандистское обеспечение нашей деятельности создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса экспериментов, поражающих по своей масштабности и грандиозности.",
    "Прежде всего, высокое качество позиционных исследований способствует подготовке и реализации стандартных подходов. Есть над чем задуматься: диаграммы связей формируют глобальную экономическую сеть и при этом — обнародованы. Картельные сговоры не допускают ситуации, при которой интерактивные прототипы призывают нас к новым свершениям, которые, в свою очередь, должны быть подвергнуты целой серии независимых исследований.",
    "Лишь тщательные исследования конкурентов призывают нас к новым свершениям, которые, в свою очередь, должны быть указаны как претенденты на роль ключевых факторов. Как принято считать, непосредственные участники технического прогресса обнародованы. Для современного мира выбранный нами инновационный путь предполагает независимые способы реализации кластеризации усилий. Задача организации, в особенности же существующая теория способствует повышению качества стандартных подходов.",
    "Имеется спорная точка зрения, гласящая примерно следующее: стремящиеся вытеснить традиционное производство, нанотехнологии, инициированные исключительно синтетически, призваны к ответу. В частности, высокое качество позиционных исследований играет определяющее значение для прогресса профессионального сообщества. Вот вам яркий пример современных тенденций — начало повседневной работы по формированию позиции предопределяет высокую востребованность переосмысления внешнеэкономических политик. Есть над чем задуматься: стремящиеся вытеснить традиционное производство, нанотехнологии являются только методом политического участия и ограничены исключительно образом мышления.",
    "Современные технологии достигли такого уровня, что сложившаяся структура организации однозначно определяет каждого участника как способного принимать собственные решения касаемо экономической целесообразности принимаемых решений. Мы вынуждены отталкиваться от того, что социально экономическое развитие в значительной степени обусловливает важность глубокомысленных рассуждений! Лишь элементы политического процесса объективно рассмотрены соответствующими инстанциями. В своём стремлении повысить качество жизни, они забывают, что экономическая повестка сегодняшнего дня требует от нас анализа первоочередных требований.",
  ];

  const getRandomText = () => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
  };

  const [text, setText] = useState(getRandomText());
  const [timer, setTimer] = useState(0);
  const [restart, setRestart] = useState(false);
  const [testDuration, setTestDuration] = useState(1); // Default duration: 1 minute
  const [theme, setTheme] = useState("dark"); // Темная тема по умолчанию

  const handleStartTest = (duration) => {
    setTestDuration(duration);
    setText(getRandomText());
    setTimer(duration * 60);
    setRestart((prev) => !prev); // Trigger restart
  };

  const handleRestart = () => {
    setText(getRandomText());
    setTimer(testDuration * 60);
    setRestart((prev) => !prev); // Trigger restart
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`container ${theme}`}>
      <h1>Тест на скорость печати</h1>
      <button onClick={toggleTheme} className="theme-toggle">
        Переключить тему
      </button>
      <div>
        <select
          onChange={(e) => handleStartTest(Number(e.target.value))}
          defaultValue={1}
        >
          <option value={1}>1 минута</option>
          <option value={2}>2 минуты</option>
          <option value={5}>5 минут</option>
        </select>
      </div>
      <p>Оставшееся время: {timer !== null ? timer + " секунд" : "Не начат"}</p>
      <button onClick={handleRestart}>Начать заново</button>
      <InputBox
        text={text}
        timer={timer}
        setTimer={setTimer}
        restart={restart}
        testDuration={testDuration}
        onRestart={handleRestart}
      />
    </div>
  );
};

const InputBox = ({ text, timer, setTimer, restart, testDuration, onRestart }) => {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const visibleTextLength = 20; // Number of characters visible at a time

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
        {/* <button onClick={onRestart}>Начать заново</button> */}
      </div>
    );
  };

  const getVisibleText = () => {
    return text
      .substring(currentIndex, currentIndex + visibleTextLength)
      .replace(/ /g, "\u00A0");
  };


  return (
    <div className="input-container">
      {!isTestCompleted ? (
        <>
          <p className="correct-chars">Правильные символы: {correctChars}</p>
          <p className="error-chars">Ошибки: {errorCount}</p>
          <div className="text">
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


export default App;

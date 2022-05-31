import logo from "./logo.svg";
import "./App.css";
import Unity, { UnityContext } from "react-unity-webgl";
import React, { useState, useEffect } from "react";
import FullWidthTabs from "./FixedTabs"

const unityContext = new UnityContext({
  loaderUrl: "Build/Build.loader.js",
  dataUrl: "Build/Build.data.unityweb",
  frameworkUrl: "Build/Build.framework.js.unityweb",
  codeUrl: "Build/Build.wasm.unityweb",
});

function App() {
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);

  useEffect(function () {
    unityContext.on("CallReact", function (userName, score) {
      setUserName(userName);
      setScore(score);
    });
  }, []);

  function TestA() {
    unityContext.send("GameManager", "BtnClick");
  }

  return (
    <div className="App">
      <FullWidthTabs/>
      <button onClick={TestA}> 리액트 버튼 </button>
      <br />
      <br />
      {<h1>{`불렸다 저는 ${userName} 이고 점수는 ${score} 입니다.`}</h1>}
      <br />

      <Unity
        style={{
          width: "90%",
          height: "100%",
          justifySelf: "center",
          alignSelf: "center",
        }}
        unityContext={unityContext}
      />
    </div>
  );
}

export default App;

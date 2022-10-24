import "./App.css";
import { Button } from "react-bootstrap";
import { useState } from "react";

import Tesseract from "tesseract.js";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");

  const buttonOnClick = () => {
    if (!image) {
      return;
    }
    setIsLoading(true);
    setProgress(0);
    Tesseract.recognize(image, "eng", {
      logger: (m) => {
        console.log(m);
        if (m.status === "recognizing text") {
          setProgress(parseInt(m.progress * 100));
        }
      },
    }).then(({ data: { text } }) => {
      setIsLoading(false);
      setText(text);
      console.log(text);
    });
  };
  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="row d-flex justify-content-center">
        <div className="col col-md-5 d-flex flex-column align-items-center">
          <div>
            <h1 className="mt-5 mb-4">OCR 轉換</h1>
          </div>

          <>
            <input
              type="file"
              className="w-auto form-control mt-2"
              onChange={(e) => {
                console.log(e);
                setImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <Button
              disabled={!image}
              className="w-auto form-control btn btn-primary mt-2 mb-4"
              onClick={buttonOnClick}
            >
              文字轉換
            </Button>
          </>
          {isLoading && <text>辨識中: {progress}%</text>}
          <textarea
            className="form-control mt-4"
            rows={15}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;

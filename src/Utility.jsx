import { useState, useEffect } from "react";

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function typeText(fullText, speed, onComplete, startTyping) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!startTyping) return;
    if (index === fullText.length) {
      onComplete();
      return;
    }

    const interval = setInterval(
      () => {
        setText(fullText.slice(0, index + 1));
        setIndex(index + 1);
      },
      speed,
      startTyping
    );
    return () => clearInterval(interval);
  }, [index, startTyping]);

  useEffect(() => {
    setText("");
    setIndex(0);
  }, [fullText]);

  return <span>{text}</span>;
}

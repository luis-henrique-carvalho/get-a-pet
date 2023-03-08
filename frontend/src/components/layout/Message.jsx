import { useState, useEffect } from "react";
import bus from "../../utils/bus";

import { MessageStyled } from "../../styles";

function Message() {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setVisibility(false);
      }, 3000);
    });
  }, []);

  return (
    visibility && (
      <MessageStyled>
        <div className={`${type}`}>{message}</div>
      </MessageStyled>
    )
  );
}

export default Message;

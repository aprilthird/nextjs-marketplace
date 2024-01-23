"use client";

import { ChatSVGIcon } from "@react-md/material-icons";
import { useEffect, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

const ChatBubble = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    console.log(x);
  }, [x]);

  const setZero = () => {
    setX(0);
    setY(0);
  };

  return (
    <div className="absolute top-0 left-0 z-50 min-h-screen min-w-full">
      {/* <Draggable
        position={(x, y)}
        onStop={(e: DraggableEvent, data: DraggableData) => {
          setX(data.lastX);
          setY(data.lastY);
        }}
      >
        <div
          className="cursor-pointer bg-primary w-10 h-10 flex items-center justify-center rounded-full"
          onDoubleClick={setZero}
        >
          <ChatSVGIcon className="w-5 h-5" />
        </div>
      </Draggable> */}
    </div>
  );
};

export default ChatBubble;

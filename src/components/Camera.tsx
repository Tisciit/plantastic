import React, { useRef } from "react";
import { Box, Button, Center } from "@chakra-ui/react";
import { BiCamera } from "react-icons/bi";
import { useUserMedia } from "../hooks/useUserMedia";

export const Camera = (props: {
  onSnap?: (data: string) => void;
  width: number;
  height: number;
}) => {
  const { onSnap, width, height } = props;
  const stream = useUserMedia({
    video: { facingMode: "environment", width, height },
    audio: false,
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  if (stream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = stream;
  }
  console.log(stream);

  const handleSnap = () => {
    if (stream) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      videoRef.current && context && context.drawImage(videoRef.current, 0, 0);
      const d = canvas.toDataURL();
      canvas.remove();
      onSnap && onSnap(d);
    } else {
    }
  };

  return (
    <Box p={2} border="1px">
      <Center>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          onCanPlay={() => {
            videoRef.current?.play();
          }}
        />
      </Center>
      <Center my={2}>
        <Button
          rightIcon={<BiCamera />}
          onClick={() => {
            handleSnap();
          }}
        >
          Snap!
        </Button>
      </Center>
    </Box>
  );
};

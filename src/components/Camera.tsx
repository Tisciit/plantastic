import React, { useRef } from "react";
import { Box, Button, Center } from "@chakra-ui/react";
import { useUserMedia } from "../hooks/useUserMedia";

export const Camera = () => {
  const stream = useUserMedia({
    video: { facingMode: "environment" },
    audio: false,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (stream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = stream;
  }
  console.log(stream);

  const handleSnap = () => {
    const source = videoRef.current;
    const target = canvasRef.current;

    if (!source || !target) return;

    const context = target.getContext("2d");
    const w = target.width;
    const h = target.height;
    if (context) {
      context.drawImage(source, 0, 0, w, h);
    }
  };

  return (
    <Box>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        onCanPlay={() => {
          videoRef.current?.play().then(() => {
            const canvas = canvasRef.current;
            if (videoRef.current) {
              const height = videoRef.current.height;
              const widht = videoRef.current.width;
              if (canvas) {
                console.log("yeeeeeeeeeee", height);
                canvas.height = height;
                canvas.width = widht;
              }
            }
          });
        }}
      />
      <canvas ref={canvasRef}></canvas>
      <Center my={2}>
        <Button
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

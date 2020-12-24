import { useState, useEffect } from "react";

export const useUserMedia = (requestedMedia: MediaStreamConstraints) => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();

  useEffect(() => {
    const enableStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(
          requestedMedia
        );
        setMediaStream(stream);
      } catch (err) {
        alert(err);
        console.error(err);
        setMediaStream(undefined);
      }
    };

    if (!mediaStream) {
      enableStream();
    } else {
      return function cleanUp() {
        mediaStream.getTracks().forEach((track) => track.stop());
      };
    }
  }, [mediaStream, requestedMedia]);

  return mediaStream;
};

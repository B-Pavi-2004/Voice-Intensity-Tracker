import { useEffect, useState } from 'react';

export const useVoiceDetection = () => {
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let microphone: MediaStreamAudioSourceNode;
    let javascriptNode: ScriptProcessorNode;

    const setupAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);

        javascriptNode.onaudioprocess = () => {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          let values = 0;

          const length = array.length;
          for (let i = 0; i < length; i++) {
            values += array[i];
          }

          const average = values / length;
          setIntensity(average);
        };
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    setupAudio();

    return () => {
      if (javascriptNode) javascriptNode.disconnect();
      if (analyser) analyser.disconnect();
      if (microphone) microphone.disconnect();
      if (audioContext) audioContext.close();
    };
  }, []);

  return { intensity };
};
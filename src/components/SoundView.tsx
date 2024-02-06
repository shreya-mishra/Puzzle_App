/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useEffect} from 'react';
import Sound from 'react-native-sound';

type SoundViewProps = {
  isPlaySound: boolean;
};

const SoundView: FC<SoundViewProps> = ({isPlaySound}) => {
  const soundOrigin = {
    waterSound: require('../asset/water.mp3'),
  };
  const playSound = () => {
    var whoosh = new Sound(soundOrigin.waterSound, error => {
      if (error) {
        return;
      }
      whoosh.play();
    });
  };

  useEffect(() => {
    if (isPlaySound) {
      playSound();
    }
  }, [isPlaySound]);

  return null;
};

export default SoundView;

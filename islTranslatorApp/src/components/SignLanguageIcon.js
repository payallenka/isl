import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const SignLanguageIcon = ({ size = 48, color = '#a21caf' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Hand shape for sign language */}
      <Path
        d="M24 8C20.686 8 18 10.686 18 14C18 17.314 20.686 20 24 20C27.314 20 30 17.314 30 14C30 10.686 27.314 8 24 8ZM24 18C21.794 18 20 16.206 20 14C20 11.794 21.794 10 24 10C26.206 10 28 11.794 28 14C28 16.206 26.206 18 24 18Z"
        fill={color}
      />
      {/* Fingers extended */}
      <Path
        d="M22 22L22 36L26 36L26 22L22 22ZM20 24L28 24L28 26L20 26L20 24Z"
        fill={color}
      />
      {/* Thumb */}
      <Path
        d="M16 28C16 26.895 16.895 26 18 26C19.105 26 20 26.895 20 28C20 29.105 19.105 30 18 30C16.895 30 16 29.105 16 28Z"
        fill={color}
      />
      {/* Index finger */}
      <Path
        d="M18 32C18 30.895 18.895 30 20 30C21.105 30 22 30.895 22 32C22 33.105 21.105 34 20 34C18.895 34 18 33.105 18 32Z"
        fill={color}
      />
      {/* Middle finger */}
      <Path
        d="M22 32C22 30.895 22.895 30 24 30C25.105 30 26 30.895 26 32C26 33.105 25.105 34 24 34C22.895 34 22 33.105 22 32Z"
        fill={color}
      />
      {/* Ring finger */}
      <Path
        d="M26 32C26 30.895 26.895 30 28 30C29.105 30 30 30.895 30 32C30 33.105 29.105 34 28 34C26.895 34 26 33.105 26 32Z"
        fill={color}
      />
      {/* Pinky */}
      <Path
        d="M30 32C30 30.895 30.895 30 32 30C33.105 30 34 30.895 34 32C34 33.105 33.105 34 32 34C30.895 34 30 33.105 30 32Z"
        fill={color}
      />
    </Svg>
  );
};

export default SignLanguageIcon; 
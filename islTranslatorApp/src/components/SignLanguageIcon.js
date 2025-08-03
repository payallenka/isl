import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const SignLanguageIcon = ({ size = 48, color = '#a21caf' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Simple hand with extended fingers for sign language */}
      <Path
        d="M20 16C20 14.895 20.895 14 22 14H26C27.105 14 28 14.895 28 16V32C28 33.105 27.105 34 26 34H22C20.895 34 20 33.105 20 32V16Z"
        fill={color}
        opacity="0.2"
      />
      
      {/* Thumb */}
      <Path
        d="M16 20C16 18.895 16.895 18 18 18C19.105 18 20 18.895 20 20C20 21.105 19.105 22 18 22C16.895 22 16 21.105 16 20Z"
        fill={color}
      />
      
      {/* Index finger */}
      <Path
        d="M22 20C22 18.895 22.895 18 24 18C25.105 18 26 18.895 26 20C26 21.105 25.105 22 24 22C22.895 22 22 21.105 22 20Z"
        fill={color}
      />
      
      {/* Middle finger */}
      <Path
        d="M24 20C24 18.895 24.895 18 26 18C27.105 18 28 18.895 28 20C28 21.105 27.105 22 26 22C24.895 22 24 21.105 24 20Z"
        fill={color}
      />
      
      {/* Ring finger */}
      <Path
        d="M26 20C26 18.895 26.895 18 28 18C29.105 18 30 18.895 30 20C30 21.105 29.105 22 28 22C26.895 22 26 21.105 26 20Z"
        fill={color}
      />
      
      {/* Pinky */}
      <Path
        d="M28 20C28 18.895 28.895 18 30 18C31.105 18 32 18.895 32 20C32 21.105 31.105 22 30 22C28.895 22 28 21.105 28 20Z"
        fill={color}
      />
      
      {/* Extended fingers for sign language gesture */}
      <Path
        d="M18 22L18 30L20 30L20 22L18 22Z"
        fill={color}
      />
      <Path
        d="M22 22L22 30L24 30L24 22L22 22Z"
        fill={color}
      />
      <Path
        d="M24 22L24 30L26 30L26 22L24 22Z"
        fill={color}
      />
      <Path
        d="M26 22L26 30L28 30L28 22L26 22Z"
        fill={color}
      />
      <Path
        d="M28 22L28 30L30 30L30 22L28 22Z"
        fill={color}
      />
    </Svg>
  );
};

export default SignLanguageIcon; 
// SlideTransitionEffect.jsx
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const SlideTransitionEffect = ({ swiper }) => {
  const [transitionBlockHeight, setTransitionBlockHeight] = useState(0);

  useEffect(() => {
    if (!swiper) return;

    const transitionStart = () => {
      // 开始滑动时，设置白色块的高度为0
      setTransitionBlockHeight(0);
    };

    const setTransition = (swiper) => {
      // 根据swiper的translate值计算白色块的高度
      let height = Math.abs(swiper.translate);
      setTransitionBlockHeight(height);
    };

    swiper.on('sliderMove', setTransition);
    swiper.on('transitionStart', transitionStart);

    return () => {
      swiper.off('sliderMove', setTransition);
      swiper.off('transitionStart', transitionStart);
    };
  }, [swiper]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: `${transitionBlockHeight}px`,
        backgroundColor: 'white',
        zIndex: 10,
      }}
    ></div>
  );
};

export default SlideTransitionEffect;

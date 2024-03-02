import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const TextAnimation = ({ onTextAnimationComplete,allowTextScroll,currentSlideIndex,onProgressChange }) => {
  const containerRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const textLines = [
    "", "Line 2", "Line 3", "Line 4", "Line 5",
    "Line 6", "Line 7", "Line 8", "Line 9", "Line 10",
    "Line 11", "Line 12", "Line 13", "Line 14", "",
  ];

  useEffect(() => {
    const maxScrollPosition = (textLines.length - 1) * 200;
    const handleWheel = (event) => {
      if (scrollPosition >= maxScrollPosition && event.deltaY > 0) {
        if (!animationCompleted) {
          setAnimationCompleted(true);
          onTextAnimationComplete();
        }
        return;
      }
      if ((scrollPosition <= 0 && event.deltaY < 0 )|| (animationCompleted)) {
        return;
      }  
      console.log(scrollPosition,maxScrollPosition,currentSlideIndex,event.deltaY);
  
      setScrollPosition((prev) => Math.max(0, Math.min(prev + event.deltaY, maxScrollPosition)));
      event.preventDefault();
    };
  
    window.addEventListener('wheel', handleWheel, { passive: false });
  
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [scrollPosition, textLines.length, onTextAnimationComplete, animationCompleted, allowTextScroll, currentSlideIndex]);
  

  useEffect(() => {
    textLines.forEach((_, index) => {
      const element = containerRef.current.children[index];
      const progress = scrollPosition - index * 200; // 使用200作为基础间距
      // 调整opacity计算逻辑，确保首行和末行在滚动停止时可见
      const distance = Math.abs(progress);
      let opacity = distance < 200 ? 1 : Math.min(1, Math.max(0, 1 - distance / 1000));
      const fontSize = 20 + Math.max(0, 50 - distance / 10);
      const colorIntensity = Math.max(0, 255 - distance * 2);
      const maxScrollPosition = (textLines.length - 1) * 200;
        const progressItem = scrollPosition / maxScrollPosition;

        onProgressChange(progressItem); // 将进度信息传递给父组件
  
      gsap.to(element, {
        opacity: opacity,
        fontSize: `${fontSize}px`,
        color: `rgba(255,255,255, ${opacity})`,
        y: -Math.abs(progress > 0 ? Math.min(progress * 0.5, 200) : 0),
        ease: "none",
        duration: 0.5,
      });
    });
  }, [scrollPosition, textLines,onProgressChange]);
  

  return (
    <div ref={containerRef} className='text-container'>
      {textLines.map((line, index) => (
        <div key={index} style={{ opacity: 0 }}>
          {line}
        </div>
      ))}
    </div>
  );
};

export default TextAnimation;

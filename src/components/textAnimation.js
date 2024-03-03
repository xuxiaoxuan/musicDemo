import React, { useRef, useEffect, useState,useMemo,useCallback } from 'react';
import { gsap } from 'gsap';

const TextAnimation = ({ onTextAnimationComplete,allowTextScroll,onProgressChange,textAtBottom }) => {
  const containerRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const maxLine = 150;
  const textLines = useMemo(() => [
    "When you want something,",
    "all the universe conspires",
    "n helping you to achieve it.",
    "Paulo Coelho",
    "",
    "Feed is that conspiracy:",
    "the conspiracy of trust.",
    "",
    "Trust is the single",
    "most important ingredient ",
    " ",
    " ",
    "Boston Consulting Group ",
    "and the World Economic Forum ",
    "forecast the digital economy ",
    "to be worth between ",
    "1.5 and 2.5 trillion dollars",
    "by 2016.",
    "",
    ""
  ], []); 

    // 使用useCallback包装handleWheel函数，避免不必要的重渲染
    const handleWheel = useCallback((event) => {
      const maxScrollPosition = (textLines.length) * maxLine;
      if (scrollPosition >= maxScrollPosition && event.deltaY > 0) {
        if (!animationCompleted) {
          setAnimationCompleted(true);
          onTextAnimationComplete();
        }
        return;
      }
      if ((scrollPosition <= 0 && event.deltaY < 0) || (animationCompleted)) {
        return;
      }
      setScrollPosition((prev) => Math.max(0, Math.min(prev + event.deltaY, maxScrollPosition)));
      event.preventDefault();
    }, [scrollPosition, animationCompleted, textLines.length, onTextAnimationComplete]);
  
    useEffect(() => {
      window.addEventListener('wheel', handleWheel, { passive: false });
  
      return () => {
        window.removeEventListener('wheel', handleWheel);
      };
    }, [handleWheel]);
  
    useEffect(() => {
      if (textAtBottom) {
        // 初始化文字在底部
        const maxScrollPosition = textLines.length * maxLine;
        setScrollPosition(maxScrollPosition);
        setAnimationCompleted(false);
      }
    }, [textAtBottom, textLines.length]);
  
    useEffect(() => {
      const updateAnimations = () => {
        const containerHeight = containerRef.current.clientHeight;
        textLines.forEach((_, index) => {
          const element = containerRef.current.children[index];
          const progress = scrollPosition - index * maxLine;
          const distance = Math.abs(progress);
          let opacity = distance < maxLine ? 1 : Math.min(1, Math.max(0, 1 - distance / 1000));
          const fontSize = 20 + Math.max(0, 30 - distance / 10);
          const maxScrollPosition = textLines.length * maxLine;
          const progressItem = scrollPosition / maxScrollPosition;
  
          onProgressChange(progressItem);
  
          gsap.to(element, {
            opacity: opacity,
            fontSize: `${fontSize}px`,
            color: `rgba(255,255,255, ${opacity})`,
            y: -Math.abs(progress > 0 ? Math.min(progress, maxLine) : 0),
            ease: "none",
            duration: 0.5,
          });
        });
      };
  
      requestAnimationFrame(updateAnimations);
    }, [scrollPosition, textLines, onProgressChange]);
  
    return (
      <div ref={containerRef} className='text-container'>
        {textLines.map((line, index) => (
          <div key={index} style={{ opacity: 0, margin: '10px' }}>
            {line}
          </div>
        ))}
      </div>
    );
  };
  
  export default TextAnimation;
  
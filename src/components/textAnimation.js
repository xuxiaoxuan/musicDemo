import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const TextAnimation = ({ onTextAnimationComplete,allowTextScroll,onProgressChange,textAtBottom }) => {
  const containerRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const maxLine = 150;
  const textLines = ["When you want something,", "all the universe conspires", "n helping you to achieve it.", "Paulo Coelho", "","","Feed is that conspiracy:",
    "the conspiracy of trust.", "","", "Trust is the single", "most important ingredient ", " "," ",
    "Boston Consulting Group ", "and the World Economic Forum ", "forecast the digital economy ", "to be worth between ", "1.5 and 2.5 trillion dollars","by 2016.","",""];

  useEffect(() => {
    if (textAtBottom) {
      // 如果需要将文字初始化在底部
      const maxScrollPosition = (textLines.length ) * maxLine;
      setScrollPosition(maxScrollPosition);
      setAnimationCompleted(false); // 假设动画已完成，以允许向上滚动
    }
  }, [textAtBottom,textLines.length]); // 依赖于textAtBottom状态

  useEffect(() => {
    const maxScrollPosition = (textLines.length) * maxLine;
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
      setScrollPosition((prev) => Math.max(0, Math.min(prev + event.deltaY, maxScrollPosition)));
      event.preventDefault();
    };
  
    window.addEventListener('wheel', handleWheel, { passive: false });
  
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [scrollPosition, textLines.length, onTextAnimationComplete, animationCompleted, allowTextScroll]);
  

  useEffect(() => {
    const containerHeight = containerRef.current.clientHeight; // 容器的高度

    textLines.forEach((_, index) => {
      const element = containerRef.current.children[index];

      const elementTop = element.offsetTop; // 元素顶部相对于容器的位置
      const elementBottom = elementTop + element.clientHeight; // 元素底部相对于容器的位置
  
      const progress = scrollPosition - index * maxLine; // 使用maxLine作为基础间距
      // 调整opacity计算逻辑，确保首行和末行在滚动停止时可见
      const distance = Math.abs(progress);
      
      let opacity = distance < maxLine ? 1 : Math.min(1, Math.max(0, 1 - distance / 1000));
      const fontSize = 20 + Math.max(0, 30 - distance / 10)
      const maxScrollPosition = (textLines.length ) * maxLine;
      const progressItem = scrollPosition / maxScrollPosition;

      // console.log('maxScrollPosition-------',maxScrollPosition,fontSize)
      // console.log('opacity-------',opacity)
      // console.log(index,'scrollPosition',scrollPosition,progress)
      // console.log(index,'y',Math.abs(progress > 0 ? Math.min(progress * 0.5, maxLine) : 0))
      onProgressChange(progressItem); // 将进度信息传递给父组件
  
      gsap.to(element, {
        opacity: opacity,
        fontSize: `${fontSize}px`,
        color: `rgba(255,255,255, ${opacity})`,
        y: -Math.abs(progress > 0 ? Math.min(progress , maxLine) : 0),
        ease: "none",
        duration: 0.5,
      });
    });
  }, [scrollPosition, textLines,onProgressChange]);
  

  return (
    <div ref={containerRef} className='text-container'>
      {textLines.map((line, index) => (
        <div key={index} style={{ opacity: 0,margin:'10px' }}>
          {line}
        </div>
      ))}
    </div>
  );
};

export default TextAnimation;

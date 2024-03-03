import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap';
import './blockAnimation.css';

const BlocksAnimation = ({ direction, triggerAnimation }) => {
  // 使用 React refs 来引用 DOM 节点
  const blockRef = React.useRef(null);
  const whiteBlock = React.useRef(null);
  const purpleBlock = React.useRef(null);

  // 监听 direction 和 triggerAnimation 的变化来触发动画
  useEffect(() => {
    if (triggerAnimation) {
      // 初始化块的位置和高度
      gsap.set(blockRef.current, { top: direction === 'up' ? '-100%' : '100%' });
      gsap.set(whiteBlock.current, { height: '120%', top: '0%' });
      gsap.set(purpleBlock.current, { height: '60%', top: '50%' });
      // 执行动画
      gsap.to(purpleBlock.current, {
        duration: 0.4,
        delay: 0.2,
        height: direction === 'up' ? '100%' : '0%',
        top: direction === 'up' ? '0%' : '100%',
        ease: "power1.inOut",
      });
      gsap.to(whiteBlock.current, {
        duration: 0.5,
        height: direction === 'up' ? '0%' : '100%',
        top: '0%',
        ease: "power1.inOut",
      });
      gsap.fromTo(blockRef.current, 
        { top: direction === 'up' ? '100%' : '-100%' },
        {
          duration: 0.3,
          top: '0%',
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(blockRef.current, {
              duration: 0.8,
              top: direction === 'up' ? '-100%' : '100%',
              ease: "power1.inOut",
            });
          }
        });
    }
  }, [triggerAnimation, direction]);

  return (
    <div ref={blockRef} className="block-ref">
      <div ref={whiteBlock} className="white-block"></div>
      <div ref={purpleBlock} className="purple-block"></div>
    </div>
  );
};

export default BlocksAnimation;


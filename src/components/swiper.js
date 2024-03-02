import React, { useRef, useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import {Mousewheel} from 'swiper/modules'
import 'swiper/swiper-bundle.css';
import './swiper.css';
import intro from '../intro.mp4'
import BackgroundVideo from './backgroundVideo';
import TextAnimation from './textAnimation';

const SwiperItem = () => {
  const swiperRef = useRef(null);
  const [allowTextScroll, setAllowTextScroll] = useState(false); // 控制文字滚动开关
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // 当前屏幕索引
  const [textAnimationProgress, setTextAnimationProgress] = useState(0); // 添加文本动画进度状态



  const handleSlideChange = (swiper) => {
    console.log('jjjj',swiper);  
    setCurrentSlideIndex(swiper.activeIndex); // 更新当前屏幕索引
    setAllowTextScroll(swiper.activeIndex === 0); // 当前为第一屏时允许文字滚动
   
  };

  const handleTextAnimationComplete = () => {
    console.log('xxx')
    setAllowTextScroll(true); // 当前为第一屏时允许文字滚动
    swiperRef.current.swiper.mousewheel.enable(); // 启用swiper的鼠标滚轮事件
    swiperRef.current.swiper.slideNext(); // 滑动到下一屏
  };

  // 添加处理文本动画进度变化的函数
  const handleTextAnimationProgressChange = (progress) => {
    setTextAnimationProgress(progress);
  };


  return (
    <div className="swiper-page">
      <Swiper
        ref={swiperRef} 
        modules={[Mousewheel]}
        direction= 'vertical'
        className='swiper-wra swiper-no-swiping'
        slidesPerView={2}
        mousewheel={true} // 根据状态允许文字滚动
        allowTouchMove={allowTextScroll}
        enabled={allowTextScroll}
        onSlideChange={(e) => handleSlideChange(e)} // 直接使用事件对象
        onInit={(swiper) => {
          console.log('xxxSwiper initialized:', swiper);
          handleSlideChange(swiper); // 初始时也调用一次，以设置初始状态
        }}
      >
        <SwiperSlide className='swiper-slide'>

          <BackgroundVideo src={intro} />
          <div className='bg'>
            {/* 文字滚动 */}
          <TextAnimation onTextAnimationComplete={handleTextAnimationComplete} allowTextScroll={allowTextScroll} currentSlideIndex={currentSlideIndex} onProgressChange={handleTextAnimationProgressChange}/>
            {/* 显示进度条 */}
            <div className='scroll-progress-wra'>
              <div className='title'>Introduction</div>
              <div className='scroll-progress' style={{width: `${textAnimationProgress * 100}%`}}></div>
            </div>

          </div>
        </SwiperSlide>
        <SwiperSlide className='swiper-slide--2'>
            22
        </SwiperSlide>
        {/* <span slot="wrapper-start">Container Start</span> */}
      </Swiper>
    </div>
  );
};

export default SwiperItem;



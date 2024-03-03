import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import  {Mousewheel} from 'swiper'
import 'swiper/swiper-bundle.css';
import './home.css';
import intro from './assets/intro.mp4'
import BackgroundVideo from './components/backgroundVideo';
import TextAnimation from './components/textAnimation';
import BlockAnimation from './components/blockAnimation'; 
import Navbar from './components/navbar';

const Home = () => {
  const swiperRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null); // 用于存储Swiper实例的状态
  const [allowTextScroll, setAllowTextScroll] = useState(false); // 控制文字滚动开关
  const [textAnimationProgress, setTextAnimationProgress] = useState(0); // 添加文本动画进度状态
  const [textAtBottom, setTextAtBottom] = useState(false); // 新增状态
  const [lastIndex, setLastIndex] = useState(0); // 用于存储上一次的索引
  const [animationDirection, setAnimationDirection] = useState('up');
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  //滑动动画效果
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.on('slideChange', () => {
        const direction = swiperInstance.activeIndex > lastIndex ? 'up' : 'down';
        setAnimationDirection(direction);
        setTriggerAnimation(true); // 触发动画
        setLastIndex(swiperInstance.activeIndex);

        // 重置触发状态以便下次动画
        setTimeout(() => {
          setTriggerAnimation(false);
        }, 500); // 动画持续时间后重置
      });
    }
  }, [swiperInstance, lastIndex]);

  //轮播切换
  const handleSlideChange = (swiper) => {
    // 当从第二屏滑回第一屏时，确保文字动画在最后一行
    // 当前为第一屏时允许文字滚动
    setAllowTextScroll(swiperInstance.activeIndex === 0);
    setTextAtBottom(swiperInstance.activeIndex === 0); 
  };

  //文字执行回调
  const handleTextAnimationComplete = () => {
    // 当文字动画完成时，允许滑动到下一屏
    if (swiperInstance && swiperInstance.activeIndex === 0) {
      setAllowTextScroll(true); // 禁止文字滚动，允许滑动到下一屏
      swiperInstance.slideNext(); // 自动滑动到下一屏
    }
  };

  //文字执行进度条
  const handleTextAnimationProgressChange = (progress) => {
    setTextAnimationProgress(progress);
    
    // 如果文字动画完成（即进度为1），允许滑动到下一屏
    setAllowTextScroll(progress >= 1);
  };


  return (
    <div className="swiper-page">
      <Navbar textAnimationProgress={textAnimationProgress} ></Navbar>

      <Swiper
        ref={swiperRef} 
        modules={[Mousewheel]}
        direction= 'vertical'
        className='swiper-wra'
        slidesPerView={1} // 每次只显示一个slide
        autoHeight={true} // 自动调整swiper的高度以适应当前slide的高度
        mousewheel={true} // 启用鼠标滚轮控制
        allowSlideNext={allowTextScroll}
        allowSlidePrev={allowTextScroll}
        onSlideChange={(swiper) => handleSlideChange(swiper)} // 直接使用事件对象
        onSwiper={(swiper) =>  setSwiperInstance(swiper)}
      >
        <SwiperSlide className='swiper-slide'>
          <BackgroundVideo src={intro} />
          <div className='layer'>
            {/* 文字滚动 */}
            <TextAnimation onTextAnimationComplete={handleTextAnimationComplete} allowTextScroll={allowTextScroll} onProgressChange={handleTextAnimationProgressChange} textAtBottom={textAtBottom}/>
          </div>
        </SwiperSlide>

        <SwiperSlide className='swiper-slide--2'>
          
        </SwiperSlide>
      </Swiper>
      {/* 白色块元素，用于创建渐出效果 */}
      <BlockAnimation direction={animationDirection} triggerAnimation={triggerAnimation} />x
    </div>
  );
};

export default Home;



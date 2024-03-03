import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

function adjustRemUnit() {
  const designWidth = 1920; // 设计稿的宽度
  const currentWidth = document.documentElement.clientWidth || window.innerWidth;
  const baseFontSize = 16; // 基础字体大小
  const scale = currentWidth / designWidth;
  document.documentElement.style.fontSize = `${baseFontSize * scale}px`;
}

// 监听DOMContentLoaded事件确保DOM加载完成后调整字体大小
document.addEventListener('DOMContentLoaded', adjustRemUnit);
// 监听resize事件以在窗口大小改变时调整字体大小
window.addEventListener('resize', adjustRemUnit);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



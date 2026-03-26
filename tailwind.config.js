/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,less,css}"
  ],
  theme: {
    extend: {
      width: {
        '390': '390px',
      },
      height: {
        '451': '451px',
      },
      padding: {
        '32': '32px',
      },
      borderRadius: {
        '12': '12px',
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      // 生成 px-{number} 类，直接对应 px 值
      const pxUtilities = {};
      for (let i = 0; i <= 1000; i++) {
        pxUtilities[`.px-${i}`] = { 'padding-left': `${i}px`, 'padding-right': `${i}px` };
        pxUtilities[`.py-${i}`] = { 'padding-top': `${i}px`, 'padding-bottom': `${i}px` };
        pxUtilities[`.pt-${i}`] = { 'padding-top': `${i}px` };
        pxUtilities[`.pr-${i}`] = { 'padding-right': `${i}px` };
        pxUtilities[`.pb-${i}`] = { 'padding-bottom': `${i}px` };
        pxUtilities[`.pl-${i}`] = { 'padding-left': `${i}px` };
        pxUtilities[`.p-${i}`] = { 'padding': `${i}px` };
        
        pxUtilities[`.mx-${i}`] = { 'margin-left': `${i}px`, 'margin-right': `${i}px` };
        pxUtilities[`.my-${i}`] = { 'margin-top': `${i}px`, 'margin-bottom': `${i}px` };
        pxUtilities[`.mt-${i}`] = { 'margin-top': `${i}px` };
        pxUtilities[`.mr-${i}`] = { 'margin-right': `${i}px` };
        pxUtilities[`.mb-${i}`] = { 'margin-bottom': `${i}px` };
        pxUtilities[`.ml-${i}`] = { 'margin-left': `${i}px` };
        pxUtilities[`.m-${i}`] = { 'margin': `${i}px` };
        
        pxUtilities[`.w-${i}`] = { 'width': `${i}px` };
        pxUtilities[`.h-${i}`] = { 'height': `${i}px` };
        
        pxUtilities[`.top-${i}`] = { 'top': `${i}px` };
        pxUtilities[`.right-${i}`] = { 'right': `${i}px` };
        pxUtilities[`.bottom-${i}`] = { 'bottom': `${i}px` };
        pxUtilities[`.left-${i}`] = { 'left': `${i}px` };
        
        pxUtilities[`.gap-${i}`] = { 'gap': `${i}px` };
        pxUtilities[`.space-x-${i} > * + *`] = { 'margin-left': `${i}px` };
        pxUtilities[`.space-y-${i} > * + *`] = { 'margin-top': `${i}px` };

        pxUtilities[`.size-${i}`] = { 'width': `${i}px`, 'height': `${i}px` };
        pxUtilities[`.leading-${i}`] = { 'line-height': `${i}px` };
        pxUtilities[`.font-${i}`] = { 'font-size': `${i}` };
      }
      
      // 生成字体大小类
      for (let i = 8; i <= 100; i++) {
        pxUtilities[`.text-${i}`] = { 
          'font-size': `${i}px`,
          'line-height': `${Math.round(i * 1.2)}px`
        };
      }
      
      // 生成圆角类
      for (let i = 0; i <= 50; i++) {
        pxUtilities[`.rounded-${i}`] = { 'border-radius': `${i}px` };
      }
      
      addUtilities(pxUtilities);
    }
  ],
  corePlugins: {
    // 确保所有核心插件都启用
    preflight: true,
  }
}; 
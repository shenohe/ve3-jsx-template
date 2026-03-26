import { ref } from "vue";

export default function useCountdown() {
  // 倒计时的值
  const countdown = ref(0);
  // 定时器
  let timer = null;

  // 启动倒计时
  const setCountdown = seconds => {
    // 如果存在正在运行的计时器，则先清除
    if (timer) {
      clearInterval(timer);
    }

    // 初始化倒计时的值
    countdown.value = seconds;

    // 启动倒计时
    timer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value -= 1;
      }
      else {
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
  };

  // 
  return {
    countdown,
    setCountdown
  };
};
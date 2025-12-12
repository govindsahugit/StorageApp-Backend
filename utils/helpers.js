import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
export const purify = DOMPurify(window);

// CUSTOM THROTTLE FUNCTION
export const throttle = (waitTime = 1000) => {
  const throttleData = {};
  return (req, res, next) => {
    const now = Date.now();
    const ip = req.ip;

    const { previousDelay, lastRequestTime } = throttleData[ip] || {
      previousDelay: 0,
      lastRequestTime: now - waitTime * 1000,
    };

    const timePassed = now - lastRequestTime;
    const delay = Math.max(0, waitTime * 1000 + previousDelay - timePassed);

    throttleData[ip] = {
      previousDelay: delay,
      lastRequestTime: now,
    };

    setTimeout(next, delay);
  };
};

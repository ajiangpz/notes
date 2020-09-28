/*
 * @Author: your name
 * @Date: 2020-09-26 20:03:47
 * @LastEditTime: 2020-09-26 20:28:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \notes\demo\animate.js
 */
const tween = {
  linear: function (t, b, c, d) {
    return (c * t) / d + b;
  },
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  strongEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  strongEaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  sineaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  sineaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
};
class Animate {
  constructor(dom) {
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
    this.propertyName = null;
    this.easing = null;
    this.duration = null;
  }
  start(propertyName, endPos, duration, easing) {
    this.startTime = +new Date();
    this.startPos = this.dom.getBoundingClientRect()[propertyName];
    console.log(this.startPos);
    this.propertyName = propertyName;
    this.endPos = endPos;
    this.duration = duration;
    this.easing = tween[easing];
    let self = this;
    let timeId = setInterval(() => {
      if (self.step() === false) {
        clearInterval(timeId);
      }
    }, 19);
  }
  step() {
    let t = +new Date();
    if (t >= this.startTime + this.duration) {
      this.update(this.endPos);
      return false;
    }
    let pos = this.easing(
      t - this.startTime,
      this.startPos,
      this.endPos - this.startPos,
      this.duration
    );
    this.update(pos);
  }
  update(pos) {
    this.dom.style[this.propertyName] = pos + "px";
  }
}

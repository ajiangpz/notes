/* 
1.事件总线
2.监听事件
3.触发事件
4.事件存储
*/

class EventBus {
  constructor() {
    this.events = new Map();
  }
  // 监听事件
  listen(ev, fn) {
    if (!this.events.has(ev)) {
      this.events.set(ev, fn);
    }
  }
  // 触发事件
  emit(ev) {
    if (this.events.has(ev)) {
      this.events.get(ev)();
    }
  }
}
var event = new EventBus();
event.listen("test", function () {
  console.log("trigger test");
});
setTimeout(() => {
    event.emit("test");
}, 1000);

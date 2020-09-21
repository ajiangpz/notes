function lazyMan(name) {
  let currentPromise = new Promise((resolve, reject) => {
    console.log(`Hi I am ${name}`);
    resolve();
  });
  let wait = function (delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`Sleep ${delay}ms Done!`);
        resolve();
      }, delay);
    });
  };
  return {
    eat(msg) {
      currentPromise.then((res, rej) => {
        console.log(`Eat ${msg}`);
      });
      return this;
    },
    sleep(delay) {
      currentPromise = currentPromise.then((res, rej) => {
        return wait(delay);
      });
      return this;
    },
    sleepFirst(delay) {
      let tmpPromise = currentPromise;
      currentPromise = wait(delay);
      currentPromise.then((res, rej) => {
        return tmpPromise;
      });
      return this;
    },
  };
}
lazyMan("xiaojiang").sleep(2000).eat("dinner").sleepFirst(1000);

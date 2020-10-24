

### LazyMan

```js
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
```
### 函数柯里化
```js
// 参数不固定
function curry(fnToCurry) {
  let arg = [];
  return function f(...arg1) {
    // arg = arg.concat(arg1);
    if (arg1.length) {
      arg = [...arg, ...arg1];
      return f;
    } else {
      let val = fnToCurry(...arg);
      arg = [];
      return val;
    }
  };
}
// 参数固定
function curryFixParams(fnToCurry) {
  return (f = (...arg) =>
    (arg.length === fnToCurry.length) ? fnToCurry.apply(this, arg) :(...arg1)=>f(...arg,...arg1))
}
```
### 实现bind函数
```js
 (function(){
  var ArrayPrototypeSlice = Array.prototype.slice;
  Function.prototype.myBind = function(otherThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    // baseArgs指第一次传入的参数
    var baseArgs= ArrayPrototypeSlice.call(arguments, 1),
        baseArgsLength = baseArgs.length,
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          baseArgs.length = baseArgsLength; // reset to default base arguments
          //将第二次调用的参数加进来
          baseArgs.push.apply(baseArgs, arguments);
          // FNOP用来复制fToBound的原型对象，返回绑定的函数fBound时，需要将原型
          // 对象也拷贝到fBound的原型对象上
          // 函数原型是this的原型对象，说明是通过new调用，则this不变
          return fToBind.apply(
                 fNOP.prototype.isPrototypeOf(this) ? this : otherThis, baseArgs
          );
        };
    
    // 构造函数的原型
    if (this.prototype) {
      // 如果有原型，将原型拷贝下来
      fNOP.prototype = this.prototype; 
    }
    // 复制原来函数的原型对象，new绑定了FNOP函数的this到了fBound的this上
    fBound.prototype = new fNOP();

    return fBound;
  };
})();
```
### 实现apply函数
```js
function generateCode(argLen) {
  code = `return arguments[0][arguments[1]](`;
  for (let i = 0; i < argLen; i++) {
    if (i > 0) {
      code += ",";
    }
    code += `arguments[2][${i}]`;
  }
  code = `${code})`;
  return code;
}
Function.prototype.applyFn = function (context, argArray) {
  if (typeof this !== "function") {
    throw new TypeError(`${this} is not a function!`);
  }
  if (typeof argArray === undefined || typeof argArray === null) {
    argArray = [];
  }
  if (context === undefined || context === null) {
    context = window;
  }
  // 非严格模式下，会将第一个参数包装为对象，如果是undefined和null会返回{}
  context = new Object(context);
  let __fn = +new Date().getTime();
  context[__fn] = this;
  // let result = context[__fn](...argArray);
  // 这里不使用ES6实现，可以使用
  let code = generateCode(argArray.length);
  let result = new Function(code)(context, __fn, argArray);
  delete context[__fn];
  return result;
};
```

### 快速排序

```js
function quickSort(array, leftIndex = 0, rightIndex = array.length - 1) {
  const partitionArray = function (leftIndex, rightIndex) {
    const swap = function (leftIndex, rightIndex) {
      let tmp = array[leftIndex];
      array[leftIndex] = array[rightIndex];
      array[rightIndex] = tmp;
    };
    let parttionIndex = leftIndex,
      flag = array[rightIndex];
    for (
      let currentIndex = leftIndex;
      currentIndex < rightIndex;
      currentIndex++
    ) {
      if (array[currentIndex] < flag) {
        swap(parttionIndex, currentIndex);
        parttionIndex++;
      }
    }
    swap(parttionIndex, rightIndex);
    return parttionIndex;
  };
  if (leftIndex < rightIndex) {
    let parttionIndex = partitionArray(leftIndex, rightIndex);
    quickSort(array, leftIndex, parttionIndex - 1);
    quickSort(array, parttionIndex + 1, rightIndex);
    return array;
  }
}
```

### 归并排序

```js
function mergeSort(array) {
  // 如果数组的长度小于1，说明已经排序，不需要返回
  if (array.length <= 1) {
    return array;
  }
  // 将数组分为两个数组
  let middle = Math.floor(array.length / 2);
  let leftArray = array.slice(0, middle);
  let rightArray = array.slice(middle, array.length);
  let leftSortedArray = mergeSort(leftArray);
  let rightSortedArray = mergeSort(rightArray);
  console.log(leftSortedArray,rightSortedArray)
  return mergeTwoSortedArray(leftSortedArray, rightSortedArray);
}
// 定义一个合并两个排序好的数组的方法,返回一个排序好的数组
function mergeTwoSortedArray(leftArray, rightArray) {
  let minNum,
    result = [];
  while (leftArray.length && rightArray.length) {
    // 如果左边第一个元素小于右边第一个元素
    if (leftArray[0] < rightArray[0]) {
      minNum = leftArray.shift();
    } else {
      minNum = rightArray.shift();
    }
    result.push(minNum);
  }
  if (leftArray.length) {
    result=result.concat(leftArray);
  }
  if (rightArray.length) {
    result=result.concat(rightArray);
  }
  return result;
}
```

### 冒泡排序的优化

> 在外层循环设置一个flag，如果内层循环没有改变这个flag，说明数组已经排好序了，直接返回数组就可以了。

```js
function bubbleSort(originalArray) {
    let swapped = false;
    const array = [...originalArray];

    for (let i = 1; i < array.length; i += 1) {
      swapped = false;
      for (let j = 0; j < array.length - i; j += 1) {
        this.callbacks.visitingCallback(array[j]);
        if (this.comparator.lessThan(array[j + 1], array[j])) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swapped = true;
        }
      }
      if (!swapped) {
        return array;
      }
    }
    return array;
}
```

### 斐波那契数列

```js
//递归解法
function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(0));

//动态规划
function fib2(n) {
  let array = new Array(n + 1).fill(null);
  array[0] = 0;
  array[1] = 1;
  for (let i = 2; i < n + 1; i++) {
    array[i] = array[i - 1] + array[i - 2];
  }
  return array[n];
}
//缓存
function fib3(n,map={}){
    if(n===1){
        return 0;
	}
    if(n===2){
        return 1;
    }
    if(map[n]){
        return map[n]
	}else{
    	let tmp=fib3(n-1,map)+fib3(n-2,map);
        map[n]=tmp;
        return tmp;
	}
}				
```

### 事件循环

```js
async function a1 () {
    console.log('a1 start')
    await a2()
    // 2
    // a2().then(()=>console.log('a1 end'))
    console.log('a1 end')
}
async function a2 () {
    console.log('a2')
}
console.log('script start')
setTimeout(() => {
    console.log('setTimeout')
}, 0)
Promise.resolve().then(() => {
    // 1
    console.log('promise1')
})
a1()
let promise2 = new Promise((resolve) => {
    
    resolve('promise2.then')
    console.log('promise2')
})
promise2.then((res) => {
    // 3
    console.log(res)
    Promise.resolve().then(() => {
        // 4
        console.log('promise3')
    })
})
console.log('script end')
// 同步代码
// script start 
// a1 start 
// a2 
// promise2
// script end 


// 异步代码
// promise1 
// a1 end
// promise2.then 
// promise3
// setTimeout
```



### 节流函数和防抖函数的区别

节流函数在用户会节约函数执行的频率，如果用户在规定的时间内一直在执行某个动作，则不会触发回调函数。只有超过了规定时间，才会执行函数。也就是隔一段时间执行一次。

防抖函数则不同，防抖函数在规定的时间内如果用户重复执行了某个动作，则会重新计算时间。超过了时间且用户没有操作了才会执行。

[演示地址](http://demo.nimius.net/debounce_throttle/)



### 实现防抖函数和节流函数

```js
// 防抖函数
// 思路
// 立即执行即在触发事件调用回调函数时先执行一次回调函数，再设置定时器，在定时时间内如果用户触发事件，则重新定时。如果已经有定时器在执行，那么说明已经执行过了一次立即执行，不需要立即执行函数了。
function debounce(fn, wait, immediate) {
  console.log(wait, immediate);
  // 定义定时器 值为数字id
  let timeout;

  // 返回回调函数
  return function () {
    // 执行上下文
    let context = this;
    // 传参
    let args = arguments;
    // 删除原来的定时器
    if (timeout) {
      clearTimeout(timeout);
    }
    // 如果是立即执行
    if (immediate) {
      // 判断当前是否有定时器id，有则说明已经立即执行过了
      let shouldCallNow = !timeout;
      // 每次调用都要重置定时器
      timeout = setTimeout(() => {
        timeout = null; 
      }, wait);
      if (shouldCallNow) {
        fn.apply(context, args);
      }
    }
    // 如果不是立即执行模式
    else {
      // 重置定时器
      timeout = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    }
  };
}

// 节流函数
// 思路
// 设置一个定时器，在指定的时间后将定时器清空。在每次执行回调时，判断定时器是否存在，如果存在不做任何操作，否则执行执行回调函数并且再次设置定时器。该实现第一次触发会马上触发回调，但是在定时结束后不会触发回调。
function throttle(fn, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    if (!timeout) {
      fn.apply(context, args);
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    }
  };
}
// 如果要在结束时也触发一次回调，需要在再次触发事件时再设置一个定时器，定时的时间距离下一次可以触发回调的时间。
function throttle(fn,wait){
    // 记录当前时间
   let prev=0;
   let now=+new Date();
    
}
```



### Javascript原型机制

`Function`是一个函数，函数一定是对象，对象不一定是函数。

每个函数都是实例化`Function`得到的，因此每一个函数的`[[prototype]]`属性指向`Function`的`prototype`属性。`Function`函数的`[[prototype]]`属性会指向`Function.prototype`。所以`Function`函数上的`[[prototype]]`和`prototype`指向的是同一个对象。`Object`构造函数是也是Function的实例对象，因此Object函数的`[[prototype]]`指向`Function.prototype`。而`Function.prototype`本身是一个对象，所以其`[[prototype]]`属性指向的是`Object.prototype`。

定义一个函数时，函数的`prototype`属性会指向一个原型对象，且该原型对象上的`constructor`属性会指向该函数。

当通过`new`调用该函数时，生成一个实例对象，且实例对象上的`__proto__`属性会指向构造函数的原型对象，这使得实例对象可以调用函数原型上的方法和属性。

当我们定义A函数，并且让其原型对象的`__proto__`属性指向B函数，那么A函数的实例对象就即可以调用B函数原型对象上的方法，从而形成了原型链。





### Javascript类型判断

- typeOf
  判断基本类型，无法判断null和除了function之外的引用类型
- instanceof
  a instanceof b，判断b的原型是否在a的原型链上，也就是判断a是否是继承自b，可以用来判断自定义类型
- Object.prototype.toString.call
  使用call调用的原因
  - val.toString(),当val是undefined,null等无法转化为包装对象的值时，会报错
  - val对象可能重写了toString方法
- lodashAPI

### Javascript类型转化

|                 | Boolean                 | String                          | Number                 |
| --------------- | ----------------------- | ------------------------------- | ---------------------- |
| Number          | 除了-0，+0，NAN都是true |                                 |                        |
| String          | 除了空串都是true        |                                 |                        |
| undefined、null | false                   |                                 | null=>0,undefined=>NAN |
| 引用类型        | true                    | '[Object Object]'，[1,2]=>‘1,2’ | []=>0,[1]=>1,其他=>NAN |
| Boolean         |                         | ‘true’，‘false’                 | true=>1,false=>0       |
|                 |                         |                                 |                        |



### Javascript判断两个值是否相等

- ==

  | A\B           | undefined | null  | Number            | String                | Boolean               | Object            |
  | :------------ | --------- | ----- | ----------------- | --------------------- | --------------------- | ----------------- |
  | **undefined** | true      | true  | false             | false                 | false                 |                   |
  | **null**      | true      | true  | false             | false                 | false                 |                   |
  | **Number**    | false     | false | A===B             | A===Number(B)         | A===Number(B)         | A==toPrimitive(B) |
  | **String**    | false     | false | Number(A)===B     | A===B                 | Number(A)===Number(B) | A==toPrimitive(B) |
  | **Boolean**   | false     | false | Number(A)===B     | Number(A)===Number(B) | A===B                 | A==toPrimitive(B) |
  | **Object**    |           |       | toPrimitive(A)==B | toPrimitive(A)==B     | toPrimitive(A)==B     | A===B             |

- ===
  类型相等并且值也要相等
- Object.is
  Object.is与===的区别在于Object.is(NaN,NaN) 返回true,bject.is(-0,+0)返回false。

### Javascript中的进制转化

- 将任意进制转化为10进制

  ```js
  parseInt(str,radix)	
  ```

- 将10进制转化为任意进制

  ```js
  Number.prototype.toString.call(number,radix);
  ```

- 将任意进制转化为任意进制

  ```js
  parseInt(number,radix1).toString(radix2)
  ```









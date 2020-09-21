class F {
    static sayname() {
      console.log(this.name);
    }
    sayHi() {
      console.log("ooooooooooo");
    }
  }
  class FF extends F {
    static sayname() {
      console.log(super.name); //静态方法胀super指向父类
      console.log(super.sayname()); //子类在静态方法中的super指向父类，调用父类的静态方法时，静态方法中的this指向子类，而不是子类实例。
    }
    sayHi() {
      super.sayHi(); //指向父类原型对象
    }
  }
  const ff = new FF();
  FF.sayname(); //F
  ff.sayHi(); //ooooooooooo
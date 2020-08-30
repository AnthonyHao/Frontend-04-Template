学习笔记

## JavaScript对象的两类属性
JavaScript的属性并非简单的名称和值，JavaScript用一组特征（attribute）来描述属性（property）。
### 第一类属性： 数据属性
数据属性有四个特征：

[[value]]: 属性的值
[[writable]]： 决定属性能否被赋值
[[enumerable]]: 决定for in 能否枚举该属性
[[configurable]]： 决定该属行能否被删除或者改变特征值

在大多数情况下，我们只关心数据属性的值即可。

### 第二类属性： 访问器（getter/setter） 属性，他也有四个特征。

[[getter]]： 函数或undefiend， 在取属性时被调用
[[setter]]： 函数或undefined， 在设置属性时被调用
[[enumerable]]: 决定for in 能否枚举该属性
[[configurable]]： 决定该属行能否被删除或者改变特征值

我们通常用于定义属性的代码会产生数据属性，其中的writable、enumberable、configurable都默认为true。我们可以使用内置函数Object.getOwnPropertyDescripter来查看。
```
var o = { a: 1 };
Object.getOwnPropertyDescriptor(o, "a") //{value: 1, writable: true, enumerable: true, configurable: true}
```
复制代码可以看出对象默认的数据属性为true。如果想到改变属性的特征，或者定义访问器的属性，可以使用Object.defineProperty.
```
var o = { a: 1 };
Object.defineProperty(o, "a", {value: 2, writable: false, enumerable: false, configurable: true});
Object.getOwnPropertyDescriptor(o, "a") //{value: 2, writable: false, enumerable: false, configurable: true}
o.a = 3;
console.log(o.a) // 2
```
复制代码这里使用Object.defineProperty来定义属性，定义的属性可以改变属性的writable和enumerable。当writable属性为false时，重新对a赋值，a不会发生变化。
创建对象时，也可以使用get和set关键字来创造访问器属性。
```
var o = {
    get b() {
        return 100
    }
};
console.log(o.b); // 100
o.b = 1;
console.log(o.b); // 100
```
复制代码访问器属性跟数据属性不同，每次访问属性都会执行getter或者setter函数。这里我们的getter返回100， 所以o.b每次都得到了100。由于没有setter函数，所以o.b只能读不能写。
JavaScript对象的运行时是一个“属性的集合”， 属性以字符串或者Symbol为Key，以数据属性特征值或者访问器熟悉感特征为value。
对象是一个属性的索引结构（索引结构是一类常见的数据结构，我们可以把它理解成一个能够以比较快的速度用key来查找value的字典）。我们以上面的对象o为例，你可以想象一下“a”是key,{value: 2, writable: false, enumerable: false, configurable: true}是value。
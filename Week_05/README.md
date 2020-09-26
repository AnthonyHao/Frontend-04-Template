学习笔记

**在双等号（==）比较的时候，会优先将Boolean类型转换成Number类型，不建议用**

#### 类型转换
[image]




#### String.prototype.charAt()
```str.charAt(index)```
返回字符串中指定位置的字符。
字符串中的字符从左向右索引，第一个字符的索引值为 0，最后一个字符（假设该字符位于字符串 stringName 中）的索引值为 stringName.length - 1。
如果指定的 index 值超出了该范围，则返回一个空字符串

#### String.prototype.charCodeAt()
```str.charCodeAt(index)```
返回指定索引处字符的 Unicode 数值（Unicode 编码单元 > 0x10000 的除外）。
Unicode 编码单元（code points）的范围从 0 到 1,114,111。开头的 128 个 Unicode 编码单元和 ASCII 字符编码一样。

**如果指定的 index 小于 0 或大于字符串的长度，则 charCodeAt 返回 NaN。** 大于255为中文 

#### String.fromCharCode()
```String.fromCharCode(num1, ..., numN)```
String.fromCharCode() 静态方法根据指定的 Unicode 编码中的序号值来返回一个字符串。

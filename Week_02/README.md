学习笔记

### 碎片知识

#### 鼠标点击左键右键的判断

在event的属性中有一个which， which为1就是左键，which为3就是右键。which为2是滚轮点击。

#### <!DOCTYPE html>的作用

声明文档的解析类型(document.compatMode)，避免浏览器的怪异模式。document.compatMode： BackCompat：怪异模式，浏览器使用自己的怪异模式解析渲染页面。 CSS1Compat：标准模式，浏览器使用W3C的标准解析渲染页面。这个属性会被浏览器识别并使用，但是如果你的页面没有DOCTYPE的声明，那么compatMode默认就是BackCompat, 浏览器按照自己的方式解析渲染页面，那么，在不同的浏览器就会显示不同的样式。如果你的页面添加了`<!DOCTYPE html>`那么，那么就等同于开启了标准模式，那么浏览器就得老老实实的按照W3C的 标准解析渲染页面，这样一来，你的页面在所有的浏览器里显示的就都是一个样子了。


#### contextmenu

contextmenu 事件会在用户尝试打开上下文菜单时被触发。该事件通常在鼠标点击右键或者按下键盘上的菜单键时被触发，如果使用菜单键，该上下文菜单会被展示 到所聚焦元素的左下角，但是如果该元素是一棵DOM树的话，上下文菜单便会展示在当前这一行的左下角。

任何没有被禁用的鼠标右击事件 (*通过调用事件的 preventDefault() 方法*) 将会使得 contextmenu 事件在目标元素上被触发。

#### #id.children
会将所有的子元素都计算进去，如果有制表符，换行符（BR）都会被放置进去。

## LL算法构建AST
Token 0 - 9
Operation + - * /
<EOF>end of file

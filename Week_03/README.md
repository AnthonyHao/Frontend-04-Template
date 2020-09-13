学习笔记


拖拽的技巧：
把mousemove和mouseup事件放入到mousedown里面，即使跳出了浏览器的页面，也可以获取到参数。
event.clientX event.clientY来拿X，Y的move位置坐标，然后可以在mousedown一开始就获取初始的位置。通过求差来拿到距离鼠标点的位置。另外可以设置一个baseX，baseY来使得动态效果没有那么不违和。

*CSSOM*是一组允许JavaScript操作CSS的API。它非常类似于DOM，但是用于CSS而不是HTML。它允许用户动态读取和修改CSS样式。著作权归作者所有。

*Range.getBoundingClientRect():*  返回一个 DOMRect 对象，该对象将范围中的内容包围起来；即该对象是一个将范围内所有元素的边界矩形包围起来的矩形（译者注：关于边界矩形，可以参考 Minimum Bouding Rectangles）。
此方法可用于确定文本区域中选中的部分或光标的视窗坐标。关于返回值的详细信息，参见 Element.getBoundingClientRect()。

*Range:* 接口表示一个包含节点与文本节点的一部分的文档片段。
可以用 Document 对象的 Document.createRange 方法创建 Range，也可以用 Selection 对象的 getRangeAt 方法获取 Range。另外，还可以通过 Document 对象的构造函数 Range() 来得到 Range。
Range.collapsed 只读
返回一个表示 Range 的起始位置和终止位置是否相同的布尔值。
Range.commonAncestorContainer 只读
返回完整包含 startContainer 和 endContainer 的、最深一级的节点。
Range.endContainer 只读
返回包含 Range 终点的节点。
Range.endOffset 只读
返回一个表示 Range 终点在 endContainer 中的位置的数字。
Range.startContainer 只读
返回包含 Range 开始的节点。
Range.startOffset 只读
返回一个表示 Range 起点在 startContainer 中的位置的数字。
实现建筑编辑器

编辑者新建项目

首先选择一米的像素，默认为10

然后可以编辑布局精灵图了，例如
`
.bbbbbbbbbbbbb.
ldddddddddddddr
ldddddddddddddr
ldddddddddddddr
ldddddddddddddr
.fffffffffffff
`
这就是一个房间的精灵图，b f l r 是四个方向的墙壁，不同方向的墙壁rotate和transformOrigin不一样。d就是地板了

然后需要从材质库里拿取材质包，10像素的材质包内置一些
材质包可以打上标签墙壁或地板，因为墙壁需要双面不同，而地板双面相同
材质包可以有自定义功能，通过pixelCreatorApplication去自己做

通过布局精灵图生成材质json,格式如下
[[{texture:string}]] 与布局精灵图等宽高的二维数组（注意.点地方要形成空材质{type:'null'}）

选择材质，点击切换材质到目标块上进行切换，为了防止一开始看不见，材质为空时，b f l r d 有默认颜色

所以整个项目布局就是下面这样

布局编辑区（字符串表单组件） 展示区 材质
选项设置（待定） 展示区 材质

展示区，要实现tab按住滑动鼠标旋转视图
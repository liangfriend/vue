给一套json格式
比如下面这样，能渲染出width*height大小的像素块。
{
width:number
height:number
content:[[{r:number,g:number,b:number,a:number}][{r:number,g:number,b:number,a:number}]]
}
然后转换成web能显示的格式，比如能直接放进image或svg的img中的东西
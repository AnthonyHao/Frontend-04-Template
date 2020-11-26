import { Component, createElement } from './framework.js'
import Carousel from './carousel.js'
import { Timeline, Animation } from './animation.js'

const goddess = [
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605546624241&di=ebe2ddff82e881a58ee2b9b3dca18576&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201611%2F12%2F20161112084948_NMPKZ.thumb.700_0.jpeg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2614262579,4244206981&fm=26&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=12856385,3830201148&fm=26&gp=0.jpg',
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=148972942,2704239416&fm=26&gp=0.jpg'
]

let carousel = <Carousel src={goddess}></Carousel>
carousel.mountTo(document.body)

let tl = new Timeline()
window.tl = tl
window.animation = new Animation({set a(v) {console.log(v)}}, 'a', 0, 100, 1000, null)
// tl.add(new Animation({set a(v) {console.log(v)}}, 'a', 0, 100, 1000, null))

tl.start()

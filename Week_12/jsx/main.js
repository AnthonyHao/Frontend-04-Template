// class Div {
//     constructor() {
//         this.root = document.createElement('div')
//     }

//     setAttribute(name, value) {
//         this.root.setAttribute(name, value)
//     }

//     appendChild(child) {
//         child.mountTo(this.root)
//     }

//     mountTo(parent) {
//         parent.appendChild(this.root)
//     }
// }

// let a = <Div class='test'>
//     <span>A</span>
//     <span>A</span>
//     <span>B</span>
// </Div>

import { Component, createElement } from './framework'

// class Carousel extends Component {
//     constructor() {
//         console.log(3)
//         super()
//         this.attributes = Object.create(null)
//     }

//     setAttribute(name, value) {
//         console.log(4)
//         this.attributes[name] = value
//     }

//     render() {
//         console.log(111, this.attributes)
//         let root = document.createElement('div')
//         // this.root.classList.add('carousel')
//         for (const record of this.attributes.src) {
//             // const img = document.createElement('div')
//             // img.style.backgroundImage = `url('${record}')`

//             const child = document.createElement('img')
//             child.src = record
//             root.appendChild(child)
//         }

//         return root
//     }

//     mountTo(parent) {
//         console.log(2)
//         parent.appendChild(this.render())
//     }
// }

class Carousel extends Component {
    constructor() {
        super()
        this.attributes = Object.create(null)
    }

    setAttribute(name, value) {
        this.attributes[name] = value
    }

    render() {
        this.root = document.createElement('div')
        this.root.classList.add('carousel')
        for (let record of this.attributes.src) {
            let img = document.createElement('div')
            img.style.backgroundImage = `url('${record}')`
            this.root.appendChild(img)
        }

        // let currentIndex = 0
        // setInterval(() => {
        //     let children = this.root.children
        //     let nextIndex = (currentIndex + 1) % children.length
        //     const current = children[currentIndex]
        //     const next = children[nextIndex]
        //     next.style.transition = 'none'
        //     next.style.transform = `translateX(${100 - 100 * nextIndex}%)`

        //     setTimeout(() => {
        //         next.style.transition = ''
        //         current.style.transform = `translateX(${-100 - 100 * currentIndex}%)`
        //         next.style.transform = `translateX(${-100 * nextIndex}%)`
        //         currentIndex = nextIndex
        //     }, 16)
        // }, 3000)

        let position = 0

        this.root.addEventListener('mousedown', event => {
            const children = this.root.children
            let startX = event.clientX

            let move = event => {
                const x = event.clientX - startX
                const current = position - Math.round((x - x % 200) / 200)
                for (let offset of [-2, -1, 0, 1, 2]) {
                    let pos = current + offset
                    pos = (pos + children.length) % children.length
                    children[pos].style.transition = 'none'
                    children[pos].style.transform = `translateX(${pos * -200 + offset * 200 + x % 200}px)`
                }
            }

            let up = event => {
                const x = event.clientX - startX
                position = position - Math.round(x / 200)
                for (let offset of [0, -Math.sign(Math.round(x / 200) - x + 100 * Math.sign(x))]) {
                    let pos = position + offset
                    pos = (pos + children.length) % children.length
                    console.log(pos, -Math.sign(Math.round(x / 200) - x + 100 * Math.sign(x)))
                    children[pos].style.transition = ''
                    children[pos].style.transform = `translateX(${pos * -200 + offset * 200}px)`
                }
                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            }

            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
        })
        return this.root
    }

    mountTo(parent) {
        parent.appendChild(this.render())
    }
}

const goddess = [
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605546624241&di=ebe2ddff82e881a58ee2b9b3dca18576&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201611%2F12%2F20161112084948_NMPKZ.thumb.700_0.jpeg',
    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2614262579,4244206981&fm=26&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=12856385,3830201148&fm=26&gp=0.jpg',
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=148972942,2704239416&fm=26&gp=0.jpg'
]

let carousel = <Carousel src={goddess}></Carousel>

carousel.mountTo(document.body)
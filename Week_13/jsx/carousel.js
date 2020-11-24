import { Component } from './framework.js'


export default class Carousel extends Component {
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
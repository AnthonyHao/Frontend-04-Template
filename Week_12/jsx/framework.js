// export const createElement = (type, attr, ...children) => {
//     let ele = typeof type === 'string' ? new ElementWrapper(type) : new type

//     for (let name in attr) {
//         ele.setAttribute(name, attr[name])
//     }

//     for (let child of children) {
//         if (typeof child === 'string') {
//             child = new TextWrapper(child)
//         }
//         ele.appendChild(child)
//     }

//     return ele
// }

// export class Component {
//     constructor() {
//         // this.root = this.render()
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

// class TextWrapper extends Component {
//     constructor(content) {
//         this.textNode = document.createTextNode(content)
//     }
// }

// class ElementWrapper extends Component {
//     constructor(type) {
//         this.ele = document.createElement(type)
//     }
// }

export const createElement = (type, attr, ...children) => {
    let ele = typeof type === 'string' ? new ElementWrapper(type) : new type

    for (let name in attr) {
        ele.setAttribute(name, attr[name])
    }

    for (let child of children) {
        if (typeof child === 'string') {
            child = new TextWrapper(child)
        }
        ele.appendChild(child)
    }

    return ele
}

export class Component {
    constructor() {
        // this.root = this.render()
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }

    appendChild(child) {
        child.mountTo(this.root)
    }

    mountTo(parent) {
        parent.appendChild(this.root)
    }
}

class ElementWrapper extends Component {
    constructor(type) {
        this.root = document.createElement(type)
    }
}

class TextWrapper extends Component {
    constructor(content) {
        this.root = document.createTextNode(content)
    }
}
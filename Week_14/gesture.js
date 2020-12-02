
let element = document.documentElement
let isListeningMouse = false

element.addEventListener('mousedown', event => {
    let context = Object.create(null)
    contexts.set('mouse' + (1 << event.button), context)
    start(event, context)

    let mousemove = event => {
        let button = 1
        while (button <= event.buttons) {
            if (button & event.buttons) {
                let key = button
                // order of buttons && button's property is not same
                if (button === 2) {
                    key = 4
                } else if (button === 4) {
                    key = 2
                }
                let context = contexts.get('mouse' + key)
                move(event, context)
            }
            button = button << 1
        }
    }

    let mouseup = event => {
        let context = contexts.get('mouse' + (1 << event.button))
        end(event, context)
        contexts.delete('mouse' + (1 << event.button))
        if (event.buttons === 0) {
            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseup)
            isListeningMouse = false
        }
    }
    if (!isListeningMouse) {
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
        isListeningMouse = true
    }
})

let contexts = new Map()

element.addEventListener('touchstart', event => {
    for (let touch of event.changedTouches) {
        let context = Object.create(null)
        contexts.set(touch.identifier, context)
        start(touch, context)
    }
})

element.addEventListener('touchmove', event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        move(touch, context)
    }
})

element.addEventListener('touchend', event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        end(touch, context)
        contexts.delete(touch.identifier)
    }
})

element.addEventListener('touchcancel', event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier)
        cancel(touch)
        contexts.delete(touch.identifier)
    }
})

let start = (touch, context) => {
    context.startX = touch.clientX, context.startY = touch.clientY
    context.points = [{
        t: Date.now(),
        x: touch.clientX,
        y: touch.clientY
    }]
    context.isPan = false
    context.isTap = true
    context.isPress = false
    context.handler = setTimeout(() => {
        context.isPan = false
        context.isTap = false
        context.isPress = true
        context.handler = null
        console.log('press')
    }, 500)
    // console.log('start', touch.clientX, touch.clientY)
}

let move = (touch, context) => {
    let dx = touch.clientX - context.startX, dy = touch.clientY - context.startY
    context.points = context.points.filter(item => (Date.now() - item.t < 500))
    context.points.push({
        t: Date.now(),
        x: touch.clientX,
        y: touch.clientY
    })
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
        context.isPan = true
        context.isTap = false
        context.isPress = false
        console.log('pan start')
        clearTimeout(context.handler)
    }
    if (context.isPan) {
        console.log('pan')
    }
    // console.log('move', touch.clientX, touch.clientY)
}

let end = (touch, context) => {
    if (context.isTap) {
        console.log('tap')
        dispatch('tap', {})
        clearTimeout(context.handler)
    }
    if (context.isPan) {
        console.log('pan end')
    }
    if (context.isPress) {
        console.log('press end')
    }

    let v, d
    context.points = context.points.filter(item => (Date.now() - item.t < 500))
    if (!context.points.length) {
        v = 0
    } else {
        d = Math.sqrt((touch.clientX - context.points[0].x) ** 2 + (touch.clientY - context.points[0].y) ** 2)
        v = d / (Date.now() - context.points[0].t)

        if (v > 1.5) {
            console.log('isFlick')
            context.isFlick = true
        } else {
            context.isFlick = false
        }
    }
    // console.log('end', touch.clientX, touch.clientY)
}

let cancel = (touch, context) => {
    clearTimeout(context.handler)
    // console.log('cancel', touch.clientX, touch.clientY)
}

function dispatch(type, properties) {
    let event = new Event(type)
    for (let name in properties) {
        event[name] = properties[name]
    }
    element.dispatchEvent(event)
}
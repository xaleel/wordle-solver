import React from 'react'

export default function Word(props){
    const focus = event => {
        if (event.type === 'change'){
            if (event.target.id !== 'l5'){event.target.nextSibling.focus()}
        }
        else {
            let value = event.target.value.match(/[a-zA-Z]/) ? event.target.value : '';
            if (event.code === 'ArrowDown' || event.code === 'ArrowUp'){
                let newClickEvent = new Event('click')
                Object.defineProperty(newClickEvent, 'target', {writable: false, value: document.getElementById(`b${event.target.id.slice(1)}`)});
                color(newClickEvent, event.code.toLowerCase().slice(5))
            } else if (event.code.search(/Key/) !== -1){
                event.target.value = event.code.slice(3)
                if (event.target.id !== 'l5'){event.target.nextSibling.focus()}
            } else if (event.code === 'Backspace') {
                event.target.value = ''
                if (event.target.id !== 'l1'){event.target.previousSibling.focus()}
            } else {
                event.target.value = value
                if (event.code === 'ArrowLeft' && event.target.id !== 'l1'){
                    event.target.previousSibling.focus()
                }
                if (event.code === 'ArrowRight' && event.target.id !== 'l5'){
                    event.target.nextSibling.focus()
                }
                if (event.code === 'Enter'){
                    props.go()
                }
            }
        }
    }

    const color = (event, key='up') => {
        if (event.target.classList.contains('gray')){
            event.target.classList.remove('gray') // The button itself
            event.target.classList.add(key == 'up' ? 'yellow' : 'green')
            document.getElementById(`l${event.target.id.slice(1)}`).classList.remove('gray') // The input right above it
            document.getElementById(`l${event.target.id.slice(1)}`).classList.add(key == 'up' ? 'yellow' : 'green')
        } else if (event.target.classList.contains('yellow')){
            event.target.classList.remove('yellow')
            event.target.classList.add(key == 'up' ? 'green' : 'gray')
            document.getElementById(`l${event.target.id.slice(1)}`).classList.remove('yellow')
            document.getElementById(`l${event.target.id.slice(1)}`).classList.add(key == 'up' ? 'green' : 'gray')
        } else if (event.target.classList.contains('green')){
            event.target.classList.remove('green')
            event.target.classList.add(key == 'up' ? 'gray' : 'yellow')
            document.getElementById(`l${event.target.id.slice(1)}`).classList.remove('green')
            document.getElementById(`l${event.target.id.slice(1)}`).classList.add(key == 'up' ? 'gray' : 'yellow')
        } else {
            event.target.classList.add(key == 'up' ? 'gray' : 'green')
            document.getElementById(`l${event.target.id.slice(1)}`).classList.add(key == 'up' ? 'gray' : 'green')
        }
    }

    return (
        <div className="word">
            <input className="letter" maxLength={1} pattern={/[a-zA-Z]/} onKeyUp={focus} id='l1' />
            <input className="letter" maxLength={1} pattern={/[a-zA-Z]/} onKeyUp={focus} id='l2' />
            <input className="letter" maxLength={1} pattern={/[a-zA-Z]/} onKeyUp={focus} id='l3' />
            <input className="letter" maxLength={1} pattern={/[a-zA-Z]/} onKeyUp={focus} id='l4' />
            <input className="letter" maxLength={1} pattern={/[a-zA-Z]/} onKeyUp={focus} id='l5' />
            <input className="go" type="button" onClick={props.go} value="&gt;" />
            <input className="lb" type="button" id="b1" onClick={color} />
            <input className="lb" type="button" id="b2" onClick={color} />
            <input className="lb" type="button" id="b3" onClick={color} />
            <input className="lb" type="button" id="b4" onClick={color} />
            <input className="lb" type="button" id="b5" onClick={color} />
            <input className="lb xtra" id="b6"></input>
        </div>
    )
}

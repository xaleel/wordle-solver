export default function Word(props){
    const focus = event => {
        if (event.type === 'change'){
            if (event.target.id !== 'l5'){event.target.nextSibling.focus()}
        }
        else {
            let value = event.target.value.match(/[a-zA-Z]/) ? event.target.value : ''
            if (event.code.search(/Key/) !== -1){
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

    const color = event => {
        if (event.target.classList.contains('gray')){
            event.target.classList.remove('gray')
            event.target.classList.add('yellow')
            document.getElementById(`l${event.target.id.slice(1)}`).classList.remove('gray')
            document.getElementById(`l${event.target.id.slice(1)}`).classList.add('yellow')
        } else if (event.target.classList.contains('yellow')){
            event.target.classList.remove('yellow')
            event.target.classList.add('green')
            document.getElementById(`l${event.target.id.slice(1)}`).classList.remove('yellow')
            document.getElementById(`l${event.target.id.slice(1)}`).classList.add('green')
        } else if (event.target.classList.contains('green')){
            event.target.classList.remove('green')
            event.target.classList.add('gray')
            document.getElementById(`l${event.target.id.slice(1)}`).classList.remove('green')
            document.getElementById(`l${event.target.id.slice(1)}`).classList.add('gray')
        } else {
            event.target.classList.add('gray')
            document.getElementById(`l${event.target.id.slice(1)}`).classList.add('gray')
        }
    }
    
    return (
        <>
        <div className="word">
            <input className="letter" maxLength={1} pattern={/[a-zA-Z]/} onKeyUp={focus} id='l1'></input>
            <input className="letter" maxLength={1} pattern={/[a-zA-Z]/} onKeyUp={focus} id='l2'></input>
            <input className="letter" maxLength={1} pattern={/[a-zA-Z]/} onKeyUp={focus} id='l3'></input>
            <input className="letter" maxLength={1} pattern={/[a-zA-Z]/} onKeyUp={focus} id='l4'></input>
            <input className="letter" maxLength={1} pattern={/[a-zA-Z]/} onKeyUp={focus} id='l5'></input>
            <button className="go" onClick={props.go}>&gt;</button>
        </div>
        <div className="buttons">
                <button className="lb" id="b1" onClick={color}></button>
                <button className="lb" id="b2" onClick={color}></button>
                <button className="lb" id="b3" onClick={color}></button>
                <button className="lb" id="b4" onClick={color}></button>
                <button className="lb" id="b5" onClick={color}></button>
                <button className="lb xtra" id="b6"></button>
        </div>
        </>
    )
}
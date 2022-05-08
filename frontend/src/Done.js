export default function Done(props){
    let done = []
    for (let g in props.guesses){
        let word = props.guesses[g].split(',')[0]
        let res = props.guesses[g].split(',')[1]
        let cols = []
        for (let i in res){
            if (res[i] === '-'){
                cols.push('gray')
            } else if (res[i] === 'Y'){
                cols.push('yellow')
            } else if (res[i] === 'G'){
                cols.push('green')
            }
        }
        g = (<div className="done-word">
            <button className={"db " + cols[0]} key={`donel${g}1`} id={`donel${g}1`}>{word[0]}</button>
            <button className={"db " + cols[1]} key={`donel${g}2`} id={`donel${g}2`}>{word[1]}</button>
            <button className={"db " + cols[2]} key={`donel${g}3`} id={`donel${g}3`}>{word[2]}</button>
            <button className={"db " + cols[3]} key={`donel${g}4`} id={`donel${g}4`}>{word[3]}</button>
            <button className={"db " + cols[4]} key={`donel${g}5`} id={`donel${g}5`}>{word[4]}</button>
            <button className="db xtra" key={`donel${g}6`} id={`donel${g}6`}>{word[4]}</button>
        </div>)
        done.unshift(g)
    }
    return(
        <div className="done" id='done'>
            {done}
        </div>
    )
}
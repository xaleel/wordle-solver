export default function Suggestions(props){
    return (
        <ol>
          <li id='s1'>{props.words[0]}</li>
          <li id='s2'>{props.words[1]}</li>
          <li id='s3'>{props.words[2]}</li>
          <li id='s4'>{props.words[3]}</li>
          <li id='s5'>{props.words[4]}</li>
        </ol>
    )
}
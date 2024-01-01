import { Link } from "react-router-dom"

function PoemCard(props : any) {
  return (
    
    <>
    <Link to={`/poems/${props.id}`}>
    
    <div className='flex flex-col bg-slate-200 p-8 justify-evenly gap-4 rounded-lg shadow-2xl' data-tags={props.tags}>
        <div>
            <img src={props.img} alt={props.alt}  />
        </div>
        <div>
            <h1 className='text-2xl'>{props.title}</h1>
           
            <p>{props.content}</p>
            <p>{props.tags}</p>
        </div>
    </div>
    </Link>
    </>
  )
}

export default PoemCard
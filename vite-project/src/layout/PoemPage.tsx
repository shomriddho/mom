
export default function PoemPage(props) {
  return (
    <>
    <div>
        <img src={props.img} alt={props.alt} className="w-full h-96 object-cover" />
        <h1 className="text-4xl font-black text-center">{props.title}</h1>
        <h2 className="text-2xl font-black text-gray-600 text-center">{props.subtitle}</h2>
        <article className="text-lg m-4 p-4 ">{props.content}</article>
    </div>
    </>
  )
}

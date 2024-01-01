import { useState } from "react";
import AudioPlayer from "../components/songplayer"

const Songs: React.FC = () => {

  const songsData = [
    { src:'/s1.mp3', title:"my2", lyrics:"my",  description:"my",  subtitle:"my", tags:["my", "my2", "my3"]},
    {src:'/s1.mp3' ,title:"my", lyrics:"my" , description:"my",  subtitle:"my", tags:["my", "my6", "my77"]}
  ]

  
    const [selectedTag, setSelectedTag] = useState(''); // State to store the selected tag
    const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
  
    // Filter poems based on the selected tag and search query
    const filteredSongs = songsData.filter(
      songs =>
        (selectedTag ? songs.tags.includes(selectedTag) : true) &&
        (searchQuery ? songs.title.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    );
  

  return (
    <>

     <h1 className="text-6xl text-center font-black p-0 underline">Songs</h1>
     <h1 className="text-5xl text-center  mb-4">গান</h1>
     <div className="mb-4 pb-4 flex flex-wrap justify-center gap-3">
     <input
          type='text'
          placeholder='Search by title'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='border border-gray-300 rounded p-2 sm:float-right'
        />
          <div className='flex flex-wrap justify-center gap-3 sm:float-left '>
        {/* Buttons to select tags */}
        <button onClick={() => setSelectedTag('')} className='p-2 rounded-md bg-slate-200'>
          All
        </button>
        <button onClick={() => setSelectedTag('my77')} className='p-2 rounded-md bg-slate-200'>
          Poems
        </button>
        <button onClick={() => setSelectedTag('nature')} className='p-2 rounded-md bg-slate-200'>
          Nature
        </button>
        <button onClick={() => setSelectedTag('love')} className='p-2 rounded-md bg-slate-200'>
          Love
        </button>
        <button onClick={() => setSelectedTag('hate')} className='p-2 rounded-md bg-slate-200'>
          hate
        </button>
        <button onClick={() => setSelectedTag('sad')} className='p-2 rounded-md bg-slate-200'>
          sad
        </button>
        <button onClick={() => setSelectedTag('happy')} className='p-2 rounded-md bg-slate-200'>
          happy
        </button>
        <button onClick={() => setSelectedTag('angry')} className='p-2 rounded-md bg-slate-200'>
          angry
        </button>
      </div>
     </div>
    <div className="">
   
      <div className="p-8">
      {filteredSongs.map((songs, index) => (
          <AudioPlayer
            key={index}
            subtitle={songs.subtitle}
            title={songs.title}
            description={songs.description}
            lyrics={songs.lyrics}
            src={songs.src}
            tags={songs.tags}
          />
        ))}
      </div>
    </div>
    </>
  )
}

export default Songs
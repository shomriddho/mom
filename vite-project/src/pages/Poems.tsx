import { useState } from 'react';
 // Make sure the path is correct
import PoemCard from '../components/poem-card';

const poemsData = [{"alt":"string","title":"string","id":1,"description":"string","tags":"string","img":"string","url":"string"},{"alt":"string","title":"string","id":2,"description":"string","tags":"string","img":"string","url":"string"},{"alt":"string","title":"string","id":3,"description":"string","tags":"string","img":"string","url":"string"},{"alt":"string","title":"string","id":4,"description":"string","tags":"string","img":"string","url":"string"},{"alt":"string","title":"string","id":5,"description":"string","tags":"string","img":"string","url":"string"},{"alt":"string","title":"string","id":6,"description":"string","tags":"string","img":"string","url":"string"},{"alt":"string","title":"string","id":7,"description":"string","tags":"string","img":"string","url":"string"},{"alt":"string","title":"string","id":8,"description":"string","tags":"string","img":"string","url":"string"}]

function Poems() {
  const [selectedTag, setSelectedTag] = useState(''); // State to store the selected tag
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query

  // Filter poems based on the selected tag and search query
  const filteredPoems = poemsData.filter(
    poem =>
      (selectedTag ? poem.tags.includes(selectedTag) : true) &&
      (searchQuery ? poem.title.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  );

  return (
    <>
      <h1 className='text-6xl text-center px-4 font-black underline'>Poems</h1>
     
      <h1 className='text-5xl text-center'> কবিতা </h1>
      <div className='w-full sm:flex   sm:justify-between justify-center gap-4 px-4 mb-4'>
      <div className='flex flex-wrap justify-center gap-3 sm:float-left '>
        {/* Buttons to select tags */}
        <button onClick={() => setSelectedTag('')} className='p-2 rounded-md bg-slate-200'>
          All
        </button>
        <button onClick={() => setSelectedTag('poem')} className='p-2 rounded-md bg-slate-200'>
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
      <div className='flex justify-center gap-2'>

        <input
          type='text'
          placeholder='Search by title'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='border border-gray-300 rounded p-2 sm:float-right'
        />
      </div>
     </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {/* Map through filtered poems and render PoemCard components */}
        {filteredPoems.map((poem, index) => (
          <PoemCard
            key={index}
            img={poem.img}
            title={poem.title}
            content={poem.description}
            alt={poem.alt}
            id={poem.id}
            tags={poem.tags}
          />
        ))}
      </div>
    </>
  );
}

export default Poems;

import DeleteHandler from '@/components/DeleteHandler';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

type VideoInfo = {
  _id: string;
  youtubeEmbedId: string;
  directorsName: string;
  fileTitle: string;
  heroImageId: string;
  category: string;
};

const getAllFilms = async () => {
  try {
    const response = await axios.get('https://white-owl-backend.onrender.com/films/get');
    return response?.data as VideoInfo[];
  } catch (error) {
    console.log('error', error);
  }
};

const AllFilms = async () => {
  const getAllFilmsResponse = await getAllFilms();

  return (
    <div>
      <Link className='text-red-400 text-3xl ' href='/'>
        Back to Home
      </Link>
      <div className='text-white text-3xl'>All Films</div>
      {getAllFilmsResponse?.map(
        ({ _id, heroImageId, fileTitle, directorsName, youtubeEmbedId }) => (
          <div className='flex flex-row' key={_id}>
            <div className='m-16 flex-1 overflow-hidden'>
              <Image
                src={`https://ik.imagekit.io/whiteowl/${heroImageId}`}
                loading='lazy'
                alt={fileTitle}
                width={960}
                height={637}
              />
              <div className='p-10 font-normal'>
                <div className=''>{fileTitle}</div>
                <div>{`// dir. ${directorsName}`}</div>
              </div>
            </div>
            <DeleteHandler vimeoId={youtubeEmbedId} />
          </div>
        )
      )}
    </div>
  );
};

export default AllFilms;

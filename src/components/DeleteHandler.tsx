'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteHandler = ({ vimeoId }: { vimeoId: string }) => {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        try {
          const response = await axios.delete(
            'https://white-owl-backend.onrender.com/films/delete',
            {
              data: {
                youtubeEmbedId: vimeoId
              }
            }
          );
          console.log('first', response.data);
          router.refresh();
        } catch (error) {
          console.log('error', error);
        }
      }}
    >
      Delete
    </button>
  );
};

export default DeleteHandler;

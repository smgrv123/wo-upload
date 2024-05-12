'use client';

import Input from '@/components/Input';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const authenticator = async () => {
  try {
    const response = await fetch('https://white-owl-backend.onrender.com/auth');

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed`);
  }
};

export default function Home() {
  const [fileName, setfileName] = useState('');

  const router = useRouter();

  const urlEndpoint = 'https://ik.imagekit.io/whiteowl/';
  const publicKey = 'public_ZJ5VIUcEhCMulzIAnQt3qGbC2kc=';

  const onError = (err: any) => {
    console.log('Error', err);
  };

  const onSuccess = (res: any) => {
    router.push(`/upload-details?imageId=${res.name}`);
  };

  return (
    <main className='flex min-h-screen flex-col p-24'>
      <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
        <p>Upload an image</p>
        <Input placeholder='Image Name' setValue={setfileName} value={fileName} />
        {!fileName && <div>Without a file name, you can not upload an image</div>}
        {fileName && (
          <IKUpload
            fileName={fileName.replace(/ /g, '-')}
            onError={onError}
            onSuccess={onSuccess}
          />
        )}
      </IKContext>
    </main>
  );
}

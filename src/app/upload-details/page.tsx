'use client';

import Input from '@/components/Input';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { z } from 'zod';

interface data {
  filmTitle: string;
  directorName: string;
  vimeoId: string;
  category: string;
}

const ErrorHandlingText = ({ errorText }: { errorText?: string }) =>
  errorText && <span className='text-red-700'>{errorText}</span>;

const SumbitButton = ({
  handleSubmit
}: {
  handleSubmit: (e: any, heroImageId: string) => void;
}) => {
  const searchParams = useSearchParams();
  const heroImageId = searchParams.get('imageId');

  return (
    <button
      className='bg-white text-black p-3 rounded-md m-4'
      onClick={(e) => {
        if (heroImageId) handleSubmit(e, heroImageId);
        else alert('Image Id not Found');
      }}
    >
      Submit
    </button>
  );
};

const UploadDetails = () => {
  const [filmTitle, setfilmTitle] = useState('');
  const [directorsName, setdirectorsName] = useState('');
  const [vimeoId, setvimeoId] = useState('');
  const [category, setcategory] = useState('');

  const [errors, setErrors] = useState<Partial<data>>({});

  const userSchema = z.object({
    filmTitle: z.string().min(3, 'Film Title must be at least 2 characters'),
    directorName: z.string(),
    vimeoId: z.string().min(4, 'Vimeo ID invalid'),
    category: z.string().min(2, 'Enter cateogry')
  });

  const validateField = (fieldName: keyof data, fieldValue: string) => {
    try {
      userSchema.shape[fieldName].parse(fieldValue);
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: null }));
    } catch (error) {
      if (error instanceof z.ZodError)
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error.message }));
    }
  };

  const handleSubmit = async (e: any, heroImageId: string) => {
    e.preventDefault();

    try {
      userSchema.parse({ filmTitle, directorName: directorsName, vimeoId, category });
      // Form is valid, perform submission logic
      console.log('Form submitted:', { filmTitle, directorName: directorsName, vimeoId, category });
      const response = await axios.post('https://white-owl-backend.onrender.com/films/post', {
        heroImageId,
        youtubeEmbedId: vimeoId,
        directorsName,
        fileTitle: filmTitle,
        category
      });
      console.log('response', response);
    } catch (error) {
      // Form is invalid, update error state
      if (error instanceof z.ZodError) setErrors(error.formErrors.fieldErrors);
      console.log('errro', error);
      alert(error);
    }
  };

  return (
    <div className='flex justify-center flex-col items-center'>
      <p>Film Title</p>
      <Input setValue={setfilmTitle} value={filmTitle} placeholder='Enter Films Title' />

      {errors.filmTitle && <ErrorHandlingText errorText={errors.filmTitle} />}
      <p>Directors Name</p>
      <Input setValue={setdirectorsName} value={directorsName} placeholder='Enter Directors Name' />

      {errors.directorName && <ErrorHandlingText errorText={errors.filmTitle} />}
      <p>Vimeo Id</p>
      <Input setValue={setvimeoId} value={vimeoId} placeholder='Enter Vimeo Id; Eg-w5BTJbTb24M' />
      {errors.vimeoId && <ErrorHandlingText errorText={errors.vimeoId} />}

      <p>Category</p>
      <Input setValue={setcategory} value={category} placeholder='Enter Vimeo Id; Eg-w5BTJbTb24M' />

      {errors.category && <ErrorHandlingText errorText={errors.category} />}
      <Suspense>
        <SumbitButton handleSubmit={handleSubmit} />
      </Suspense>
    </div>
  );
};

export default UploadDetails;

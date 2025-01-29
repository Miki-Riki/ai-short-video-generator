import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='relative w-full h-screen flex justify-center items-center'>
      <video
        autoPlay
        loop
        muted
        className='absolute top-0 left-0 w-full h-full object-cover'
      >
        <source src='/background.mp4' type='video/mp4' />
      </video>
      <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'></div>
      <div className='relative z-10 p-6 rounded-xl shadow-lg'>
        <SignIn />
      </div>
    </div>
  );
}

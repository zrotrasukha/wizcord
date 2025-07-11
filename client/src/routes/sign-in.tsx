import { createFileRoute } from '@tanstack/react-router'
import { Progress } from '@radix-ui/react-progress'
import ClSignIn from '@/components/pageComponents/cl-signIn'
import { useAuth } from '@clerk/clerk-react';
import loginImage from "@/assets/anime-style-house-architecture.jpg"

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-900">
        <div className="w-full max-w-md px-6">
          <Progress value={22} className="h-3 bg-purple-200" />
          <p className="mt-4 text-center text-sm text-purple-100 font-mono animate-pulse">
            Loading login screen...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='h-screen w-screen bg-purple-950 flex flex-col lg:flex-row'>
      
      {/* Form Side */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 '>
        <div className='
        w-full max-w-md'>
          <h1 className='text-purple-300 text-5xl lg:text-7xl font-bold mb-4'>Hello!</h1>
          <p className='text-purple-200 text-xl mb-6'>Let's get your account setup!</p>
          <ClSignIn />
        </div>
      </div>

      {/* Image Side */}
      <div className='hidden lg:block lg:w-1/2 py-10  pr-0'>
        <div className='h-full w-full overflow-hidden rounded-l-2xl border-2 border-r-0 border-white'>
          <img
            src={loginImage}
            alt="home image"
            className='object-cover h-full w-full'
          />
        </div>
      </div>

    </div>
  );
}
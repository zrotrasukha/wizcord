
import { SignedIn, useUser } from '@clerk/clerk-react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoaded) return; 
    if(!isSignedIn) {
      navigate({ to: '/sign-in' });
    }
  }, [isLoaded, isSignedIn]);
  return (
    <div>
      <SignedIn>
        <div className='h-screen w-screen bg-zinc-950 text-white'>
          <div>you're signed in! 🎉</div>
        </div>
      </SignedIn>
    </div>
  );
}
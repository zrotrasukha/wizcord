import { SignedIn, useAuth, useUser } from '@clerk/clerk-react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import axios from 'axios';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
 
  const { getToken } = useAuth()

  const makeApiCall = async () => {
   const token = await getToken()
    
    const response = await axios.get('http://localhost:4000/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    
    console.log('Response from API:', response.data);
    
    return response.data
    } 
  
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      navigate({ to: '/sign-in' });
    }
  }, [isLoaded, isSignedIn]);
    return (
      <div>
        <SignedIn>
          <div className='h-screen w-screen bg-zinc-950 text-white'>
            <div>you're signed in! 🎉</div>
            <button
              onClick={async () => {
              await makeApiCall();
              }}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Get Token
            </button>
           
          </div>
        </SignedIn>
      </div>
    );
  }

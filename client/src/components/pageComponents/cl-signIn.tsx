import { appearance } from '@/lib/cl-appearance'
import { SignIn } from '@clerk/clerk-react'
import { Link } from '@tanstack/react-router'

export default function ClSignIn() {
    return (
        <div className='mt-2 flex flex-col'>
            <SignIn
                appearance={appearance}
            />
            <div className="w-xl lg:w-lg h-fit mt-2 flex flex-col justify-center items-center bg-purple-200 border-4 border-black rounded-2xl shadow-[6px_6px_0_0_rgba(0,0,0,1)] p-4 font-mono font-bold text-sm text-black">
                <p>Don't have an account yet?
                    <Link to='/sign-up' className="text-purple-900 hover:text-purple-700 ml-2">Sign-up</Link>
                </p>
            </div>
        </div>
    )
}

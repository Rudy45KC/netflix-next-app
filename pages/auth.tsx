import { useCallback, useState } from "react";
import Input from "../components/Input";
 
const Auth = () => {
    // React hook :- useState()
    // useState() hook -> useState is a React Hook that lets you add a state variable to your component.
    // const [state, function to update state] = useState(initialState);
    // useState hook returns an array of exactly two values. that are, current state & and a function that lets you update the state to
    // a different value and trigger a re-render.
    const [email, setEmail] = useState('');
    const [name, setName] = useState(''); 
    const [password, setPassword] = useState('');
    const [mode, setMode] =  useState('login');

    const toggleMode =  useCallback(() => {
        setMode((currentMode) => currentMode === 'login' ? 'register' : 'login');
    }, [])

    return (
        //bg-[url('')] -> tailwind util class that allows you to use custom background.
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black h-full w-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:max-w-md lg:w-2/5 rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">{mode === 'login' ? 'Sign in' : 'Register'}</h2>
                        <div className="flex flex-col gap-4"> 
                        {mode === 'register' && ( 
                        <Input
                        label="Username"
                        onChange={(ev: any) => setName(ev.target.value)}
                        id="name"
                        value={name}
                        />
                        )}
                        <Input
                        label="Email"
                        onChange={(ev: any) => setEmail(ev.target.value)}
                        id="email"
                        type="email"     
                        value={email}
                        />
                         <Input
                        label="Password"
                        onChange={(ev: any) => setPassword(ev.target.value)}
                        id="password"
                        value={password}
                        />
                        <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                        {mode === 'login' ? 'Login' : 'Sign up'}
                        </button>
                        
                        <p className="text-neutral-500 mt-12">
                        {mode === 'login' ? 'First time using Netflix ?' : ' already have an account'}
                            <span onClick={toggleMode} className="text-white ml-1 hover:underline cursor-pointer">
                                {mode === 'login' ? '  Create an account' : '  Login'}</span>
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
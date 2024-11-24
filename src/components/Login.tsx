
'use client'

import { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from '@/utils/supabase/client';
import { RussoOne } from '@/src/app/fonts/font'
import { RxResume } from 'react-icons/rx';
function Login() {

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div
            className={`text-white ${RussoOne.className} transition-transform duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'
                }`}
        >
            <p className="text-2xl gap-4 justify-center items-center flex text-center mb-10 "><RxResume className='text-3xl text-cyan-600 mb-1' /><span>AI-GEN CV</span></p>
            <Auth
                supabaseClient={supabase}
                appearance={{
                    theme: ThemeSupa,
                    style: {
                        label: { color: 'white' },
                        container: { width: '20em' },
                        button: { backgroundColor: '#0F172A', borderColor: '#0891b2', borderRadius: '0', borderWidth: '2px', },
                        input: { backgroundColor: '#0F172A', borderColor: '#00838F', color: 'white', borderRadius: '0' },
                        anchor: { textDecoration: 'none' },
                        divider: { backgroundColor: '#00838F' },
                    },
                }}
                providers={['google']}
                theme="dark"
                redirectTo="https://aigencv.vercel.app/auth/callback"
            />
        </div>
    );
}

export default Login;


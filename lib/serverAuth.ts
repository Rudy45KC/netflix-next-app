import { NextApiRequest } from "next";
import { getSession } from 'next-auth/react';
import prismadb from '@/lib/prismadb';

//server authorization being done using this function
const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({req}); //fetching logged-in user session.

    if(!session?.user?.email){
        throw new Error('Not signed in.');
    }

    const currentUser = await prismadb.user.findUnique({
        where:{
            email: session.user.email,
        }
    });

    if(!currentUser){
        throw new Error("Not signed in");
    }

    return { currentUser };
}

export default serverAuth;
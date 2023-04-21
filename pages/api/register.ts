import bcrypt from 'bcrypt';
import {NextApiRequest, NextApiResponse} from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res:NextApiResponse){
    if(req.method !== 'POST'){
        // The HyperText Transfer Protocol (HTTP) 405 Method Not Allowed response status code indicates 
        // that the server knows the request method, but the target resource doesn't support this method.
        return res.status(405).end(); 
    }
    try{
        const { email, name, password } = req.body;

        const existingUser = await prismadb.user.findUnique({
            where:{
                email,
            }
        });

        if(existingUser){
            // The HyperText Transfer Protocol (HTTP) 422 Unprocessable Content response status code indicates that the server 
            // understands the content 
            // type of the request entity, and the syntax of the request entity is correct, 
            // but it was unable to process the contained instructions.
            // Warning: The client should not repeat this request without modification.

            return res.status(422).json({error: "Email already exists."});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email, //email: email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });

        // The HTTP 200 OK success status response code indicates that the request has succeeded.
        //  A 200 response is cacheable by default.
        return res.status(200).json(user);
    } catch(error){
        console.log(error + "in catch block hey krish");
        // The HyperText Transfer Protocol (HTTP) 400 Bad Request response status code indicates that the server cannot 
        // or will not process the request due to something that is perceived to be a 
        // client error (for example, malformed request syntax, invalid request message framing, or deceptive request routing).
        return res.status(400).end();
    }
}
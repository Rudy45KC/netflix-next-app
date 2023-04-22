import { NextPageContext } from "next";
import { getSession, signOut } from 'next-auth/react';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if(!session){
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}


export default function Home() {
  return (
    <>
    <h1 className="text-4xl text-white">Netflix clone</h1>
    <button onClick={() => signOut()} className="h-10 w-full bg-white"></button>
    </>
  
  )
}

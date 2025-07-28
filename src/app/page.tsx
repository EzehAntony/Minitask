"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FireworkSpinner } from "react-spinners-kit";
import { motion } from "framer-motion";

export default function Home () {
  const router = useRouter();

  /* Basically reroutes the page to "/home" after 3 second */
  useEffect( () => {
    setTimeout( () => {
      router.push( "/home" );
    }, 3000 );
  } );

  return (
    <div className="h-screen flex flex-col overflow-hidden justify-center items-center gap-4">
      <motion.h1
        className="font-bold text-5xl"
        initial={ { opacity: 0, scale: 0.5, y: -50 } }
        animate={ { opacity: 1, scale: 1, y: 0 } }
        transition={ {
          duration: 0.8,
          ease: "easeOut",
          type: "spring",
          stiffness: 100
        } }
      >
        Mini task
      </motion.h1>
      <FireworkSpinner color="#ffffff" size={ 40 } loading={ true } />
    </div>
  );
}

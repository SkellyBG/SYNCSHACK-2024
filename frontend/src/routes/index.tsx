import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
  component: () => (
    <>
      <body className="bg-[url('../Landing_Page_BG.png')] bg-bottom bg-cover bg-no-repeat min-h-[calc(100vh-148px)]">
        <div className="px-[calc(15rem)] my-8 relative flex items-center center justify-between">
          <div>
            <span>
              <div className="text-5xl font-bold">Find the right team for <span className="text-white text-5xl font-bold">you<span className="text-5xl font-bold">.</span></span></div>
            </span>
            <div className="mt-4 text-xl">Team members who share your academic goals, preferred communication platform, and working style!</div>
            <Button asChild className="mt-4  hover:bg-blue-600 hover:blue-600">
              <Link to="/sign-up" className="text-lg hover:bg-blue-600">
                Get Started!
              </Link>
            </Button>
            <Button asChild className="mt-4 ml-4" variant='outline'>
              <Link to="/sign-up" className="text-lg border-2 border-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600">
                Login
              </Link>
            </Button>
          </div>
          <div className="relative inset-0 flex">
            <img className="h-85 w-85 motion-safe:animate-pulse  transform transition duration-500 hover:scale-105" src='../Landing_Page_Ball.png' alt='Logo' />
          </div>
        </div>
        <div className="rounded-2xl mx-10 bg-white bg-opacity-50 p-4 px-20 flex justify-between items-center bg-blend-overlay">
          <img className="max-h-20" src='../Landing_Page_UNSW.png' alt='Logo' />
          <img className="max-h-16" src='../Landing_Page_USYD.png' alt='Logo' />
          <img className="max-h-14" src='../Landing_Page_UTS.png' alt='Logo' />
          <img className="max-h-24" src='../Landing_Page_UNIMELB.png' alt='Logo' />
        </div>
      </body>
    </>
  )
})
import Image from "next/image";
import LogoHero from "@/assets/LogoBig.png";
import Navbar from "@/components/navbar/Navbar";

export default function HomeLayout() {
  return (
    <div className='bg-white h-screen'>
      <Navbar />
      <div className='relative isolate px-6 pt-14 lg:px-8'>
        {/* gradient blob */}
        <div
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className='hidden  md:block absolute rotate-12 bottom-20 -left-12'>
          <Image src={LogoHero} height={350} width={350} alt='tect' />
        </div>
        <div className='mx-auto max-w-2xl py-20 sm:py-28 lg:py-36'>
          <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
            <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
              Announcing our new platform.{" "}
              <a href='#' className='font-semibold text-primary'>
                <span className='absolute inset-0' aria-hidden='true' />
                Read more <span aria-hidden='true'>&rarr;</span>
              </a>
            </div>
          </div>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-primary tracking-tight sm:text-6xl'>
              Amber Social <br />{" "}
              <span className='text-4xl text-black'>Your new Social App</span>
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Transforming the social experience with the power of Amber.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <a
                href='/signin'
                className='rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Get started
              </a>
              <a
                href='#'
                className='text-sm font-semibold leading-6 text-gray-900'
              >
                Learn more <span aria-hidden='true'>→</span>
              </a>
            </div>
          </div>
        </div>
        {/* gradient blob */}
        <div
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className='absolute hidden  md:block -rotate-12 bottom-20 -right-12 '>
          <Image
            src={LogoHero}
            height={150}
            width={150}
            alt='tect'
            className='rounded-md'
          />
        </div>
        <div className='absolute hidden  md:block  -bottom-48 right-96 blur-sm'>
          <Image
            src={LogoHero}
            height={250}
            width={250}
            alt='tect'
            className='rounded-md'
          />
        </div>
      </div>
    </div>
  );
}

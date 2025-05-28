import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Main container with a specific height */}
      <div className="flex flex-col items-center text-white h-[60vh] justify-center px-5 md:px-0 text-xs md:text-base">
        {/* Title and Image */}
        <div className="font-bold flex items-center gap-4 md:gap-6 text-3xl md:text-5xl">
          <span>Get Me a Chai</span>
          <Image
            className="invertImg"
            src="/tea.gif"
            alt="Tea"
            width={80}
            height={80}
          />
        </div>

        {/* Updated lines below the title */}
        <p className="text-center mt-4 text-xl font-semibold text-gray-200 shadow-lg">
          Empower your dreams, one chai at a time. Join a community of creators and supporters.
        </p>
        <p className="text-center text-lg font-semibold text-gray-200 shadow-lg">
          Discover, engage, and make a difference with every sip.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <Link href="/login">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-6 py-3 text-center"
            >
              Start Here
            </button>
          </Link>
          <Link href="/about">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-6 py-3 text-center"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>

      {/* Divider with higher opacity */}
      <div className="bg-white h-1 opacity-20"></div>

      {/* Additional sections */}
      <div className="text-white container mx-auto pb-32 pt-14 px-10">
        <h2 className="text-3xl font-bold text-center mb-14">Your Fans Can Buy You a Chai</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/man.gif" alt="" />
            <p className="font-bold text-center">Fans Want to Help</p>
            <p className="text-center">Your fans are available to support you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/coin.gif" alt="" />
            <p className="font-bold text-center">Fans Want to Contribute</p>
            <p className="text-center">Your fans are willing to contribute financially</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/group.gif" alt="" />
            <p className="font-bold text-center">Fans Want to Collaborate</p>
            <p className="text-center">Your fans are ready to collaborate with you</p>
          </div>
        </div>
      </div>

      {/* Divider with higher opacity */}
      <div className="bg-white h-1 opacity-20"></div>

      {/* Learn more about us section */}
      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn More About Us</h2>
        {/* Responsive YouTube embed */}
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/JxKeF21DiWQ?si=Hd6cN1uqTlewiaUs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}

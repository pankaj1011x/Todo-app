import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-end  bg-black w-full  h-10 pr-5 pt-3 ">
        <button
          onClick={() => {
            navigate("/signin");
          }}
          type="button"
          class="text-black bg-white font-semibold rounded-lg text-m px-5
           "
        >
          Login
        </button>
      </div>
      <div className="flex-1 bg-black  flex justify-center items-center">
        <div>
          <div className="flex justify-center mb-5">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-20 w-20"
                color="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>

          <div className="text-white font-sans  text-6xl mb-3 font-extrabold">
            MINIMAL TODO
          </div>
          <div className=" flex justify-center text-white text-2xl mb-5 font-thin tracking-wide">
            <p className="tracking-widest">FOR YOUR DAILY LIST</p>
          </div>
        </div>
      </div>
    </div>
  );
}

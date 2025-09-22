// file: components/Subscribe.jsx
'use client'
const Subscribe = () => {
    return (
        <section
            className="relative w-full h-[30vh] min-h-[400px] my-20 bg-cover bg-center bg-no-repeat flex items-center bg-black font-redhead justify-center"
            // The background image is applied here via inline styles
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1744526313164-57e293bf8033?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        >
            {/* Optional: Add a semi-transparent overlay if your image is too bright */}
            {/* <div className="absolute inset-0 bg-black opacity-30"></div> */}

            <div className="relative z-10 w-full h-full flex items-center justify-center text-center flex-col px-4 bg-black/70 ">

                <h2 className="text-amber-400 font-bold text-3xl sm:text-4xl md:text-5xl  mx-auto leading-tight">
                    STAY UPTO DATE ABOUT <br /> OUR LATEST OFFERS
                </h2>

                <form
                    className="mt-8  mx-auto flex gap-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        // Handle form submission logic here
                        alert("Thank you for subscribing!");
                    }}
                >
                    <div className="flex items-center border  border-amber-400 rounded-xl ">
                        <input
                            type="email"
                            name="email"
                            placeholder="E-MAIL"
                            required
                            className="flex-grow bg-transparent py-3 px-4 w-[400px] text-white placeholder-gray-400 focus:outline-none"
                        />

                    </div>
                    <button
                        type="submit"
                        className="bg-amber-400 text-gray-900 font-bold py-3 px-8 rounded-xl  hover:bg-amber-500 transition-colors duration-300"
                    >
                        SUBSCRIBE
                    </button>
                </form>

            </div>
        </section>
    );
};

export default Subscribe;
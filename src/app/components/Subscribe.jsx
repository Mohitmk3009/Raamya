// file: components/Subscribe.jsx
'use client'
const Subscribe = () => {
    return (
        <section
            className="relative w-full h-[30vh] lg:min-h-[400px] my-12 md:my-20 bg-cover bg-center bg-no-repeat flex items-center bg-black font-redhead justify-center"
            // The background image is applied here via inline styles
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1744526313164-57e293bf8033?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        >
            <div className="relative z-10 w-full h-full flex items-center justify-center text-center flex-col p-5 sm:p-6 bg-black/70 ">

                {/* MODIFICATION: Removed <br /> and added max-w-* for graceful text wrapping */}
                <h2 className="text-amber-400 font-bold text-2xl sm:text-4xl md:text-5xl mx-auto leading-tight max-w-2xl">
                    STAY UPTO DATE ABOUT OUR LATEST OFFERS
                </h2>

                {/* MODIFICATION: Form now stacks vertically on mobile and has a max-width */}
                <form
                    className="mt-8 mx-auto flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg"
                    onSubmit={(e) => {
                        e.preventDefault();
                        // Handle form submission logic here
                        alert("Thank you for subscribing!");
                    }}
                >
                    {/* MODIFICATION: Wrapper div is now full-width and input grows on larger screens */}
                    <div className="flex items-center border border-amber-400 rounded-xl w-full sm:flex-grow">
                        <input
                            type="email"
                            name="email"
                            placeholder="YOUR E-MAIL ADDRESS"
                            required
                            // MODIFICATION: Removed fixed width, now it's responsive
                            className="w-full bg-transparent py-3 px-4 text-white placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        // MODIFICATION: Button is full-width on mobile and auto-width on larger screens
                        className="bg-amber-400 text-gray-900 font-bold py-3 px-8 rounded-xl hover:bg-amber-500 transition-colors duration-300 w-full sm:w-auto"
                    >
                        SUBSCRIBE
                    </button>
                </form>

            </div>
        </section>
    );
};

export default Subscribe;
import React, { useRef, useState } from "react";
import { searchFlights } from "../services/api";
import home1 from "../assets/images/home1.png";
import flight1 from "../assets/images/flight1.png";
import foot1 from "../assets/images/foot1.jpg";
import { FaPlane, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const [flights, setFlights] = useState([]);
  const offerRef = useRef(null);

  const handleSearch = async (criteria) => {
    const foundFlights = await searchFlights(criteria);
    setFlights(foundFlights || []);
  };

  const scrollToOffers = () => {
    if (offerRef.current) {
      offerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 850, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-teal-400 text-slate-900">
      {/* HERO */}
     {/* --- RESPONSIVE HEADER --- */}
<header className="relative overflow-hidden">
  {/* background image area with smaller height on mobile */}
  <div className="relative h-[48vh] sm:h-[58vh] md:h-[68vh] lg:h-[74vh]">
    <img
      src={home1}
      alt="travel-hero"
      className="absolute inset-0 w-full h-full object-cover object-center"
    />

    {/* overlay for readability */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent backdrop-blur-sm" />

    {/* content container: add top padding so fixed navbar doesn't overlap (adjust 16/20 if your navbar is taller) */}
    <div className="relative z-20 max-w-7xl mx-auto h-full px-5 md:px-10 flex items-center pt-16 md:pt-6">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* LEFT: heading & CTAs */}
        <div className="text-white max-w-full md:max-w-xl">
          <p className="text-xs sm:text-sm uppercase tracking-widest text-white/80">
            Travel made simple
          </p>

          {/* responsive headings: smaller on tiny screens, scale up on larger */}
          <h1 className="mt-3 font-righteous text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug md:leading-tight drop-shadow-md">
            We provide the{" "}
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-200">
              world's best flight deals
            </span>
            <br />
            Safe & Secure
          </h1>

          <p className="mt-3 text-sm sm:text-base text-white/85">
            Fast search, secure booking and real-time updates. Compare fares,
            select seats and check out — all in one place.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/flightSearch"
              className="inline-flex items-center gap-3 bg-white text-blue-700 font-semibold px-4 sm:px-5 py-2.5 rounded-lg shadow hover:-translate-y-0.5 transition"
            >
              <FaSearch />
              <span className="text-sm sm:text-base">Find Flights</span>
            </Link>

            <button
              onClick={scrollToOffers}
              className="inline-flex items-center gap-3 bg-white/10 border border-white/25 text-white px-4 sm:px-5 py-2.5 rounded-lg hover:bg-white/15 transition"
            >
              <span className="text-sm sm:text-base">Get Started</span>
            </button>
          </div>

          <div className="mt-4 mb-6 flex flex-wrap gap-2 text-xs sm:text-sm">
            <div className="bg-white/10 px-3 py-1 rounded-md">
              <strong className="text-white">99.9%</strong> on-time departures
            </div>
            <div className="bg-white/10 px-3 py-1 rounded-md">
              <strong className="text-white">Easy</strong> cancellations
            </div>
          </div>
        </div>

        {/* RIGHT: promo card (STACKS under left section on small screens) */}
        <div className="flex justify-center md:justify-end hidden md:block">
          <div className="w-full md:w-[420px] lg:w-[480px] rounded-xl bg-white/5 backdrop-blur-sm p-4 sm:p-5 md:p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              {/* flight image hidden on small screens to avoid overlap */}
              <img
                src={flight1}
                alt="promo-flight"
                className="hidden md:block w-32 lg:w-40 object-contain"
              />

              <div className="flex-1 text-white/95">
                <p className="text-xs uppercase tracking-wide text-white/80">Limited Offer</p>
                <h3 className="mt-1 text-xl sm:text-2xl md:text-3xl font-semibold">25% OFF</h3>
                <p className="mt-2 text-sm text-white/80">
                  Exclusive fares on selected routes — book now and save. Flexible refunds & seat selection.
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  <Link
                    to="/flightSearch"
                    className="px-3 py-2 bg-white text-blue-700 rounded-md font-medium shadow-sm hover:scale-105 transition text-sm"
                  >
                    Book Now
                  </Link>

                  <button
                    onClick={scrollToOffers}
                    className="px-3 py-2 bg-transparent border border-white/20 rounded-md text-white/90 hover:bg-white/10 transition text-sm"
                  >
                    Learn more
                  </button>
                </div>

                <div className="mt-2 text-sm text-white/70">
                  <span className="block">Seats filling fast</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end grid */}
      </div>
    </div>
  </div>
</header>


      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 mt-8 md:mt-12 pb-12">
        {/* Steps section */}
        <section className="bg-indigo-700/95 rounded-2xl shadow-2xl p-6 md:p-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="md:flex-1">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-4xl text-white font-semibold">Book Your Flight with</h2>
                <span className="bg-blue-600 px-4 py-2 text-white text-lg md:text-3xl rounded-md font-righteous">
                  RenAirline.in
                </span>
              </div>
              <p className="mt-4 text-gray-200 max-w-2xl">
                Search, select, pay — and fly. We simplify every step so you can focus on your journey.
              </p>
            </div>

            <div className="md:flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { title: "Search Flight", icon: <FaSearch className="text-xl text-white" /> },
                  { title: "Select Flight", icon: <FaPlane className="text-xl text-white" /> },
                  { title: "Book Flight", icon: <FaPlane className="text-xl text-white" /> },
                  { title: "Enjoy Flight", icon: <FaPlane className="text-xl text-white" /> }
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 bg-white/5 p-3 rounded-lg text-center hover:bg-white/10 transition"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white/10">
                      {s.icon}
                    </div>
                    <div className="text-white text-sm font-medium">{s.title}</div>
                    <div className="text-xs text-white/60">Quick & smooth</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Offer / promotions */}
        <section ref={offerRef} className="mt-8">
          <div className="bg-indigo-700/95 rounded-2xl p-6 md:p-10 shadow-2xl flex flex-col md:flex-row items-center gap-6">
            <div className="md:flex-1">
              <div className="flex items-center gap-4">
                <span className="bg-gradient-to-r from-blue-500 to-sky-400 px-4 py-2 rounded-full text-white font-semibold">
                  Limited Offer
                </span>
                <h3 className="text-2xl md:text-3xl text-gray-100">Up to <span className="text-4xl font-righteous">25% OFF</span></h3>
              </div>

              <p className="mt-4 text-gray-200 max-w-xl">
                Book early and enjoy discounted fares on select domestic and international routes. Flexible cancellations included.
              </p>

              <div className="mt-6 flex gap-4">
                <Link
                  to="/flightSearch"
                  className="px-5 py-3 bg-white text-blue-700 rounded-lg shadow-md hover:-translate-y-0.5 transition"
                >
                  Grab Offer
                </Link>
                <button className="px-4 py-3 border border-white/20 rounded-lg text-white hover:bg-white/10 transition" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
                  View More
                </button>
              </div>
            </div>

            <div className="md:flex-1 flex justify-center md:justify-end">
              <img src={flight1} alt="promo-flight" className="hidden md:block w-56 md:w-72 lg:w-96 object-contain" />
            </div>
          </div>
        </section>

        {/* Flights preview (conditional) */}
        {flights?.length > 0 && (
          <section className="mt-8">
            <div className="bg-white/5 rounded-xl p-5 shadow-md">
              <h4 className="text-lg text-white mb-4">Available Flights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flights.map((f, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-white/3 rounded-lg">
                    <div>
                      <h5 className="text-white font-medium">{f.airline || "Airline"}</h5>
                      <p className="text-sm text-white/70">{f.route || `${f.from} → ${f.to}`}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">₹ {f.price}</p>
                      <Link to="/booking" className="text-sm text-blue-100">Book</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-12 bg-gradient-to-r from-blue-600 to-teal-400">
        <div className="max-w-7xl mx-auto md:flex justify-between items-start md:px-20 p-6 gap-6">
          <div className="flex items-start gap-4">
            <img src={foot1} alt="logo" className="h-20 w-28 md:h-28 md:w-52 rounded-full object-cover" />
            <div>
              <h1 className="text-2xl md:text-4xl text-white font-righteous"><em>Airline</em></h1>
              <p className="text-sm text-white/80 mt-1">Fly with comfort & confidence</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row md:space-x-10 justify-end">
            <nav className="text-white/90 md:text-base mt-4 space-y-2 md:space-y-0">
              <h2 className="text-white md:text-xl font-bold">Quick Links</h2>
              <ul className="mt-2 space-y-1">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </nav>

            <div className="text-white/90 md:text-base mt-4 space-y-2 md:space-y-0">
              <h2 className="text-white md:text-xl font-bold">Contact Us</h2>
              <ul className="mt-2 space-y-1">
                <li>+91 9876543210</li>
                <li>askmeidentity@gmail.com</li>
                <li>India</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 pb-6">
          <p className="text-white text-center text-sm">© {new Date().getFullYear()} askmeidentity. All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

import { Link } from "react-router-dom";

// HeroSection.jsx
export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white px-6 text-center">
      
      {/* Overlay for style */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Plan. Manage. <span className="text-yellow-300">Celebrate</span> — All Your Events in One Place.
        </h1>

        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Create, organize, and manage your events seamlessly with Eventify.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={`/login`} className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition">
            Get Started
          </Link>
          <Link to={`/`} className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition">
            Explore Events
          </Link>
        </div>
      </div>

      {/* Decorative Gradient Circles */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-pink-400 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-indigo-400 rounded-full blur-3xl opacity-40"></div>
    </section>
  );
}

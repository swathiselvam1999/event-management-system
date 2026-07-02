import { Link } from "react-router-dom";

// HeroSection.jsx
export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-paper text-ink px-6 text-center overflow-hidden">

      {/* Decorative dashed rings - a nod to a ticket's perforated edge */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-2 border-dashed border-ink/10"></div>
      <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full border-2 border-dashed border-coral/20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-coral mb-5">
          Your next event awaits
        </p>

        <h1 className="font-display text-5xl md:text-6xl font-semibold mb-6 leading-[1.1]">
          Plan. Manage. <span className="text-coral">Celebrate</span> — all your events in one place.
        </h1>

        <p className="text-lg text-slate mb-10 max-w-xl mx-auto">
          Create, organize, and manage your events seamlessly with Eventify.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={`/login`} className="bg-coral text-white px-7 py-3.5 rounded-full font-semibold hover:bg-coral/90 transition-colors">
            Get Started
          </Link>
          <Link to={`/`} className="border border-ink/20 px-7 py-3.5 rounded-full font-semibold hover:border-ink hover:bg-ink hover:text-white transition-colors">
            Explore Events
          </Link>
        </div>
      </div>
    </section>
  );
}

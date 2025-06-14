const Hero = () => {
  return (
    <section className="bg-background text-foreground py-20 text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Medico HealthBot 🩺
      </h1>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto">
        Bolo ya likho apna symptom Hinglish mein. Hum denge turant suggestion AI ke zariye.
      </p>
      <div className="mt-6">
        <button className="px-6 py-3 bg-primary text-white rounded-lg shadow hover:opacity-90 transition">
          Try the Chatbot
        </button>
      </div>
    </section>
  );
};

export default Hero;

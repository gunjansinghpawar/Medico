const Features = () => {
  const items = [
    {
      title: "Voice + Text Input",
      desc: "Bol ke ya likh ke symptom batao — AI samjhega Hinglish bhi.",
    },
    {
      title: "Multi-language Support",
      desc: "Input auto translate hoke AI se consult karta hai.",
    },
    {
      title: "Medical Disclaimer Ready",
      desc: "Har suggestion ke saath aata hai safety warning.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-muted text-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Why Use HealthBot?</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {items.map((item, i) => (
            <div key={i} className="bg-background p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

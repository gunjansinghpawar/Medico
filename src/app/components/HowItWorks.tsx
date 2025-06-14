const HowItWorks = () => {
  const steps = [
    "User types or speaks symptom in Hinglish",
    "Input auto-translated to English",
    "AI gives prediction and suggestion",
    "Response translated back to user language",
  ];

  return (
    <section className="py-16 px-6 bg-background text-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <ol className="list-decimal list-inside space-y-3 text-left text-lg">
          {steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorks;

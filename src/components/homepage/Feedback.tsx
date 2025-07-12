const feedbacks = [
  {
    name: "Ankita Sharma",
    role: "Product Manager, StartupX",
    feedback:
      "TrackFlow has completely changed the way we manage engineering sprints. The UI is clean, and assigning issues is seamless.",
  },
  {
    name: "Ravi Patel",
    role: "Freelance Designer",
    feedback:
      "I was able to onboard my client easily and track bugs without using Jira or Trello. This tool just works!",
  },
  {
    name: "Sneha Verma",
    role: "Frontend Engineer",
    feedback:
      "Loved how fast and snappy the interface is. Login, invite, assign — done. Perfect for small dev teams.",
  },
];

const Feedbacks = () => {
  return (
    <section className="px-6 py-16 bg-muted/30">
      <h2 className="text-2xl font-semibold text-center mb-10">
        What Users Are Saying
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {feedbacks.map((fb, index) => (
          <div
            key={index}
            className="bg-background rounded-xl p-6 border shadow-sm hover:shadow-md transition"
          >
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              “{fb.feedback}”
            </p>
            <div className="mt-auto">
              <p className="font-medium">{fb.name}</p>
              <p className="text-xs text-muted-foreground">{fb.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feedbacks;

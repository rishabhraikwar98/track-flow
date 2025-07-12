const logos = [
  {
    name: "GitHub",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Vercel",
    src: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
  },
  {
    name: "MongoDB",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "React",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "TypeScript",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
];

const Logos = () => {
  return (
    <section className="px-6 py-5 bg-background border-t">
      <h2 className="lg:text-xl text-base font-semibold text-center mb-8 text-muted-foreground">
        Powered by Modern Web Technologies
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {logos.map((logo) => (
          <img
            key={logo.name}
            src={logo.src}
            alt={logo.name}
            className="lg:h-10 h-6 grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
          />
        ))}
      </div>
    </section>
  );
};

export default Logos;

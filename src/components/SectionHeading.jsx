// Shared heading so every section looks the same.
const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <div className="mb-8 text-center sm:mb-12">
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
      {eyebrow}
    </p>
    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">{title}</h2>
    {subtitle && <p className="mx-auto mt-4 hidden max-w-2xl text-neutral-400 sm:block">{subtitle}</p>}
  </div>
);

export default SectionHeading;

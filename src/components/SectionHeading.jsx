// Shared heading so every section looks the same.
const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <div className="mb-12 text-center">
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
      {eyebrow}
    </p>
    <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">{title}</h2>
    {subtitle && <p className="mx-auto mt-4 max-w-2xl text-neutral-400">{subtitle}</p>}
  </div>
);

export default SectionHeading;

/**
 * Numbered section marker, borrowed from architectural drawing sheets:
 * a short brick rule, an index and a title.
 */
export function SectionLabel({ index, children, className = "" }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 t-label ${className}`}>
      <span aria-hidden="true" className="h-px w-6 bg-brick" />
      {index && <span className="tabular opacity-70">{index}</span>}
      <span>{children}</span>
    </p>
  );
}

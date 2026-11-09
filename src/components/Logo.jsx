// Deadlock Labs mark: a D built from cycle arrows. The magenta stem points up
// and the arcs loop around, like a deadlock cycle that has been resolved.
const Logo = ({ className = "h-9 w-auto" }) => (
  <svg viewBox="530 130 650 486" className={className} aria-hidden="true">
    <defs>
    <linearGradient id="dlNavy" gradientUnits="userSpaceOnUse" x1="600" y1="180" x2="1100" y2="600"><stop offset="0" stopColor="#24397f"/><stop offset="1" stopColor="#2a4cb0"/></linearGradient>
    <linearGradient id="dlPink" gradientUnits="userSpaceOnUse" x1="580" y1="0" x2="960" y2="0"><stop offset="0" stopColor="#f00ee0"/><stop offset="1" stopColor="#8a1ff0"/></linearGradient>
    <linearGradient id="dlPurple" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#d40fe8"/><stop offset=".55" stopColor="#8b4dfb"/><stop offset="1" stopColor="#2f7af7"/></linearGradient>
    <linearGradient id="dlBlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0a78ee"/><stop offset="1" stopColor="#07a6fb"/></linearGradient>
    <clipPath id="dlCut"><path d="M500 100 H1200 V826 L500 150 Z"/></clipPath>
</defs>
    <g fill="none" strokeWidth="52" strokeLinejoin="miter">
    <path d="M625 352 V212 H900" stroke="url(#dlNavy)"/>
    <path d="M940 252 A136 136 0 0 1 940 568 H790" stroke="url(#dlNavy)"/>
    <path d="M955 228 A150 150 0 0 1 1100 380" stroke="url(#dlBlue)"/>
    </g>
    <path d="M1044 384 H1156 L1100 446 Z" fill="url(#dlBlue)"/>
    <path d="M617 594 V392" stroke="url(#dlPink)" strokeWidth="52" fill="none"/>
    <path d="M561 396 L617 326 L673 396 Z" fill="#f00ee0"/>
    <path d="M591 568 H770 C870 568 922 500 922 398" stroke="url(#dlPink)" strokeWidth="52" fill="none"/>
    <path d="M757 470 C757 300 820 234 892 232" clipPath="url(#dlCut)" stroke="url(#dlPurple)" strokeWidth="56" fill="none"/>
    <path d="M890 170 L958 232 L890 294 Z" fill="#3d72f7"/>
  </svg>
);

export default Logo;

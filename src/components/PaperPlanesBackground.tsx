const planes = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: 18 + Math.random() * 14,
  top: Math.random() * 100,
  left: -10 - Math.random() * 20,
  duration: 12 + Math.random() * 10,
  delay: Math.random() * -20,
  opacity: 0.08 + Math.random() * 0.12,
  rotate: -15 + Math.random() * 30,
  yDrift: 20 + Math.random() * 40,
}));

const PaperPlane = ({ size, color }: { size: number; color: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22 11 13 2 9z" />
  </svg>
);

const PaperPlanesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {planes.map((p) => (
        <div
          key={p.id}
          className="absolute animate-[fly-across_var(--dur)_linear_var(--delay)_infinite]"
          style={
            {
              top: `${p.top}%`,
              left: `${p.left}%`,
              "--dur": `${p.duration}s`,
              "--delay": `${p.delay}s`,
              "--y-drift": `${p.yDrift}px`,
              opacity: p.opacity,
              transform: `rotate(${p.rotate}deg)`,
            } as React.CSSProperties
          }
        >
          <PaperPlane size={p.size} color="white" />
        </div>
      ))}
    </div>
  );
};

export default PaperPlanesBackground;

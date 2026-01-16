const Balloon = ({
  color,
  position,
  animation,
  delay,
}: {
  color: string;
  position: string;
  animation: string;
  delay?: string;
}) => (
  <div
    className={`absolute ${position} ${animation} z-0`}
    style={{ animationDelay: delay }}
  >
    <div className={`relative w-12 h-16 rounded-full shadow-md ${color}`}>
      <div
        className={`absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-3 h-3 ${color} transform rotate-45`}
      />
    </div>
  </div>
);

const Ribbon = ({
  color,
  position,
  animation,
  delay,
}: {
  color: string;
  position: string;
  animation: string;
  delay?: string;
}) => (
  <div
    className={`absolute w-1.5 h-24 origin-top ${color} ${position} ${animation} z-0`}
    style={{ animationDelay: delay }}
  />
);

const HeadingDecorations = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Left side */}
      <Balloon
        color="bg-blue-400"
        position="-top-12 -left-8 -rotate-[25deg]"
        animation="animate-sway-1"
      />
      <Balloon
        color="bg-pink-400"
        position="-top-6 -left-2 rotate-[15deg]"
        animation="animate-sway-2"
        delay="0.5s"
      />
      <Ribbon
        color="bg-purple-400"
        position="top-0 left-[15%] -rotate-[30deg]"
        animation="animate-sway-1"
        delay="0.2s"
      />

      {/* Right side */}
      <Balloon
        color="bg-yellow-400"
        position="-top-12 -right-8 rotate-[25deg]"
        animation="animate-sway-2"
      />
      <Balloon
        color="bg-green-400"
        position="-top-6 -right-2 -rotate-[15deg]"
        animation="animate-sway-1"
        delay="0.5s"
      />
      <Ribbon
        color="bg-orange-400"
        position="top-0 right-[15%] rotate-[30deg]"
        animation="animate-sway-2"
        delay="0.2s"
      />
    </div>
  );
};

export default HeadingDecorations;

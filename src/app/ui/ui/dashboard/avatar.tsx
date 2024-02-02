import clsx from "clsx";

export const Avatar = ({ username }: { username: string }) => {
  const convertedUsername =
    username?.split(" ").reduce((acc, el, idx) => (acc += el[0]), "") || "?";

  const [fromColor, toColor] = generateGradient();

  return (
    <div
      className={clsx(
        `flex h-[60px] w-[60px] items-center justify-center rounded-full text-3xl font-bold text-white/75`,
        `bg-gradient-to-br`,
        fromColor,
        toColor,
      )}
    >
      {convertedUsername}
    </div>
  );
};

export function generateGradient() {
  const FromColors: Record<string, string> = {
    lime: "from-lime-600",
    green: "from-green-600",
    emerald: "from-emerald-600",
    teal: "from-teal-600",
    cyan: "from-cyan-600",
    sky: "from-sky-600",
    blue: "from-blue-600",
    indigo: "from-indigo-600",
    violet: "from-violet-600",
    purple: "from-purple-600",
    fuchsia: "from-fuchsia-600",
    pink: "from-pink-600",
    rose: "from-rose-600",
  };

  const ToColors: Record<string, string> = {
    lime: "to-lime-600",
    green: "to-green-600",
    emerald: "to-emerald-600",
    teal: "to-teal-600",
    cyan: "to-cyan-600",
    sky: "to-sky-600",
    blue: "to-blue-600",
    indigo: "to-indigo-600",
    violet: "to-violet-600",
    purple: "to-purple-600",
    fuchsia: "to-fuchsia-600",
    pink: "to-pink-600",
    rose: "to-rose-600",
  };

  function generateRandomNumber(length: number) {
    return Math.floor(Math.random() * length);
  }

  const FromKeys = Object.keys(FromColors);
  const ToKeys = Object.keys(ToColors);
  const FromValue = FromKeys[generateRandomNumber(FromKeys.length)];
  const ToValue = ToKeys[generateRandomNumber(ToKeys.length)];

  return [FromColors[FromValue], ToColors[ToValue]];
}

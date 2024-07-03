import { Text } from "@/components/ui";

const colors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-gray-500",
  "bg-orange-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-lime-500",
  "bg-amber-500",
  "bg-fuchsia-500",
  "bg-violet-500",
  "bg-sky-500",
  "bg-slate-500",
  "bg-neutral-500",
  "bg-stone-500",
  "bg-red-600",
  "bg-green-600",
  "bg-blue-600",
  "bg-yellow-600",
  "bg-purple-600",
  "bg-pink-600",
  "bg-teal-600",
  "bg-indigo-600",
  "bg-gray-600",
  "bg-orange-600",
  "bg-rose-600",
  "bg-cyan-600",
  "bg-lime-600",
  "bg-amber-600",
  "bg-fuchsia-600",
  "bg-violet-600",
  "bg-sky-600",
  "bg-slate-600",
  "bg-neutral-600",
  "bg-stone-600",
];

function getColorByLetter(letter: string) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzñ";
  letter = letter.toLowerCase();

  if (alphabet.includes(letter)) {
    const index = alphabet.indexOf(letter);
    return colors[index % colors.length];
  } else {
    return "bg-gray-500";
  }
}

export const WorkspaceUnknownLogo = ({
  workspaceName,
}: {
  workspaceName: string;
}) => {
  return (
    <div
      className={`w-6 h-6 ${getColorByLetter(
        workspaceName[0],
      )} flex justify-center items-center rounded-lg text-white`}
    >
      <Text weight="bold" type="body">
        {workspaceName[0].toUpperCase()}
      </Text>
    </div>
  );
};

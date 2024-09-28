import { ProgressBar } from "@/components/dashboard/ProgressBar";
import { useUser } from "@clerk/nextjs";
import { Rocket, Sprout, Zap } from "lucide-react";

type StatsProps = {
  progress?: number;
};
export const Stats = ({ progress }: StatsProps) => {
  const { user } = useUser();

  const STATS = [
    {
      id: 1,
      title: "Streaks",
      desc: "Complete any lesson to start a streak.",
      icon: <Zap />,
    },
    {
      id: 2,
      title: "Progress",
      desc: progress ? (
        <ProgressBar progress={progress} />
      ) : (
        "Start a course to track your progress."
      ),
      icon: <Sprout />,
    },
    {
      id: 3,
      title: "Your level",
      desc: `Level ${user?.level ? user.level : 0}`,
      icon: <Rocket />,
    },
  ];

  return (
    <ul className="flex flex-col bg-gray-100 p-4 rounded-md gap-4">
      {STATS.map(({ id, title, desc, icon }) => (
        <li key={id} className="flex gap-4">
          <figure>{icon}</figure>
          <div className="w-full flex flex-col gap-2">
            <h3 className="text-lg">{title}</h3>
            <div className="text-gray-500">{desc}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

import Link from "next/link";
import { getPosts } from "./get-posts";

function convertToRoman(num: number): string {
  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];
  let result = "";
  for (const { value, symbol } of romanNumerals) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}

export default async function Home() {
  const posts = await getPosts();

  // Group posts by volume and calculate year range
  const volumesMap = posts.reduce(
    (acc: { [key: number]: { minYear: string; maxYear: string } }, post) => {
      // Extract year using regex to handle different date formats
      const yearMatch = post.date.match(/, (\d{4})$/);
      const year = yearMatch ? yearMatch[1] : "Unknown";

      if (!acc[post.volume]) {
        acc[post.volume] = { minYear: year, maxYear: year };
      } else {
        if (year < acc[post.volume].minYear) {
          acc[post.volume].minYear = year;
        }
        if (year > acc[post.volume].maxYear) {
          acc[post.volume].maxYear = year;
        }
      }
      return acc;
    },
    {}
  );

  // Convert to array and sort by volume number
  const volumes = Object.entries(volumesMap)
    .map(([volume, years]) => ({
      volume: parseInt(volume, 10),
      roman: convertToRoman(parseInt(volume, 10)),
      ...years,
    }))
    .sort((a, b) => a.volume - b.volume);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {volumes.map(vol => (
        <li
          key={vol.volume}
          className="aspect-square rounded-xl transition-[background-color] hover:bg-gray-100 dark:hover:bg-[#0A0A0A] active:bg-gray-200 dark:active:bg-[#1A1A1A] border border-gray-200 dark:border-[#313131]"
        >
          <Link
            href={`/volume/${vol.volume}`}
            className="flex flex-col w-full h-full items-center justify-center"
          >
            <h2 className="text-4xl font-serif dark:text-gray-100">
              {vol.roman}
            </h2>
            <p className="text-gray-500 dark:text-gray-500 text-xs">
              {vol.minYear === vol.maxYear
                ? vol.minYear
                : `${vol.minYear} - ${vol.maxYear}`}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

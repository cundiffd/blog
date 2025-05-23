import { A } from "./components/a";

export function Footer() {
  return (
    <footer className="p-6 pt-3 pb-6 flex text-xs text-center mt-3 dark:text-gray-400 text-gray-500 font-mono">
      <div className="grow text-left">Mr. Dakarai T. Cundiff</div>
      <div>
        <A target="_blank" href="https://github.com/cundiffd/blog">
          Source
        </A>
      </div>
      <div className="ml-4">
        <A target="_blank" href="mailto:karai@sptlco.com">
          Email me
        </A>
      </div>
    </footer>
  );
}

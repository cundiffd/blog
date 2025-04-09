import { Header } from "./header";
import { getPosts } from "../get-posts";

export const revalidate = 60;

export default async function Layout({ children }) {
  const posts = await getPosts();

  return (
    <article className="text-gray-800 dark:text-gray-300 mb-10">
      <Header posts={posts} />

      {children}

      <p className="flex text-xs text-gray-500 dark:text-gray-500">
        You reached the end.
        <br />
        <br />
        Do these posts resonate with you? Consider supporting the blog:
        <br />
        <a
          className="!text-white underline"
          href="https://buymeacoffee.com/mrcundiff"
        >
          Buy me a book
        </a>
      </p>
    </article>
  );
}

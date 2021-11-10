import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = ({ posts }: any) => {
  console.log(posts);
  return (
    <div>
      <Head>
        <title>My Blog</title>
        <meta />
        <meta content="My Blog Contents" />
      </Head>
      <h1>Welcome to My Blog</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const res = await fetch(
    `http://jsonplaceholder.typicode.com/posts?_start=0&_end=10`
  );
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};

// export const getStaticProps = async () => {
//   const res = await fetch(
//     `http://jsonplaceholder.typicode.com/posts?_start=0&_end=10`
//   );
//   const posts = await res.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// };

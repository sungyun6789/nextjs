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

// 서버에서 데이터가 변경되면 같이 업데이트 됨
// export const getServerSideProps = async () => {
//   const res = await fetch(`http://localhost:8080/api/posts`);
//   const posts = await res.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// };

/* 
처음 시작할 때 데이터를 가져오기 업데이트 되지 않음
페이지가 즉각적으로 업데이트 되지 않는 상황에서 사용
빌드할 때 페이지 업데이트
*/
export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:8080/api/posts`);
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // 접속하고 20초가 지나면 데이터를 다시 받아옴
    revalidate: 20,
  };
};

import Head from "next/head";
import Image from "next/image";
import getConfig from "next/config";
import styles from "../styles/Home.module.css";

const Home = ({ list }) => {
  return (
    <div className={styles.body}>
      {list.map((item, index) => {
        return <img src={item.thumbnail} alt='image' />;
      })}
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const publicRuntimeConfig = await getConfig();
  const dev = process.env.NODE_ENV !== "production";
  const apiurl = dev
    ? "http://localhost:3001"
    : publicRuntimeConfig.apiurl;
  let list;
  try {
    const response = await fetch(`${apiurl}/videos/list-all`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    list = await response.json();
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      list: list.list,
    },
  };
}

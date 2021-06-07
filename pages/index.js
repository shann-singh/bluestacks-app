import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import getConfig from "next/config";
import styles from "../styles/Home.module.css";
import { useVideo } from "../components/videoContext";
import axios from "axios";
import { useSnackbar } from "react-simple-snackbar";
import { snackBarOptions } from "../util";
import Spinner from "../components/spinner";
import _ from "lodash";
import TimeAgo from "timeago-react";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = ({ list }) => {
  const [videoList, setVideoList] = useState(list);
  const [emptyDiv, setEmptyDiv] = useState(0);
  const [page, setPage] = useState(0);
  const { listUpdated, setListUpdated } = useVideo();
  const [loading, setLoading] = useState(false);
  const [openSnackbar, closeSnackbar] = useSnackbar(snackBarOptions);
  const [loadMore, setLoadMore] = useState(true);

  // sets empty div in case video list length 
  // is not a multiple of 4
  // to properly align the videos
  useEffect(() => {
    let mod = videoList.length % 4;
    setEmptyDiv(mod);
  }, [videoList]);

  // re-fetchs the video list if more videos added to the database
  // fetchs the 0 or first page videos and scrolls automatically to the top
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: process.env.NEXT_PUBLIC_API_URL + "/videos/list-all",
          params: { page: 0 },
        });
        console.log("useEffect");
        const videos = response.data.list;
        if (videos.length > 0) {
          setPage(0);
          setVideoList(videos);
          setListUpdated(false);
          setLoading(false);
          setLoadMore(true);
          window.scrollTo(0, 0);
        }
      } catch (error) {
        setLoading(false);
        openSnackbar("Error occured. Cannot fetch updated list of videos");
      }
    };
    if (listUpdated) {
      setLoading(true);
      fetchData();
    }
  }, [listUpdated]);

  // to fetch next 20 videos in case of continuos scrolling
  // once videos list is exhausted, sets loadmore to false
  const fetchMoreVideos = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: process.env.NEXT_PUBLIC_API_URL + "/videos/list-all",
        params: { page: page + 1 },
      });
      console.log("fetchMore");
      setPage(page + 1);
      const videos = response.data.list;
      if (videos.length === 0) {
        setLoadMore(false);
      }
      setVideoList((values) => [...values, ...videos]);
      setListUpdated(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      openSnackbar("Error occured. Cannot fetch updated list of videos");
    }
  };

  return (
    <div className={styles.body}>
      <Head>
        <title>Bluestacks App | Homepage</title>
      </Head>
      <div className={styles.videoSection}>
        {videoList.length === 0 ? (
          <div className='noVideoSection'>
            <h2>
              No videos founds. Add some videos first using the button in
              top-right corner
            </h2>
          </div>
        ) : (
          <InfiniteScroll
            className={styles.videoSection}
            dataLength={page * 20} //This is important field to render the next data
            next={fetchMoreVideos}
            hasMore={loadMore}
            loader={<Spinner />}
            endMessage={
              <div className={styles.videoListEndSection}>
                <p className={styles.videoListEndText}>
                  Yay! You have seen it all
                </p>
              </div>
            }
          >
            {videoList.map((item, index) => {
              return (
                <div className={styles.videoDiv} key={index}>
                  <a href={`/video?id=${item.videoId}`}>
                    <img
                      className={styles.img}
                      src={item.thumbnail}
                      alt='image'
                    />
                    <p className={styles.videoTitle}>{item.title}</p>
                    <p className={styles.channelTitle}>
                      {item.channelTitle}
                    </p>
                    <TimeAgo
                      className={styles.videoTime}
                      datetime={item.publishedAt}
                      locale='en_US'
                    />
                  </a>
                </div>
              );
            })}
            {emptyDiv === 0
              ? null
              : _.times(emptyDiv, _.constant(0)).map((item, index) => {
                  return (
                    <div key={index} className={styles.emptyDiv}></div>
                  );
                })}
          </InfiniteScroll>
        )}
      </div>
      {loading ? <Spinner /> : null}
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const { publicRuntimeConfig } = await getConfig();
  const dev = process.env.NODE_ENV !== "production";
  const apiurl = dev
    ? "http://localhost:3001"
    : publicRuntimeConfig.apiurl;
  let list;
  try {
    const response = await fetch(`${apiurl}/videos/list-all?page=0`, {
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

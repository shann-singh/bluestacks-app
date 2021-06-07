import React from "react";
import styles from "../styles/Video.module.css";
import YouTube from "react-youtube";
import { numberFormat } from "../util";
import getConfig from "next/config";

const Video = ({ videoDetail, channelDetail }) => {
  return (
    <div className={styles.body}>
      <YouTube
        className={styles.youtube}
        videoId={videoDetail.id}
        onReady={(e) => {
          e.target.playVideo();
        }}
      />
      <div className={styles.detailsSection}>
        <p className={styles.videoTitle}>{videoDetail.snippet.title}</p>
        <div className={styles.infoSection}>
          <div className={styles.infoElement}>
            <p className={styles.infoText}>
              {numberFormat(videoDetail.statistics.viewCount)}
            </p>
            <p>Views</p>
          </div>
          <div className={styles.infoElement}>
            <p className={styles.infoText}>
              {numberFormat(videoDetail.statistics.likeCount)}
            </p>
            <p>Likes</p>
          </div>
          <div className={styles.infoElement}>
            <p className={styles.infoText}>
              {numberFormat(videoDetail.statistics.dislikeCount)}
            </p>
            <p>Dislikes</p>
          </div>
          <div className={styles.infoElement}>
            <p className={styles.infoText}>
              {numberFormat(videoDetail.statistics.favoriteCount)}
            </p>
            <p>Favorites</p>
          </div>
          <div className={styles.infoElement}>
            <p className={styles.infoText}>
              {numberFormat(videoDetail.statistics.commentCount)}
            </p>
            <p>Comments</p>
          </div>
        </div>
        <div className={styles.channelTitle}>
          <p>
            {videoDetail.snippet.channelTitle}
            {"  "}
            <img
              width={40}
              src={channelDetail.snippet.thumbnails.default.url}
              alt='channel logo'
            />
          </p>
        </div>
        <div className={styles.videoDescription}>
          {videoDetail.snippet.description}
        </div>
        <div className={styles.videoLink}>
          Watch it on YouTube :{" "}
          <a
            href={`https://youtu.be/${videoDetail.id}`}
            target='_blank'
          >{`https://youtu.be/${videoDetail.id}`}</a>
        </div>
        {videoDetail.snippet.tags ? (
          <div>
            {videoDetail.snippet.tags.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{ display: "inline-block" }}
                  className={styles.tags}
                >
                  <p>#{item}</p>
                </div>
              );
            })}
          </div>
        ) : null}
        <div className={styles.channelDescription}>
          <p className={styles.cTitle}>
            About {channelDetail.snippet.title}
            {"  "}
            <img
              width={40}
              src={channelDetail.snippet.thumbnails.default.url}
              alt='channel logo'
            />
          </p>
          <p className={styles.subsCount}>
            {numberFormat(channelDetail.statistics.subscriberCount)}{" "}
            subscribers
          </p>
          <p>{channelDetail.snippet.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Video;

export async function getServerSideProps(req, res) {
  const { publicRuntimeConfig } = await getConfig();
  const { id } = req.query;
  const dev = process.env.NODE_ENV !== "production";
  const apiurl = dev
    ? "http://localhost:3001"
    : publicRuntimeConfig.apiurl;
  let videoDetail;
  let channelDetail;
  try {
    const response = await fetch(
      `${apiurl}/videos/video-details?videoId=${id}`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let detailsjson = await response.json();
    videoDetail = detailsjson.videoDetail;
    channelDetail = detailsjson.channelDetail;
  } catch (error) {
    console.log(error);
  }
  return {
    props: { videoDetail: videoDetail, channelDetail: channelDetail },
  };
}

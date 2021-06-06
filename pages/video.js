const Video = ({ videoId }) => {
  return <h1>{videoId}</h1>;
};

export default Video;

export async function getServerSideProps(req, res) {
  const { id } = req.query;
  return { props: { videoId: id } };
}

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Layout from "../components/layout";
import SnackbarProvider from "react-simple-snackbar";
import { VideoProvider } from "../components/videoContext";

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider>
      <VideoProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </VideoProvider>
    </SnackbarProvider>
  );
}

export default MyApp;

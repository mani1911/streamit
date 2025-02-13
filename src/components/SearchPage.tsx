import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Container,
  useTheme,
  useMediaQuery,
  Box
} from "@mui/material";
import { config } from "../config/config";

// Define types for the song data
interface Song {
  name: string;
  artist: string;
  album: string;
  deezer_url: string;
  preview_url: string;
  duration_sec: number;
}

interface SongsListProps {
  sendStream: (audioFilePath: string) => void; // Adjust type based on actual function signature
  play: () => void;
}

const SongsList: React.FC<SongsListProps>= ({sendStream, play}) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen is small

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    // console.log(`${config.backend_url}/songs?limit=5&index=${page.toString()}`)
    setLoading(true);
    try {
      const response = await fetch(`${config.backend_url}/songs?limit=5&index=${(page*5).toString()}`);
      const data = await response.json();
      if (data.songs) {
        setSongs(data.songs);
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
    setLoading(false);
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: "column", height: "auto", maxHeight: '90vh', width: '100vw', padding: isMobile ? 1 : 3 }}>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        gutterBottom
        sx={{ mt: 1, textAlign: "center" }}
      >
        Stream your fav songs!
      </Typography>

      {loading && (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      )}

      <Container
        sx={{
          height: "auto",
          overflowY: "auto",
          width: "100%",
          scrollbarWidth: "none",
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
        }}
      >
        {songs.map((song, index) => (
          <Container key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row", // Column layout for mobile
                alignItems: isMobile ? "center" : "flex-start",
                padding: 1,
                borderRadius: 2,
                backgroundColor: "rgba(30, 30, 30, 0.4)",
                color: "white",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Audio Preview or Placeholder */}
              {song.preview_url !== "No preview available" ? (
                <CardMedia
                  component="audio"
                  controls
                  src={song.preview_url}
                  sx={{
                    width: isMobile ? "100%" : 150,
                    margin: isMobile ? "10px auto" : 2,
                  }}
                />
              ) : (
                <CardMedia
                  component="img"
                  height="60"
                  sx={{
                    width: 60,
                    margin: isMobile ? "10px auto" : 2,
                    borderRadius: "50%",
                  }}
                  image="https://via.placeholder.com/60"
                  alt="Album cover"
                />
              )}

              {/* Song Details */}
              <CardContent sx={{ flex: 1, textAlign: isMobile ? "center" : "left" }}>
                <Typography variant="h6">{song.name}</Typography>
                <Typography variant="body2" color="gray">
                  <strong>Artist:</strong> {song.artist}
                </Typography>
                <Typography variant="body2" color="gray">
                  <strong>Album:</strong> {song.album}
                </Typography>
                <Typography variant="body2" color="gray">
                  <strong>Duration:</strong> {song.duration_sec} sec
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 3,
                    gap: 2, // Space between buttons
                    flexWrap: "wrap", // Ensures proper responsiveness
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => sendStream(song.preview_url)}
                    sx={{
                      mt: 1,
                      textTransform: "none",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    Send Peers
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => play()}
                    sx={{
                      mt: 1,
                      textTransform: "none",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    Play
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Container>
        ))}
      </Container>

    <Box
      sx={{
        display: "flex",
        height: 'auto',
        justifyContent: "space-between", // Space between buttons
        alignItems: "center",
        mt: 3,
        gap: 2, // Space between buttons
        flexWrap: "wrap", // Ensures proper responsiveness
      }}
    >
      {/* Previous Page Button */}
      <Button
        variant="contained"
        color="secondary"
        sx={{
          flex: 1, // Makes both buttons equal width
          fontSize: isMobile ? "0.9rem" : "1rem",
          padding: isMobile ? "10px" : "12px",
        }}
        onClick={() => {
          if (page) setPage(page - 1);
          fetchSongs();
        }}
        disabled={loading || page === 0}
      >
        {loading ? "Loading..." : "Prev Page"}
      </Button>

      {/* Next Page Button */}
      <Button
        variant="contained"
        color="secondary"
        sx={{
          flex: 1, 
          fontSize: isMobile ? "0.9rem" : "1rem",
          padding: isMobile ? "10px" : "12px",
        }}
        onClick={() => {
          setPage(page + 1);
          fetchSongs();
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Next Page"}
      </Button>
    </Box>


    </Container>
  );
};

export default SongsList;

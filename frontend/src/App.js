import React, { useState, useEffect } from "react";
import { CssBaseline, Box } from "@material-ui/core"
import { getYoutubeIdFromSearch } from './functions'
import AppBar from './components/AppBar/AppBar';
import VideoGrid from './components/VideoGrid/VideoGrid';
import Video from './components/Video/Video'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import QueueSection from './components/QueueSection/QueueSection'

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [videos, setVideos] = useState([]);
    const [queue, setQueue] = useState([]);
    const [nowPlaying, setNowPlaying] = useState()
    const [showQueue, setShowQueue] = useState(false)
    const [user, setUser] = useState()
    const [globalChatOpen, setGlobalChatOpen] = useState(false)

    const handleSearchTermInput = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSubmitVideoSearch = async (e) => {
        e.preventDefault();
        const results = await getYoutubeIdFromSearch(searchTerm);
        console.log("Results: ", results)
        setVideos(results);
    }

    useEffect(() => {
        if (!nowPlaying && queue.length > 0) {
            const nextInQueue = queue[0];
            setNowPlaying(nextInQueue);
            setQueue(queue.slice(1));
        }

    }, [nowPlaying]
    )

    const darkTheme = createMuiTheme({
        palette: {
            primary: {

                main: '#2a3257',
                dark: '#0e132e',

                contrastText: '#fff'
            },

            secondary: {
                main: '#2ad156',

                contrastText: '#fff'
            },

            type: 'dark'
        }
    });


    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

            <AppBar
                handleSubmitVideoSearch={handleSubmitVideoSearch}
                handleSearchTermInput={handleSearchTermInput}
                nowPlaying={nowPlaying}
                setNowPlaying={setNowPlaying}
                queue={queue}
                setUser={setUser}
                user={user}
                setGlobalChatOpen={setGlobalChatOpen}
                setShowQueue={setShowQueue}
                showQueue={showQueue}
            />

            <Video
                id={nowPlaying && nowPlaying.id}
                setNowPlaying={setNowPlaying}
            />

            {
                showQueue &&
                <QueueSection
                    title={nowPlaying && nowPlaying.title}
                    setNowPlaying={setNowPlaying}
                    queue={queue}
                    nowPlaying={nowPlaying}
                    setQueue={setQueue}
                />
            }

            <VideoGrid
                videos={videos}
                nowPlaying={nowPlaying}
                setNowPlaying={setNowPlaying}
                queue={queue}
                setQueue={setQueue}
                handleSearchTermInput={handleSearchTermInput}
                handleSubmitVideoSearch={handleSubmitVideoSearch}
            />

        </ThemeProvider>
    );
}

export default App;

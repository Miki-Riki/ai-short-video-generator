import React, { useState } from 'react'
import { Thumbnail } from "@remotion/player";
import RemotionVideo from '../../_components/RemotionVideo';
import PlayerDialog from '../../_components/PlayerDialog';

function VideoList({ videoList }) {

    const [openPlayDialog, setOpenPlayerDialog] = useState(false);
    const [videoId, setVideoId] = useState();

    return (
        <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 2xl:grid-cols-6'>
            {videoList?.map((video, index) => (
                <div 
                    className='cursor-pointer w-full flex justify-center transform transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90'
                    onClick={() => { setOpenPlayerDialog(Date.now()); setVideoId(video?.id) }}
                >
                    <Thumbnail
                        component={RemotionVideo}
                        compositionWidth={300}
                        compositionHeight={450}
                        frameToDisplay={30}
                        durationInFrames={120}
                        fps={30}
                        style={{
                           borderRadius: 15 
                        }}
                        inputProps={{
                            ...video,
                            setDurationInFrame: (v) => console.log(v)
                        }}
                    />
                </div>
            ))}
            <PlayerDialog playVideo={openPlayDialog} videoId={videoId} />
        </div>
    )
}

export default VideoList
 

import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Player } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

function PlayerDialog({ playVideo, videoId }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [videoData, setVideoData] = useState();
    const [durationInFrame, setDurationInFrame] = useState(100);
    const router = useRouter();

    useEffect(() => {
        setOpenDialog(playVideo);
        if (playVideo && videoId) {
            GetVideoData();
        }
    }, [playVideo, videoId]);

    const GetVideoData = async () => {
        const result = await db
            .select()
            .from(VideoData)
            .where(eq(VideoData.id, videoId));

        console.log(result);
        setVideoData(result[0]);
    };

    return (
        <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
            <DialogContent className="flex flex-col items-center">
                <DialogHeader className="relative">
                    <DialogClose className="absolute top-2 right-2 text-2xl cursor-pointer" />
                    <DialogTitle className="text-3xl font-bold my-5 text-center">Your video is ready</DialogTitle>
                    <DialogDescription>
                        <Player
                            component={RemotionVideo}
                            durationInFrames={Number(durationInFrame.toFixed(0))}
                            compositionWidth={300}
                            compositionHeight={450}
                            fps={30}
                            controls={true}
                            inputProps={{
                                ...videoData,
                                setDurationInFrame: (frameValue) => setDurationInFrame(frameValue),
                            }}
                        />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default PlayerDialog;

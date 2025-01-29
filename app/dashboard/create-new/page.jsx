"use client"
import React, { useContext, useEffect, useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/VideoDataContext';
import { VideoData } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import PlayerDialog from '../_components/PlayerDialog';

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoid] = useState();
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { user } = useUser();
  const [isVideoSaved, setIsVideoSaved] = useState(false);

  useEffect(() => {
    return () => {
      setPlayVideo(false);
      setVideoid(null);
      setVideoData({});
    };
  }, []);

  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  const onCreateClickHandler = () => {
    setVideoData({});
    setPlayVideo(false);
    setFormData([]);
    GetVideoScript();
  }

  //Get Video Script

  const GetVideoScript = async () => {
    setLoading(true)
    const prompt = 'Write a script to generate ' + formData.duration + ' video on topic: ' + formData.topic + ' along with Al image prompt in ' + formData.imageStyle + ' format for each scene and give me result in JSON format with ImagePrompt and ContentText as field, No Plain text';
    console.log(prompt);
    const resp = await axios.post('/api/get-video-script', {
      prompt: prompt
    });
    if (resp.data.result) {
      setVideoData(prev => ({
        ...prev,
        'videoScript': resp.data.result
      }))
      setVideoScript(resp.data.result);
      await GenerateAudioFile(resp.data.result);
    }
  }

  //Get Audio

  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = '';
    const id = uuidv4();
    videoScriptData.forEach(item => {
      script = script + item.ContentText + ' ';
    })

    const resp = await axios.post('/api/generate-audio', {
      text: script,
      id: id
    });
    setVideoData(prev => ({
      ...prev,
      'audioFileUrl': resp.data.downloadUrl
    }))
    setAudioFileUrl(resp.data.downloadUrl);
    resp.data.downloadUrl && await GenerateAudioCaption(resp.data.downloadUrl, videoScriptData)
  }

  //Captions

  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    setLoading(true)
    console.log(fileUrl);
    const resp = await axios.post('/api/generate-caption', {
      audioFileUrl: fileUrl
    })
    setCaptions(resp?.data?.result);
    setVideoData(prev => ({
      ...prev,
      'captions': resp.data.result
    }))
    resp.data.result && await GenerateImage(videoScriptData);
  }

  //Generate Image

  const GenerateImage = async (videoScriptData) => {
    let images = [];
    for (const element of videoScriptData) {
      try {
        const resp = await axios.post('/api/generate-image', {
          prompt: element.ImagePrompt
        });
        console.log(resp.data.result);
        images.push(resp.data.result);

      } catch (e) {
        console.log('Error:' + e);
      }
    }
    setVideoData(prev => ({
      ...prev,
      'imageList': images
    }))
    setImageList(images);
    setLoading(false);
  };

  useEffect(() => {
    if (Object.keys(videoData).length === 4 && !isVideoSaved) {
      SaveVideoData(videoData);
      setIsVideoSaved(true);
    }
  }, [videoData, isVideoSaved]);

  const SaveVideoData = async (videoData) => {
    setLoading(true);

    const result = await db.insert(VideoData).values({
      script: videoData?.videoScript,
      audioFileUrl: videoData?.audioFileUrl,
      captions: videoData?.captions,
      imageList: videoData?.imageList,
      createdBy: user?.primaryEmailAddress?.emailAddress
    }).returning({ id: VideoData?.id });

    setVideoid(result[0].id);
    setPlayVideo(true);
    setIsVideoSaved(true);

    console.log(result);
    setLoading(false);
  };

  // Check if all fields are filled before enabling the button
  const isFormValid = formData.topic && formData.imageStyle && formData.duration;

  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center'>Create New</h2>

      <div className='mt-10 shadow-md p-10'>
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler} disabled={!isFormValid}>Create Short Video</Button>
      </div>
      <CustomLoading loading={loading}></CustomLoading>
      <PlayerDialog playVideo={playVideo} videoId={videoId}></PlayerDialog>
    </div>
  )
}

export default CreateNew

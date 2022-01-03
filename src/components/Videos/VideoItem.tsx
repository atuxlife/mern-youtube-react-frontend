import React from 'react';
import { Video } from './Video';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as videoService from './VideoService';

import './VideoItem.css';

interface Props {
    video: Video;
    loadVideos: () => void;
};

const VideoItem = ({ video, loadVideos }: Props) => {

    const navigate = useNavigate();

    const handleDelete = async (id: string) => {
        await videoService.deleteVideo(id);
        toast.error('Video deleted...');
        loadVideos();
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card card-body video-card">
                <div className="d-flex justify-content-between">
                    <h2 className="to-update" onClick={ () => navigate(`/update/${video._id}`) }>{video.title}</h2>
                    <span className="text-danger to-delete" onClick={ () => video._id && handleDelete(video._id) }>X</span>
                </div>
                <p>{video.description}</p>
                <div className="ratio ratio-16x9">
                    <ReactPlayer 
                        url={video.url}
                        className="react-player"
                        width="100%"
                        height="100%"
                        controls={false} 
                    />
                </div>
            </div>
        </div>
    );

};

export default VideoItem;

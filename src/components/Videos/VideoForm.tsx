import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Video } from './Video';
import * as videoService from './VideoService';
import { toast } from 'react-toastify';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const VideoForm = () => {

    const initialState = {
        title: '', description: '', url: ''
    }

    const [ video, setVideo ] = useState<Video>(initialState);

    const handleInputChange = (e: InputChange) => {
        setVideo({...video, [e.target.name]: e.target.value});
    };

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        let msg = '';

        if( !params.id ){
            await videoService.createVideo(video);
            msg = 'New Video added';            
        } else {
            msg = 'Video updated';
            await videoService.updateVideo(params.id, video);
        }

        toast.success(msg);
        //setVideo(initialState);
        navigate('/');

    };

    const getVideo = async (id: string) => {
        const res = await videoService.getVideo(id);
        const { title, description, url } = res.data;
        setVideo({title, description, url});
    };

    useEffect(() => { 
        if ( params.id ) getVideo(params.id);
    }, []);

    return (
        <div className="row">
            <div className="col-4 offset-4">
                <div className="card border-primary">

                    <h4 className="card-header text-white bg-primary">New video</h4>

                    <div className="card-body">
                        
                        <form onSubmit={handleSubmit}>

                            <div className="row mt-2 mb-3">
                                <div className="form-group">
                                    <input type="text" name="title" placeholder="Write a title for this video" className="form-control" onChange={handleInputChange} value={video.title} autoFocus />
                                </div>
                            </div>
                            
                            <div className="row mb-3">
                                <div className="form-group">
                                    <input type="text" name="url" placeholder="https://somesite.com" className="form-control" onChange={handleInputChange} value={video.url} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="form-group">
                                    <textarea name="description" rows={5} className="form-control" placeholder="Write a description for this video" onChange={handleInputChange} value={video.description}></textarea>
                                </div>
                            </div>

                            <div className="row mt-4 mb-2">
                                <div className="form-group text-end">

                                    {
                                        params.id ?
                                        <button className="btn btn-info">Update video</button>
                                        :
                                        <button className="btn btn-primary">Create video</button>
                                    }
                                    
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default VideoForm;

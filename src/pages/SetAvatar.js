import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loader from '../assets/loader.gif';
import axios from 'axios';

import styled from 'styled-components';

const SetAvatar = () => {
    const api = "https://api.multiavatar.com";
    const navigate = useNavigate();
    const [avatars,setAvatars] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [selectedAvatar,setSelectedAvatar] = useState(undefined);

    useEffect(()=>{
        if (!localStorage.getItem('userData')) {
            navigate('/login');
          }
    },[]);

    const setProfilePicture = async ()=>{
        if(selectedAvatar === undefined){
            toast.error("Please select an avatar ");
        }else{
            const user = await JSON.parse(localStorage.getItem('userData'));
            const {data}= await axios.post(`https://chat-app-api-9yr1.vercel.app/setAvatar/${user._id}`,{
                image:avatars[selectedAvatar]
            });
            if(data.isSet === true){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem('userData',JSON.stringify(user));
                navigate('/')
            }else{
                toast.error('Error setting avatar. Please try again');
            }
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = [];
                var j = 4;
                for (let i = 0; i < j; i++) {
                    try{
                        const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                        const base64Image = `data:image/svg+xml;base64,${btoa(response.data)}`;
                        data.push(base64Image);
        
                        // Add a delay between requests (e.g., 1 second)
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }catch(error){
                        
                    }
                }
                setAvatars(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching avatars:", error);
            }
        };
        fetchData();
    }, []);
  return (
    <>
        { isLoading ? <Container>
            <img src={loader} alt="loader" className="loader"/>
        </Container>:    
         <Container>
            <div className="title-container">
                <h1>Pick an avatar as your profile picture</h1>
            </div>
            <div className="avatars">
                {
                    
                    avatars.map((avatar,index)=>{
                        return(
                            <div key={index} className={`avatar ${selectedAvatar === index? "selected" :""}`}>
                                <img src={avatar} alt="avatar" onClick={()=>setSelectedAvatar(index)} />
                            </div>
                        )
                    })
                }
            </div>
            <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
        </Container>
        }
    </>
  )
   
}

export default SetAvatar;
const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:3rem;
    background-color:#131324;
    height:100vh;
    wisth:100vw;
    .loader{
        max-inline-size:100%;
    }
    .title-container{
        h1{
            color:#fff;
        }
    }
    .avatars{
        display:flex;
        gap:2rem;
        .avatar{
            border:0.4rem solid transparent;
            padding:0.4rem;
            border-radius:5rem;
            display:flex;
            justify-content:center;
            align-items:center;
            transition:0.5s ease-in-out;
            img{
                height:6rem;
            }
        }
        .selected{
            border:0.4rem solid #4e0eff;
        }
    }
    .submit-btn{
        background-color:#997af0;
        color:#fff;
        padding:1rem 2rem;
        border:none;
        font-weight:bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition:0.5s ease-in-out;
        &:hover{
            background-color:#4e03ff;
        }
    }
`;
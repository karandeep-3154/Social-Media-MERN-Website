import axios from 'axios'
import { SetPosts } from '../redux/postSlice';
const API_URL = 'https://social-media-mern-website.onrender.com/';

export const API = axios.create({
    baseURL: API_URL,
    responseType: 'json'
});

export const apiRequest = async({url, token, data, method}) => {
    try {
        const result = await API(url, {
            method: method  || "GET",
            data: data,
            headers: {
                "content-type": 'application/json',
                Authorization: token ? `Bearer ${token}`: ""
            }
        });
        // console.log(result.data);   
        return result.data;

    } catch (error) {
        const err = error.response.data;
        console.log(err);
        return {status: err.success, message: err.message};
    }
}

export const handleFileUpload = async(uploadFile) => {

    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('upload_preset', 'socialmedia');

    /* A new instance of FormData is created. 
    FormData objects provide a way to easily construct a set of key/value pairs representing form fields and their values, which can then be sent using XMLHttpRequest or the Fetch API. 
    
    In this case, the file field is appended with the uploadFile, and the upload_preset field is set to 'socialmedia'.*/

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload`, formData);

        return response.data.secure_url;

    } catch (error) {
        console.log(error);
    }
}

export const fetchPosts = async(token, dispatch, uri, data) => {
    try {

        const res = await apiRequest({
            url: uri || "/posts",
            token: token,
            data: data || {},
            method: "POST"
        })
        // console.log(res)
        dispatch(SetPosts(res?.data));
        return;

    } catch (error) {
        console.log(error)
    }
}
  export const handleView = async(userId, user) => {

//userId is id of user whose profile current user is trying to open
    try {

      if(userId._id === user._id)
      return;

      await apiRequest({
        url: "/users/profile-view",
        method: "POST",
        data: {id: userId, user},
        token: user?.token
      });

    //   console.log(res);

    } catch (error) {
      console.log(error);
    }

  }
export const likePost = async({uri, token}) => {
// console.log(uri)
    try {
        
        await apiRequest({
            url: uri,
            token: token,
            method: "POST"
        })
        
        // console.log(res)

    } catch (error) {
        console.log(error)
    }

}

export const deletePost = async(id, token) => {

    try {
        
        await apiRequest({
            url: '/posts/' + id,
            token: token,
            method: "DELETE"
        });
        return;

    } catch (error) {
        console.log(error)
    }

}

export const getUserInfo = async(token, id) => {
    
    try {
        
        const uri = (id === undefined) ? '/users/get-user' : '/users/get-user/' + id;

        const res = await apiRequest({
            url: uri,
            token: token,
            method: "POST"
        });

        if(res?.message === 'Authentication Failed'){
            localStorage.removeItem('user');
            window.alert('Session expired, please login again');
            window.location.replace('/login');
        }

        return res?.user;

    } catch (error) {
        console.log(error);
    }

}

export const sendFriendRequest = async(token, id) => {

    try {
        
        const res = await apiRequest({
            url: '/users/friend-request/',
            token: token,
            method: "POST",
            data: {
                requestTo: id
            }
        });
console.log(res)
        return;

    } catch (error) {
        console.log(error);
    }

}

export const viewUserProfile = async(token, id) => {

    try {
        
        const res = await apiRequest({
            url: '/users/profile-view',
            token: token,
            method: "POST",
            data: { id }
        });

        return res?.user;

    } catch (error) {
        console.log(error);
    }

}
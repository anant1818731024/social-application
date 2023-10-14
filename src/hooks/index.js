import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { editProfile, getPosts, getUserFriends, login as userLogin } from '../api';
import {
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '../utils';
import jwtDecode from 'jwt-decode';
import { register as userRegister } from '../api';
import { PostsContext } from '../providers';

export const useAuth = () => {
  return useContext(AuthContext);
};
export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        const user = jwtDecode(userToken);
        const friendshipResponse = await getUserFriends();
        let friends = [];
        if (friendshipResponse.success) {
          friends = friendshipResponse.data.friends;
        }
        setUser({
          ...user,
          friendships: friends,
        });
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const response = await userLogin(email, password);
    setLoading(false);
    if (response.success) {
      const user = response.data.user;
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      const friendshipResponse = await getUserFriends();
      let friends = [];
      if (friendshipResponse.success) {
        friends = friendshipResponse.data.friends;
      }
      setUser({
        ...user,
        friendships: friends,
      });
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  const register = async (name, email, password, confirmPassword) => {
    setLoading(true);
    const response = await userRegister(name, email, password, confirmPassword);
    setLoading(false);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const updateProfile = async (userId, name, password, confirmPassword) => {
    setLoading(true);
    const response = await editProfile(userId, name, password, confirmPassword);
    setLoading(false);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const updateUserFriends = (addFriend, friend, id) => {
    if (addFriend) {
      setUser({
        ...user,
        friendships: [...user.friendships, friend],
      });
    } else {
      const userCopy = { ...user };
      userCopy.friendships = user.friendships.filter(
        (item) => item.to_user._id !== id
      );
      setUser(userCopy);
    }
  };

  return {
    user,
    login,
    logout,
    loading,
    register,
    updateProfile,
    updateUserFriends,
  };
};

export const usePosts = () => {
  return useContext(PostsContext);
};
export const useProvidePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (page, limit) => {
    setLoading(true);
    const response = await getPosts(page, limit);
    if (response.success) {
      setPosts(response.data.posts);
    }
    setLoading(false);
  };

  const onPageChange = (page) => {
    fetchPosts(page, 5);
  }

  const addPostToState = (post) => {
    setPosts([post, ...posts]);
  }

  const addCommentToPost = (postId, comment) => {
    const newPosts = [...posts];
    const post = newPosts.filter(p => p._id === postId)[0];
    const newComments = [...post.comments, comment];
    post.comments = newComments;
    setPosts(newPosts);
  }

  const toggleLike = (postId, userId, deleted) => {
    let newPosts = [];
    if(deleted){
      newPosts = posts.map(post => {
        if(post._id === postId){
          const newLikes = post.likes.filter(id => id !== userId);
          return {...post, likes: newLikes};
        }
        return post;
      })
    }else{
      newPosts = posts.map(post => {
        if(post._id === postId){
          const newLikes = [...post.likes, userId];
          return {...post, likes: newLikes};
        }
        return post;
      })
    }
    setPosts(newPosts);
  }
  return {
    data: posts,
    loading,
    addPostToState,
    addCommentToPost,
    toggleLike,
    onPageChange
  };
};

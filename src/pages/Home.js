import styles from '../styles/home.module.css';
import { CreatePost, CustomLoader, Loader, Pagination, Post } from '../components';
import FriendsList from '../components/FriendsList';
import { useAuth, usePosts } from '../hooks';
import { useEffect } from 'react';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  useEffect(() => {
    posts.onPageChange(1, 5);
  },[])

  return (
    <div className={styles.home}>
        <div className={styles.postsList}>
          {auth.user && <CreatePost/>}
        { posts.loading? <CustomLoader/>:
          posts?.data?.map((post) => {
            return <Post post = {post} key = {`post-${post._id}`}/>
          })
        }
        <Pagination totalItems = {500} itemsPerPage = {5} onPageChange = {posts.onPageChange}/>
        </div>
        {auth.user && <FriendsList/>}
    </div>
  )
};

export default Home;

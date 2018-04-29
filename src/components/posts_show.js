import React, { Component } from 'react';
import { fetchPosts } from '../actions';
import { connect } from 'react-redux';

class PostsShow extends Component {

  componentDidMount(){
    const { id } = this.props.match.params;
    this.props.fetchPosts(id);
  }



  render(){
    const { post } = this.props;
    if(!post){
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>{post.title}</h3>
         <h6>Categories: {post.categories}</h6>
         <p>{post.content}</p>
      </div>
    );
  };
}

function mapStateToProps({ posts }, ownProps){ //state.posts
  
  return { post: posts[ownProps.match.params.id]  }

}


export default connect(mapStateToProps, {fetchPosts})(PostsShow)
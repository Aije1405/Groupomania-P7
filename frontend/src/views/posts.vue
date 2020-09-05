<template>
  <div id="posts" class="posts">
    <CreatePost />
    <Post v-for="post in allPosts" v-bind:key="post.id" :post="post" @infosPost="setInfos" />
    <modalBoxModerate :post="post" />
  </div>
</template>

<script>
import axios from "axios";
import CreatePost from "../components/createPost";
import Post from "../components/post";
import modalBoxModerate from "../components/modifyPost";

export default {
  name: "Posts",
  components: {
    CreatePost,
    Post,
    modalBoxModerate
  },
  data() {
    return {
      post: {
        id: "",
        messageTitle: "",
        messageContent: "",
        messageImage: ""
      },
      allPosts: []

    };
  },
  methods: {
    setInfos(payload) {
      this.post = payload.post;
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/post", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      //.get("http://localhost:3000/api/post",this.$store.state.headerParams)    !!!!!
      .then(response => {
        console.log("post", response.data);
        this.allPosts = response.data;
      })
      .catch(error => {
        console.log(error); //affiche pas le message 'normalement' envoyé par le back     !!!!!!
      }),
      this.$store.dispatch("getUserInfos");
  }
};
</script>

<style  scope>
.wall {
  width: 90%;
  margin: auto;
  padding-top: 10%;
}
.block-post {
  background-color: white;
  width: 50%;
  margin: auto;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

</style>
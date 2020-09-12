<template>
  <div id="wall" class="wall" data-app>
    <CreatePost />
    <ModifPost :id="dialog.id" :dialog="dialog.show" v-on:close="closeDialog"/>
    <Post 
      v-for="message in allMessages" 
      v-bind:key="message.id" 
      :message="message" 
      :id="message.id"
      v-on:deleteMessage="deleteMessage"
      v-on:openDialog="openDialog"/>
    <modalBoxModerate :message="message" />
  </div>
</template>

<script>
import axios from "axios";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import modalBoxModerate from "../components/ModifPost";
import ModifPost from '../components/ModifPost';
import { mapState } from "vuex";

export default {
  name: "Wall",
  components: {
    CreatePost,
    Post,
    modalBoxModerate,
    ModifPost
  },
  data() {
    return {
      message: {
        id: "",
        content: "",
        image: ""
      },
      dialog:{
        id:0,
        message:null,
        show:false
      },
      allMessages: []

    };
  },
  methods: {
    setInfos(payload) {
      this.message = payload.message;
    },
    closeDialog(){
      this.$router.go()
    },
    //pour supprimer message
    deleteMessage(id) {
      let data = {
        messageId: id,
        userIdOrder: this.user.userId
      }
      axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token")
      // requête delete grâce au user token 
      axios.post("http://localhost:3000/api/post/delete", data) // Si oui on supprime...
        .then(() => {
          window.location.reload();
        }) // ...si non on envoi une erreur
        .catch(error => console.log(error));
    },
    openDialog(id, message) {
      this.dialog = {
        id:id,
        message: message,
        show:true
      }
    }
  },
  computed: {
    ...mapState(["user", "editOption"])
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/post", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      //.get("http://localhost:3000/api/post",this.$store.state.headerParams)
      .then(response => {
        console.log("message", response.data);
        this.allMessages = response.data;
      })
      .catch(error => {
        console.log(error); 
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
.block-message {
  background-color: white;
  width: 50%;
  margin: auto;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

</style>
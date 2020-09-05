<template>
  <div class="card mb-4 w-75 mx-auto">
    <div class="card-header d-flex justify-content-between">
      <div> ~ Message posté par : <strong class="text">{{post.User.username}}</strong> le <strong class="text">{{post.createdAt}}</strong> ~</div>
      <div class="dropdown" v-if="user.isAdmin==true || user.username == post.User.username">
        <svg class="bi bi-three-dots dropdown-toggle" id="dropdownMenuPost"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          width="1.2em" height="1.2em" viewBox="0 0 15 15" fill="currentColor">
          <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuPost">
          <button
            class="dropdown-item modifyPost"
            data-toggle="modal"
            data-target="#modalEditPost"
            type="button"
            @click="emitInfoPost();changeEditStyle('modify');">Modifier</button>
          <button
            class="dropdown-item deletePost"
            data-toggle="modal"
            data-target="#modalEditPost"
            type="button"
            @click="emitInfoPost();changeEditStyle('delete');">Supprimer</button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="card-text" v-if="post.messageTitle!=='null'">
        <p class="mb-0">  {{post.messageTitle}}  </p>
      </div>
      <div class="card-text" v-if="post.messageContent!=='null'">
        <p class="mb-0">  {{post.messageContent}}  </p>
      </div>
      <div class="card-img-top w-75 mx-auto" v-if="post.attachement">
        <img :src="post.attachement" alt="..." class="w-100" />
      </div>
    </div>
  </div>
</template>

<script>
// import de la bibliothèque vuex
import { mapState } from "vuex";

export default {
  name: "Post",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["user", "editOption"])
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    //création de fonction pour modifier ou supprimer le post
    emitInfoPost() {
      this.$emit("infosPost", { post: this.post });
    },
    changeEditStyle(value) {
      this.$store.dispatch("changeEditStyle", value);
    }
  }
};
</script>

<style>

.card{
  border: rgb(24, 10, 95) 1px solid !important;
}
.text{
  color: #fd2d01;
}
.card-header{
  background-color: rgba(167, 162, 162, 0.658);
}
</style>
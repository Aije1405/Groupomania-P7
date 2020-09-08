<template>
  <div class="card mb-4 w-75 mx-auto">
    <div class="card-header d-flex justify-content-between">
      <div class="container">Publié par : <strong class="text">{{message.User.username}}</strong> le <strong class="text">{{message.createdAt}}</strong> </div>
      <div class="d-flex flex-row">
        <img width="24" height="24" @click="openDialog" class="hand" src="../assets/pencil.png" />
        <img width="24" height="24" @click="deleteMessage" class="ml-3 hand" src="../assets/bin.png" />
      </div>
    </div>
    <div class="card-body">
      <div class="card-text" v-if="message.content!=='null'">
        <p class="mb-0">  {{message.content}} </p>
      </div>
      <div class="card-img-top w-75 mx-auto" v-if="message.attachement">
        <img :src="message.attachement" alt="..." class="w-100" />
      </div>
    </div>
  </div>
</template>

<script>
//import de la bibliothèque vuex
import { mapState } from "vuex";

export default {
  name: "Post",
  computed: {
    ...mapState(["user", "editOption"])
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    id:{
      type: Number
    }
  },
  methods: {
    deleteMessage(){
      this.$emit("deleteMessage", this.id)
    },
    openDialog(){
      this.$emit("openDialog", this.id, this.message)
    },
    changeEditStyle(value) {
      this.$store.dispatch("changeEditStyle", value);
    }
  },
  mounted(){
    console.log(this.id);
  }
};
</script>

<style>
.hand:hover{
  cursor:pointer;
}
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
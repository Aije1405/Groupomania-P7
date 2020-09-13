<template>
<v-row justify="center">
  <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Message</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
                <v-textarea
                  name="input-7-1" v-model="message.content"
                ></v-textarea>
            </v-row>
          </v-container>
          <span  class="red-text" v-if="error">Veuillez saisir un message</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Fermer</v-btn>
          <v-btn color="blue darken-1" text @click="modifMessage" :disabled="error">Sauvegarder</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>
</template>

<script>

//import axios et bibliothèque vuex
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "ModifPost",
  data() {
    return {
      deleteImg: false,
      message:{
        id:0,
        content:''
      }
    };
  },
  computed: {
    ...mapState(["user", "editOption"]),
    error: function(){
      return this.message.content == ''
    }
  },
  props: {
    dialog:{
      type: Boolean
    },
    id:{
      default:0
    }
  },
  methods: {
    modifMessage(){
      axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token")
      axios.put('http://localhost:3000/api/post/',{
        userIdOrder : this.user.userId,
        messageId: this.message.id,
        newText: this.message.content,
      }).then( ()=> this.$emit('close'))
      .catch(error => console.log(error))
    },
    //fonction pour supprimer l'image 
    deleteImgAction() {
      this.deleteImg = true;
    }
  },
  watch:{
    dialog:function(){
      axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token")
      axios.get('http://localhost:3000/api/post/'+this.id)
      .then(response=>console.log(this.message=response.data))
      console.log(this.message)
    }
  }
}

</script>

<style>
.id {
  color: white;
}
</style>
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
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
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
      deleteImg: false
    };
  },
  computed: {
    ...mapState(["user", "editOption"])
  },
  props: {
    dialog:{
      type: Boolean
    }
  },
  methods: {
    
//modification message
    updateMessage() {
      let newInput = document.getElementById("inputNewText").value;
      //On verifie si changements existent ...
      let newContent = false;
      if (newInput !== this.message.content || this.deleteImg != false) {
        newContent = true;
      }
      //...Si oui on effectue ses changements
      if (newContent && this.deleteImg) {
        axios
          .put( //requête put pour modifier le post existant avec la suppression de l'image
            "http://localhost:3000/api/post/update",
            {
              messageId: this.message.id,
              userIdOrder: this.user.userId,
              newText: newInput,
              newImg: null
            },
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token")
              }
            }
          ) // Si requête positive alors on repond avec la modif...
          .then(response => {
            console.log("reponse API", response);
            this.retourAPI = response.data.confirmation;
              this.retourAPI = "";
              window.location.reload();
          }) //... Sinon on renvoi une erreur
          .catch(err => {
            console.log("admin", err);
            this.retourAPI = "Une erreur est survenue, vérifier vos saisies";
          })
      } else if(newContent){
        // Requête avec juste modification du texte
        axios
          .put(
            "http://localhost:3000/api/post/update",
            {
              messageId: this.message.id,
              userIdOrder: this.user.userId,
              newText: newInput,
            },
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token")
              }
            }
          )
          // Si requête positive alors on repond avec la modif...
          .then(response => {
            console.log("reponse API", response);
            this.retourAPI = response.data.confirmation;
            setTimeout(() => {
              this.retourAPI = "";
               window.location.reload();
            }, 2000);
          })
           //... Sinon on renvoi une erreur
          .catch(err => {
            console.log("admin", err);
            this.retourAPI = "Une erreur est survenue, vérifier vos saisies";
          })}
          else{
            // on affiche un message qu'il n'y a pas de changement
        console.log("aucun changement");
      }
    },
    //fonction pour supprimer l'image 
    deleteImgAction() {
      this.deleteImg = true;
    }
  }
};
</script>

<style>

.id{
  color: white;
}
</style>
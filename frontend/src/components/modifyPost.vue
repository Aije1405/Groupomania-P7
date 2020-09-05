<template>
  <div class="modal fade" id="modalEditPost"  tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true" >
    <div class="modal-dialog">
      <!--Modal pour la modification du post-->
      <div class="modal-content" v-if="editOption =='modify'">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalLabel">Voulez-vous modifier votre publication ?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form enctype="multipart/form-data" action="/update" method="put">
            <div class="input-group mb-3">
              <label for="input_text">Modifiez votre message</label>
              <br />
              <textarea class="input-text" id="inputNewTitle" type="text" :value="post.messageTitle"></textarea>
              <textarea class="input-text" id="inputNewContent" type="text" :value="post.messageContent"></textarea>
            </div>
            <div class="input-group mb-3" v-if="post.attachement">
              <br />
              <img class="img-thumbnail" :src="post.attachement" />
              <button type="button" class="btn btn-danger" @click='deleteImgAction'>Supprimer l'image ?</button>
            </div>

            <span id="msgReturnAPI" class="mx-3"></span>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
          <button type="button" class="btn btn-secondary" @click="updatePost">Modifier</button>
        </div>
      </div>

      <!-- Une Modal apparait lorsque le bouton supprimé est cliqué -->
      <div class="modal-content" v-else>
        <div class="modal-header">
          <h5 class="modal-title" id="ModalLabel">Supprimer ce post ? <span class="id">(id: {{post.id}})</span></h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>Etes-vous sûr de vouloir supprimer ce post ?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
          <button type="button" class="btn btn-danger" @click="deletePost">Supprimer</button>
        </div>
      </div>
      <!-- FIN DE LA MODALE-->
    </div>
  </div>
</template>

<script>

// import d'axios pour les requêtes et de la bibliothèque vuex
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "modalAlerte",
  data() {
    return {
      deleteImg: false
    };
  },
  computed: {
    ...mapState(["user", "editOption"])
  },
  props: {
    post: {
      type: Object,
      default() {}
    }
  },
  methods: {
    // Fonction pour supprimer un post
    deletePost() {
      axios
      // requête delete grâce au token de l'user...
        .delete("http://localhost:3000/api/post/delete", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          data: {
            postId: this.post.id,
            userIdOrder: this.user.userId
          }
        }) // Si oui on supprime...
        .then(() => {
          window.location.reload();
        }) // ...Si non on envoi une erreur
        .catch(error => console.log(error));
    },
// Fonction pour modifier un post
    updatePost() {
      let newTitle = document.getElementById("inputNewTitle").value;
      let newContent = document.getElementById("inputNewContent").value;

      //On verifie si changements existent ...
      //let newTitle = false;
      //let newContent = false;
      if (newTitle !== this.post.messageTitle || newContent !== this.post.messageContent || this.deleteImg != false) {
        newTitle = true;
        newContent = true;
      }
      //...Si oui on effectue ses changements
      if (newTitle && newContent && this.deleteImg) {
        axios
          .put( //requête put pour modifier le post existant avec la suppression de l'image
            "http://localhost:3000/api/post/update",
            {
              postId: this.post.id,
              userIdOrder: this.user.userId,
              newTitle: newTitle,
              newContent: newContent,
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
              postId: this.post.id,
              userIdOrder: this.user.userId,
              newTitle: newTitle,
              newContent: newContent,
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
    // Fonction pour supprimer l'image partagé
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
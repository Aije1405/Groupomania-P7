<template>
  <div>
    <div class="block-post w-75 mt-5">
      <h3 class="mt-2">◼ Créer un nouveau message ◼</h3>
      <form enctype="multipart/form-data" action="/create" method="post">
        <div class="input-group ">
          <label for="input_text">- Que voulez-vous nous dire ? -</label>
          <br />
          <textarea v-model="contentPost.content" class="input-text" rows="3" id="input_text" type="text" />
        </div>
           <div>
            <div class="inputFile"> Ajouter une image
                <input name="inputFile" placeholder="Choisir un fichier" id="inputFile" type="file" class="inputFile" @change="onFileChange" accept="image/*">
            </div>
              <div class="image-preview" v-if="contentPost.imageData.length > 0">
               <img class="preview" :src="contentPost.imageData" height="100px">
              </div>
        </div>
        <button type="submit" @click.prevent="createPost" class="btn btn-secondary btn-poster mb-3 mt-3">Poster mon message</button>
        <span id='msgReturnAPI' class="mx-3 text-danger" v-if="user.token==null">Veuillez vous connecter</span>
        <span id='msgReturnAPI' class="mx-3" v-else>{{msgError}}</span>
      </form>
    </div>
  </div>
</template>

<script>
//import axios et bibliothèque vuex
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "CreatePost",
  data() {
    return {
      contentPost: {
        content: null,
        postImage: null,
        imageData: ""
      },
      msgError: ""
    };
  },
  computed: {
    ...mapState(["user", "editOption"])
  },
  methods: {
    createPost() {
      const fd = new FormData();
      //on déclare une constante FormData pour stocker les infos du Post
      fd.append("inputFile", this.contentPost.postImage); // L'image postée
      fd.append("content", this.contentPost.content); // Le texte posté

      if (fd.get("inputFile") == "null" && fd.get("content") == "null") { 
        // si il n'y à rien a publier on affiche un texte d'erreur 
        let msgReturn = document.getElementById('msgReturnAPI')
        msgReturn.classList.add('text-danger')
        this.msgError = "Vous devez au moins nous dire quelque chose !!";
      } else {
        axios // On effectue la requête grâce à axios et grâce au Token d'identification de l'User
          .post("http://localhost:3000/api/post/create", fd, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token")
            }
          })
          .then(response => {
            // Si la requête fonctionne, on recharge la page pour afficher le dernier post sur la vue Wall
            if (response) {
              window.location.reload();
            }
          }) // Sinon, on affiche une erreur de requête
          .catch(error => (this.msgError = error));
      }
    },
    //fonction pour télécharger et faire apparaitre l'image téléchargé dans la création de post
    onFileChange(e) {
       console.log(e);
         this.contentPost.postImage = e.target.files[0] || e.dataTransfer.files;
       console.log(this.contentPost.postImage);

            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.contentPost.imageData = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
    }
  }
};
</script>

<style>
.input-text {
  width: 100%;
}
.input-group{
  padding: 2%;
}
h3{
 text-align: center;
}
.block-post{
  border: grey 1px solid !important;
}
.image-preview {
   padding: 20px;
}
img.preview {
    border: 1px solid rgb(20, 20, 20);
    padding: 5px;
}
.btn-poster{
 margin-left: 75%;
}

</style>
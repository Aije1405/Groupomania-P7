<template>
  <v-container fluid class="w-100">
  <v-main class="main">
        <v-img height="100" class="mb-5 mt-5" contain src="../assets/icon-left-font-monochrome-red.png"/>
    <form class="cadre w-75 m-auto">
      <div class="container ">
        <div class="form-group ">
          <label for="inputemail ">📧 Votre e-mail</label>
          <input type="text" class="form-control" id="inputemail" v-model="dataLogin.email" />
        </div>
        <div class="form-group ">
          <label for="inputPassword">🔒 Votre mot de passe</label>
          <input  type="password" class="form-control" id="inputPassword" v-model="dataLogin.password" />
        </div>
        <small>Vous n'avez pas encore de compte ? <router-link class="redirection-signup" to="/signup">Alors enregistrez-vous ‼</router-link></small> <br>
        <button @click.prevent="logIn" type="submit" class="btn btn-danger mb-3 mt-3">Se connecter</button>
      </div>
    </form>
    <modale v-bind:revele="revele" v-bind:toggleModale="toggleModale"></modale>
  </v-main>
  </v-container>
</template>

<script>
//import de la bibliothèque et d'axios pour les requêtes
import axios from "axios";
import { mapState } from "vuex";
//import du component modale pour l'alerte du mot de passe ou email incorrect
import modale from "../components/modale"


export default {
  name: "Login",
  data() {
    return {
      dataLogin: {
        email: null,
        password: null
      },
      msg: "",
      revele: false
    };
  },
  components : {
    'modale': modale
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    //fonction modale pour éventuelle erreur
    toggleModale: function(){
      this.revele = !this.revele
    },
    //requête pour connecter user déja existant
    logIn() {
      if (
        this.dataLogin.email !== null || this.dataLogin.password !== null 
      ) {
        axios
          .post("http://localhost:3000/api/user/login", this.dataLogin)
          .then(response => {
            localStorage.setItem('token',response.data.token)
            this.$router.go()
          })
          .catch(error => { 
            console.log(error)
            this.revele = !this.revele
            })
          
      } else {
        console.log("erreur");
      }
    }
  }
};
</script>

<style scope>

.cadre{
  padding: 1%;
  background-color: white;
}
.main{
  text-align: center;
}
.redirection-signup{
  color: #fd2d01;
  text-decoration: none;
}
.redirection-signup:hover{
  color: #fd2d01;
}
.body-intro{
  margin-top: 25%;
}

</style>
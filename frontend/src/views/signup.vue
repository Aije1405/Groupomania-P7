<template>
<body class="body-intro">
  <main class="main">
    <form class="cadre w-50 m-auto">
      <div class="container">
        <div class="form-group ">
          <label for="inputEmail">📧 Votre e-mail</label>
          <input type="email" class="form-control" id="inputEmail" v-model="dataSignup.email" />
        </div>
        <div class="form-group">
          <label for="inputUsername">👤 Votre nom d'utilisateur</label>
          <input type="text" class="form-control" id="inputUsername" v-model="dataSignup.username" />
          <small>Votre nom d'utilisateur ne peut contenir que des lettres</small>
        </div>
        <div class="form-group">
          <label for="inputPassword">🔒 Votre mot de passe</label>
          <input  type="password" class="form-control" id="inputPassword" v-model="dataSignup.password"/>
          <small>Votre mot de passe doit contenir au moins 6 caractères dont 1 majuscule, 1 minuscule et un chiffre</small>
        </div>
        <button @click.prevent="sendSignup" type="submit" class="btn btn-danger mb-3 mt-3">Créer mon compte 👌</button>
      </div>
    </form>
  </main>
</body>
</template>

<script>
//import de la bibliothèque et d'axios pour les requêtes
import { mapState } from "vuex";
import axios from "axios";


export default {
  name: "Signup",
  data() {
    return {
      dataSignup: {
        username: null,
        email: null,
        password: null
      },
      msg: ""
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    //requête pour créer un user, sécurité grâce au regex
    sendSignup() {
      const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;
      const regexEmail = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;
      const usernameRegex = /^[a-zA-Z ,.'-]+$/;
      if (
        (this.dataSignup.email !== null || this.dataSignup.username !== null || this.dataSignup.password !== null) &&
        (regexPassword.test(this.dataSignup.password) && regexEmail.test(this.dataSignup.email) && usernameRegex.test(this.dataSignup.username))
      ) {
        axios
          .post("http://localhost:3000/api/user/signup", this.dataSignup)
          .then(response => {
            console.log(response);
            this.$router.push({ path: 'Wall' })
            //réinitialisation des champs après saisie
            this.dataSignup.email = null;
            this.dataSignup.username = null;
            this.dataSignup.password = null;
          })
          .catch(error => console.log(error));
      } else {
        alert("Attention, vous n'avez pas rempli les champs correctement !");
      }
    }
  }
};
</script>

<style scope>

.cadre{
  padding: 1%;
  border: grey 3px solid !important;
  border-radius: 20px;
  background-color: white;
}
.main{
  margin-top: 16%;
  text-align: center;
}
.body-intro{
  margin-top: 25%;
}

</style>
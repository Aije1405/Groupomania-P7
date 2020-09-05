<template>
  <nav class="row navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-5">
    <button class="navbar-toggler" type="button"  data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span></button>
    <router-link class="navbar-link" to="/wall"><img class="imglogo" src="../assets/icon-left-font-monochrome-red.png" alt="Logo Groupomania" /></router-link>
 
  <div class="collapse navbar-collapse justify-content navbar-dark bg-dark" id="navbarToggle">
      <ul class="navbar-nav mt-2">
        
        <li class="nav-item " v-if="user.token !== null">
          <router-link class="nav-link " to="/wall"><button type="button" class="btn btn-secondary">Actualités 💬</button></router-link>
        </li>
        <li class="nav-item" v-if="user.token == null">
          <router-link class="nav-link" to="/signup"><button type="button" class="btn btn-secondary">+ Créer un compte</button></router-link>
        </li>
        <li class="nav-item" v-if="user.token == null">
          <router-link class="nav-link" to="/login"><button type="button" class="btn btn-danger">Se connecter</button></router-link>
        </li>
        <li class="nav-item  " v-if="user.token !== null">
          <router-link class="nav-link" to="/user"><button type="button" class="btn btn-secondary">~{{ user.username }}~ 👤</button></router-link>
        </li>
        <li class="nav-item mt-2" v-if="user.token !== null">
          <button type="button" class="btn btn-danger" @click="disconnect">Déconnexion 👋</button>
        </li>
      </ul>
  </div>
</nav>

</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user"])
  },
  methods: {
    disconnect() {
      // Pour se déconnecter, On vide le localStorage, on actualise la page et on redirige vers la page login
      localStorage.clear();
      setTimeout(() => {
      this.$router.push({ path: '/login' })
        window.location.reload();
         }, 500);
           
          }
    }
};
</script>

<style>
nav {
  position: fixed;
  top: 0;
}
.imglogo{
  width: 40%;

}
.btn{
  color: white;
}
.btn:hover{
  color: white;
}
.navbar-toggler{
margin-left: 90%;
}
.navbar-link{
  width: 80% ;
}

</style>
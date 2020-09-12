<template>
  <v-navigation-drawer app fixed expand-on-hover class="h-100">
    <v-list-item link v-if="user.token !== null">
      <v-list-item-icon>
        <v-icon>mdi-account</v-icon>
      </v-list-item-icon>
      <v-list-item-title class="black-text">
        <router-link class="nav-link text-black" to="/user" >{{ user.username }}</router-link>
      </v-list-item-title>
    </v-list-item>
    <v-list >
      <v-list-item link v-if="user.token !== null">
        <v-list-item-icon>
          <v-icon>mdi-message</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <router-link class="nav-link text-black" to="/wall">Publications</router-link>
        </v-list-item-title>
      </v-list-item>

      <v-list-item link v-if="user.token == null">
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <router-link class="nav-link text-black" to="/signup">Créer un compte</router-link>
        </v-list-item-title>
      </v-list-item>

      <v-list-item link v-if="user.token == null">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <router-link class="nav-link text-black" to="/login">Se connecter</router-link>
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2" v-if="user.token !== null">
        <v-btn block @click="disconnect">Déconnexion</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    disconnect() {
      // Pour se déconnecter, On vide le localStorage, on actualise la page et on redirige vers la page login
      localStorage.clear();
      this.$router.go();
    },
  },
};
</script>

<style>
nav {
  position: fixed;
  top: 0;
}
.h-100 {
  height: 100vh !important;
}
.imglogo {
  width: 40%;
}
.btn {
  color: white;
}
.btn:hover {
  color: white;
}
.navbar-toggler {
  margin-left: 90%;
}
.navbar-link {
  width: 80%;
}
.text-black{
  color : #000;
}
</style>
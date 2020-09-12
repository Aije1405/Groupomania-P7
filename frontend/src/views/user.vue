<template>
  <div class="m-auto w-75">
            <v-img height="100" class=" mt-5" contain src="../assets/icon-left-font-monochrome-red.png"/>

  <main class="main-connect pt-3">
        <h1> Paramètres de profil </h1>
        <hr />
    <section class="row user-info ml-5 pl-5 pr-5">
      <div class="col-12">
        <div class="user-info__block ">
          <p class="user-info__block__title title mb-0 mt-3">Email</p>
          <p class="user-info__block__output">
            <small>{{user.email}}</small>
          </p>
        </div>
        <div class="user-info__block">
          <p class="user-info__block__title title mb-0">Nom d'utilisateur</p>
          <p class="user-info__block__output">
            <small>{{user.username}}</small>
          </p>
        </div>
        <button type="button" class="btn btn-danger white d-block mx-auto mt-5 mb-2" @click="deleteAccount">Supprimer mon compte</button>
      </div>
    </section>
  </main>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "User",
  data() {
    return {
      retourAPI: "",
      changePwd: {
        newPassword: null,
        RepeatNewPassword: null
      }
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    //fonction pour supprimer le compte
    deleteAccount() {
      axios
        .delete("http://localhost:3000/api/user/delete", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(() => {
         localStorage.clear();
          setTimeout(() => {
          this.$router.push({ path: '/signup' })
            }, 500);
            window.location.reload();
          })
          
        .catch(error => console.log(error));
    },

    //fonction pour changer le mot de passe
    changePassword() {
      //vérification input nouveau password
      if (
        this.changePwd.newPassword == this.changePwd.RepeatNewPassword &&
        this.changePwd.newPassword != "" &&
        this.changePwd.RepeatNewPassword != ""
      ) {
        axios
          .put(
            "http://localhost:3000/api/user/update",
            {
              newPassword: this.changePwd.newPassword
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            }
          )
          .then(response => {
            document.getElementById("retour-api").classList.add("text-success");
            this.retourAPI = response.data.confirmation;
            setTimeout(() => {
              this.retourAPI = "";
              window.location.reload();
            }, 2000);
          })
          .catch(err => {
            console.log("admin", err);
            this.retourAPI = "Une erreur est survenue, vérifier vos saisies";
          });
      } else {
        document.getElementById("retour-api").classList.add("text-danger");
        this.retourAPI = "Les mots de passe ne sont pas identiques ou ne respectent pas les conditions requises";
      }
    },

    //vérification inputs
    testInputs() {
      const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/;
      let inputNewPwd = document.getElementById("InputNewPassword");
      let inputRepeatNewPwd = document.getElementById("RepeatInputNewPassword");
      inputNewPwd.addEventListener("input", function(e) {
        let value = e.target.value;
        let testValue = regexPassword.test(value);
        if (testValue) {
          inputNewPwd.style.backgroundColor = "#4CAF50";
        } else {
          inputNewPwd.style.backgroundColor = "#f44336";
        }
      });
      inputRepeatNewPwd.addEventListener("input", function() {
        if (
          inputRepeatNewPwd.value == inputNewPwd.value &&
          regexPassword.test(inputRepeatNewPwd.value)
        ) {
          inputRepeatNewPwd.style.backgroundColor = "#4CAF50";
        } else {
          inputRepeatNewPwd.style.backgroundColor = "#f44336";
        }
      });
    }
  },
  //modifications seront effectuées lorsque la requête sera faite
  mounted() {
    this.$store.dispatch("getUserInfos");
  }
};
</script>

<style scope>
.main-connect{
  margin-top: 10%;
  background-color: lightgray;
}
h1{
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 2%;
  text-align: center;
}
hr{
  width: 75%;
}
.title{
  font-weight: bold;
}
small{
 font-size: 0.9em;
}
</style>
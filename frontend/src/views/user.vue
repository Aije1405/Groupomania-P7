<template>
  <main class="main-connect">
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
        <div class="user-info__block d-sm-flex justify-content-between user-info__block--flex">
          <div class="user-info__block">
            <p class="user-info__block__title title mb-0">Mot de passe</p>
            <small class="user-info__block__output">
              Doit contenir au minimum 6 caractères dont une majuscule, une miniscule et un chiffre </small>
          </div>
          <button type="button" class="btn btn-secondary mr-5" data-toggle="modal" data-target="#BoxModalChgPwd" @click="testInputs">Modifier mes informations</button>

<!--modale-->
          <div class="modal fade" id="BoxModalChgPwd" tabindex="-1" role="dialog" aria-labelledby="BoxModalChgPwd__title" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="BoxModalChgPwd__title">Modifer mon mot de passe </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="InputNewPassword">Mon nouveau mot de passe</label>
                      <input
                        type="password"
                        class="form-control"
                        id="InputNewPassword"
                        v-model="changePwd.newPassword"
                      />
                      <small
                        id="emailHelp"
                        class="form-text text-muted"
                      >Au minimum 6 caractères dont une majuscule, un minuscule et un chiffre</small>
                    </div>
                    <div class="form-group">
                      <label for="RepeatInputNewPassword">Je confirme mon nouveau mot de passe</label>
                      <input
                        type="password"
                        class="form-control"
                        id="RepeatInputNewPassword"
                        v-model="changePwd.RepeatNewPassword"
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                  <button type="button" class="btn btn-success" @click="changePassword">Sauvergarder les modifications</button>
                </div>
                <p id="retour-api" class="text-center">{{retourAPI}}</p>
              </div>
            </div>
          </div>
    

        </div>
        <button type="button" class="btn btn-danger white d-block mx-auto mt-5 mb-2" @click="deleteAccount">Supprimer mon compte</button>
      </div>
    </section>
  </main>
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
          this.$router.push({ path: '#/signup' })
            }, 500);
            window.location.reload();
          })
          
        .catch(error => console.log(error));
    },

    // fonction pour changer le mot de passe
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
            console.log("pwd change", response);
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
  background-color: rgba(185, 184, 184, 0.801);
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
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
                  name="input-7-1"
                  v-model="message.content" 
                ></v-textarea>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="modifMessage">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>
</template>

<script>

//import axios et bibliothèque vuex
import { mapState } from "vuex";


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
    },
    message:{
      type:Object
    }
  },
  methods: {
    modifMessage(){
      this.dialog = false
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
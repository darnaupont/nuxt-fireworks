<template>
  <div class="container">
    <div v-if="this.isLoggedIn">
      <button @click="logout()">logout</button>
      <div>
        Hi, {{this.authUser.email}} write me something!
      </div>
      <ul>
        <li v-for="item in textList" :key="item.id" class="liItem">
          {{ item.message}}
  <br>
  <b>{{item.email}}</b>
        </li>
      </ul>
      <input v-model="formText" type="text" />
      <button @click="writeToFirestore()">write</button>
      <button @click="readFromFirestore()">read</button>
    </div>
    <div v-else>
      {{this.authUser}}
      <br>
      {{this.isLoggedIn}}
      <h1 class="title">
        nuxt-fire-base
      </h1>
      <h2 class="subtitle">
        My gnarly Nuxt.js project
      </h2>
      <input v-model="formData.email" type="text" />
      <input v-model="formData.password" type="text" />
      <button @click="signInUser()">login</button>
      <button @click="createUser()">register</button>
      <button @click="readFromFirestore()">read</button>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      formText:'',
      textList:[]
    }
  },
    computed: {
    ...mapState({
      authUser: (state) => state.authUser
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn'
    })
  },
  methods: {
        checkVuexStore() {
      this.$store.dispatch('checkVuexStore')
    },
     async writeToFirestore() {
      if (this.authUser){
      const messageRef = this.$fireStore.collection('message').doc(this.authUser.uid)
      try {
        await messageRef.set({
          email: this.authUser.email,
          message: this.formText
        })
      } catch (e) {
        alert(e)
        return
      }
      alert('Success.')
      this.readFromFirestore();
      } else {
        alert('fuckpermisions.')
      }
    },
    async readFromFirestore() {
      const messageRef = this.$fireStore.collection('message')
      let test =[];
      try {
        const snapshot = await messageRef.get()
        // this.textList = snapshot.map((doc) =>{
        //   return doc.data().message
        // })

         snapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots

            const docid = doc.id;
            const docmessage = doc.data().message;
            console.log(doc.data());
            const docemail = doc.data().email ? doc.data().email : "unknown";
            const item = {id: docid, message: docmessage, email: docemail }
            test.push(item)
            console.log(doc.id, " => ", doc.data());
        });
      } catch (e) {
        alert(e)
        return
      }
      finally {this.textList = test;}
    },
  async createUser() {
    console.log('create')
    let userAuth
      try {
        const userData = await this.$fireAuth.createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
          this.$store.commit('userLogin', {userData})
      } catch (e) {
        alert(e)
      }
      // finally{
      //   if (this.userAuth) {
      //     const userData = this.userAuth
      //     this.$store.commit('userLogin', {userData})
      //   }

      // }
    },
    async signInUser() {
      console.log('sing')
      try {
        await this.$fireAuth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
          this.checkVuexStore();
      } catch (e) {
        alert(e)
      }
    },
    async logout() {
      try {
        await this.$fireAuth.signOut()
      } catch (e) {
        alert(e)
      }
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.liItem{
  margin: 1rem 0;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

<!--suppress ALL -->

<template>
  <v-container>
    <v-container
        fill-height
        fluid
        justify-center>
      <v-flex
          xs12
          md6
          sm6
          lg6>

        <material-card
            color="green"
            title="Registration form"
            text="Provide your credentials">

          <v-form
              @keyup.enter="onSubmit"
              v-model="valid"
              ref="form"
              validation>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                      :rules="emailRules"
                      v-model="email"
                      label="Email" />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                      type="text"
                      v-model="schoolName"
                      :rules="schoolRules"
                      label="School Name" />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                      type="password"
                      :counter="8"
                      :rules="passwordRules"
                      v-model="password"
                      label="Password" />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                      type="password"
                      :counter="8"
                      :rules="confirmRules"
                      v-model="confirm"
                      label="Confirm password" />
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                      class="mx-0 font-weight-light"
                      color="success"
                      :disabled="!valid || loading"
                      @click="onSubmit">
                    Sign up
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-container>
    <v-container
        fill-height
        fluid
        align-center>
      <v-flex
          xs12
          md12
          sm12
          lg12
          class="text-xs-center"
      >
        <router-link tag="a" class="col" class-active="active" to="/login">Already have an account?</router-link>
      </v-flex>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      schoolName: "",
      password: "",
      confirm: "",
      valid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Too short password"
      ],
      confirmRules: [
        v => !!v || "Confirmation is required",
        v => v === this.password || "Passwords did not match"
      ],
      schoolRules: [
        v => !!v || "Schoolname is required",
      ],
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {

        if (this.password !== this.confirm) {
          this.$store.dispatch('setError', 'Passwords did not match!')
          this.password = ''
          this.confirm = ''
          return;
        }

        const user = {
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch("registerUser", {user, schoolName: this.schoolName})
            .then(() => {
              this.$router.push("/");
            })
            .catch(err => console.log(err));
      }
    }
  }
}
</script>

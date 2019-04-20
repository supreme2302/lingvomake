<template>

  <v-container
      fill-height
      fluid
      justify-center>

    <v-flex
        xs12
        md6>

      <material-card
          color="green"
          title="Login Form"
          text="Provide your credentials">

        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12><v-text-field label="Email"/></v-flex>
              <v-flex xs12><v-text-field label="Password"/></v-flex>
              <v-flex xs12 text-xs-right>
                <v-btn
                    class="mx-0 font-weight-light"
                    color="success">
                  Login
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>

      </material-card>

    </v-flex>



  </v-container>





</template>

<script>
  export default {
    data: () => ({

    })
  }
</script>
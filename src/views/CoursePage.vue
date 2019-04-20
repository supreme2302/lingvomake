<template>

  <v-container>

    <v-layout row justify-center>
      <v-flex
          xs12
          md6
          sm6>
        <material-card>
          <v-avatar
              slot="offset"
              class="mx-auto d-block"
              size="130"
              tile
          >
            <img
                src="https://i.pinimg.com/736x/98/85/19/9885199404114df1e5ecf74cc4f6122b--animal-portraits-funny-cats.jpg"
            >
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h4 class="card-title font-weight-light">{{curr_course.name}}</h4>
            <p class="card-description font-weight-light">{{curr_course.description}}</p>
            <v-btn
                color="main"
                class="font-weight-light"
            >Follow</v-btn>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>

    <hr>

    <v-layout row justify-center>
      <v-layout wrap>

        <template
            v-for="course in courses">
          <v-flex
              xs12
              md4
              sm4
              class="ma-3">
            <v-card :to="'/course/1'">
              <v-layout>
                <v-flex xs5>
                  <v-img
                      :src=course.img
                      height="125px"
                      contain
                      class="ma-1"
                  ></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <h4>{{course.name}}</h4>
                      <h6>{{course.description}}</h6>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-card>

          </v-flex>
        </template>

      </v-layout>
    </v-layout>




  </v-container>

</template>

<script>
  export default {
	data: () => ({
      curr_course: {name: 'TOEFL B2', description: 'for B2 lvl students', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
      courses: [
		    {name: 'Unit1', description: 'databases', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
		    {name: 'Unit2', description: 'network', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
		    {name: 'Unit3', description: 'systems', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
		    {name: 'Unit4', description: 'customers', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
		    {name: 'Unit5', description: 'problems', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
		    {name: 'Unit6', description: 'diplomas', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
      ]
	})
  }
</script>
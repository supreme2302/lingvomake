<template>

  <v-container
      fill-height
      fluid
      grid-list-xl>
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
  </v-container>

</template>

<script>
  export default {
	data: () => ({
    courses: [
      {name: 'TOEFL B2', description: 'for B2 lvl students', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
	    {name: 'GRE C1', description: 'advanced english', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
	    {name: 'GMAT', description: 'maths in english', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
	    {name: 'IELTS', description: 'for European universities', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'}
    ]
	})
  }
</script>
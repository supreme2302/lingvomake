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
	  data: () => ({}),
    computed: {
      courses() {
      return this.$store.getters.courses;
      }
    }
  }
</script>
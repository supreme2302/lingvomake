<template>

  <v-container>

    <v-layout row justify-center>
      <v-flex
          xs12
          md6
          sm6>
        <material-card>
          <v-card-text class="text-xs-center">
            <h2 class="card-title font-weight-light">{{curr_unit.name}}</h2>
            <p class="card-description font-weight-light">{{curr_unit.description}}</p>
            <v-btn color="main" class="font-weight-light">EDIT</v-btn>
          </v-card-text>

          <v-btn icon style="position: absolute; top:2%; right:2%">
            <v-icon color="red">delete</v-icon>
          </v-btn>

        </material-card>
      </v-flex>
    </v-layout>

    <br>
    <hr>
    <br>

    <v-layout row justify-center>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dolor doloribus, ex iusto laudantium maxime quae tenetur ullam. Beatae cupiditate deserunt dolore earum eius excepturi fuga illum incidunt laboriosam non obcaecati officia quidem, quo rem repellendus, reprehenderit rerum sequi voluptate.</p>
    </v-layout>


  </v-container>

</template>

<script>
  export default {
	data: () => ({
	  curr_unit: {name: 'Unit1', description: 'databases', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
	  courses: [
      {name: 'Unit1', description: 'databases', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
      {name: 'Unit2', description: 'network', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
      {name: 'Unit3', description: 'systems', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
      {name: 'Unit4', description: 'customers', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
      {name: 'Unit5', description: 'problems', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
      {name: 'Unit6', description: 'diplomas', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
      {name: 'Unit3', description: 'systems', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
      {name: 'Unit3', description: 'systems', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
      {name: 'Unit3', description: 'systems', img: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'},
	  ]
	})
  }
</script>
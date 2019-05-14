<!--suppress ALL -->
<template>

        <v-layout wrap justify-center>

            <v-jumbotron v-if="!isUserLoggedIn"
                         :gradient="gradient"
                         dark
                         src="https://lingvomake.ml/static/board.jpg"
                         class="fullheight"
            >
                <v-container class="kakaclass" justify-centera align-center>
                    <v-layout align-center wrap class="margin-top">
                        <v-flex xs12 text-xs-center class="display-3">
                            <span>Welcome to Lingvomake</span>
                        </v-flex>
                        <v-flex xs12 text-xs-center class="headline">
                            <span>a powerful course management system and app constructor</span>
                        </v-flex>
                        <v-flex xs12 text-xs-center>
                            <v-btn dark flat outline to="/registration" style="font-size: 18px">Sign Up</v-btn>
                            <v-btn class="hidden-sm-and-down" dark flat outline style="font-size: 18px" @click="scrollToPoint">Learn More</v-btn>
                            <v-btn class="hidden-md-and-up" dark flat outline style="font-size: 18px" @click="scrollToPoint2">Learn More</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-jumbotron>

            <v-flex xs6 sm8 lg6 class="hidden-sm-and-down">

                <br>

                <v-layout row id="point">
                    <v-card
                        style="width: 100%"
                        class="colorBackground"
                        flat
                    >
                        <v-layout>

                            <v-flex xs4>
                                <br>
                                <v-img
                                    class="white--text img-circle img-center"
                                    height="200px"
                                    width="200px"
                                    :src="card1.imgSrc">
                                </v-img>
                                <br>
                            </v-flex>
                            <v-flex xs8>
                                <v-card-title primary-title class="mt-5">
                                    <div>
                                        <div class="display-1">{{ card1.head }}</div>
                                        <div>{{ card1.body }}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-layout>

                <hr>

                <v-layout row>
                    <v-card
                        style="width: 100%"
                        class="colorBackground"
                        flat
                    >
                        <v-layout>
                            <v-flex xs8>
                                <v-card-title primary-title class="mt-5">
                                    <div>
                                        <div class="display-1">{{ card2.head }}</div>
                                        <div>{{ card2.body }}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                            <v-flex xs4>
                                <br>
                                <v-img
                                    class="white--text img-circle img-center"
                                    height="200px"
                                    width="200px"
                                    aspect-ratio="1"
                                    :src="card2.imgSrc">
                                </v-img>
                                <br>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-layout>

                <hr>

                <v-layout row>
                    <v-card
                        style="width: 100%"
                        class="colorBackground"
                        flat
                    >
                        <v-layout>

                            <v-flex xs4>
                                <br>
                                <v-img
                                    class="white--text img-circle img-center"
                                    height="200px"
                                    width="200px"
                                    aspect-ratio="1"
                                    :src="card3.imgSrc">
                                </v-img>
                                <br>
                            </v-flex>
                            <v-flex xs8>
                                <v-card-title primary-title class="mt-5">
                                    <div>
                                        <div class="display-1">{{ card3.head }}</div>
                                        <div>{{ card3.body }}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-layout>

                <hr>

                <v-layout row>
                    <v-card
                        style="width: 100%"
                        class="colorBackground"
                        flat
                    >
                        <v-layout>
                            <v-flex xs8>
                                <v-card-title primary-title class="mt-5">
                                    <div>
                                        <div class="display-1">{{ card4.head }}</div>
                                        <div>{{ card4.body }}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                            <v-flex xs4>
                                <br>
                                <v-img
                                    class="white--text img-circle img-center"
                                    height="200px"
                                    width="200px"
                                    aspect-ratio="1"
                                    :src="card4.imgSrc">
                                </v-img>
                                <br>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-layout>
            </v-flex>

            <v-flex xs12 class="hidden-md-and-up">

                <br>

                <v-layout row id="point2">
                    <v-card
                        style="width: 100%"
                        class="colorBackground"
                        flat
                    >
                        <v-layout wrap class="text-xs-center">
                            <v-flex xs12>
                                <br>
                                <v-img
                                        class="white--text img-circle img-center img-center"
                                        height="200px"
                                        width="200px"
                                        :src="card1.imgSrc">
                                    </v-img>
                                <br>
                            </v-flex>
                            <v-flex xs12>
                                <v-card-title primary-title class="mt-5">
                                    <div>
                                        <div class="display-1">{{ card1.head }}</div>
                                        <div>{{ card1.body }}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                        </v-layout>

                    </v-card>
                </v-layout>

                <hr>

                <v-layout row>
                    <v-card
                        style="width: 100%"
                        class="colorBackground"
                        flat
                    >
                        <v-layout wrap class="text-xs-center">
                            <v-flex xs12>
                                <br>
                                <v-img
                                    class="white--text img-circle img-center"
                                    height="200px"
                                    width="200px"
                                    aspect-ratio="1"
                                    :src="card2.imgSrc">
                                </v-img>
                                <br>
                            </v-flex>
                            <v-flex xs12>
                                <v-card-title primary-title class="mt-5">
                                    <div>
                                        <div class="display-1">{{ card2.head }}</div>
                                        <div>{{ card2.body }}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-layout>

                <hr>

                <v-layout row>
                    <v-card
                        style="width: 100%"
                        class="colorBackground"
                        flat
                    >
                        <v-layout wrap class="text-xs-center">
                            <v-flex xs12>
                                <br>
                                <v-img
                                    class="white--text img-circle img-center"
                                    height="200px"
                                    width="200px"
                                    aspect-ratio="1"
                                    :src="card3.imgSrc">
                                </v-img>
                                <br>
                            </v-flex>
                            <v-flex xs12>
                                <v-card-title primary-title class="mt-5">
                                    <div>
                                        <div class="display-1">{{ card3.head }}</div>
                                        <div>{{ card3.body }}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-layout>

                <hr>

                <v-layout row>
                    <v-card
                        style="width: 100%"
                        class="colorBackground"
                        flat
                    >
                        <v-layout wrap class="text-xs-center">
                            <v-flex xs12>
                                <br>
                                <v-img
                                    class="white--text img-circle img-center"
                                    height="200px"
                                    width="200px"
                                    aspect-ratio="1"
                                    :src="card4.imgSrc">
                                </v-img>
                                <br>
                            </v-flex>
                            <v-flex xs12>
                                <v-card-title primary-title class="mt-5">
                                    <div>
                                        <div class="display-1">{{ card4.head }}</div>
                                        <div>{{ card4.body }}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-layout>
            </v-flex>

            <v-flex xs12>
                <hr>
            </v-flex>

            <v-flex xs12>

            </v-flex>

        </v-layout>


</template>

<script>
  export default {
	data() {
	  return {
		gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
      card1: {
        imgSrc: 'https://lingvomake.ml/static/books.jpg',
        head: 'Manage educational courses',
        body: 'You can create up to 3 different task types: tests, sentense constructors and matchings'
      },
      card2: {
        imgSrc: 'https://lingvomake.ml/static/class.jpg',
        head: 'Manage groups of students',
        body: 'You can easily create groups and add students there'
      },
      card3: {
        imgSrc: 'https://lingvomake.ml/static/mobile.jpg',
        head: 'Manage mobile application',
        body: 'You can set some parameters of mobile APP and build it with a design appropriate to your business'
      },
      card4: {
        imgSrc: 'https://lingvomake.ml/static/school.jpg',
        head: 'Manage all the school',
        body: 'You can register the teachers and delegate them some work'
      },
	  }
	},
    methods: {
	  scrollToPoint() {
      const el = document.getElementById('point');
      el.scrollIntoView({block: "start", behavior: "smooth"});
    },
	  scrollToPoint2() {
		    const el = document.getElementById('point2');
		    el.scrollIntoView({block: "start", behavior: "smooth"});
	  }
    },

    computed: {
	  isUserLoggedIn () {
		return this.$store.getters.isUserLoggedIn
	  },
    }
  }
</script>

<style scoped>
    .fullheight {
        height: 100vh !important;
    }
    .img-circle {
        border-radius: 50%;
        border: solid;
        /*margin-left: 15%;*/
    }
    .img-center {
        margin: 0 auto;
    }
</style>

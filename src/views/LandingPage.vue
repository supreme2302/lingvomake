<!--suppress ALL -->
<template>
    <div>
        <v-jumbotron v-if="!isUserLoggedIn"
                :gradient="gradient"
                dark
                src="https://lingvomake.ml/static/board.jpg"
                class="fullheight"
        >
            <v-container>
                <v-layout align-center wrap class="margin-top">
                    <v-flex xs12 text-xs-center>
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium amet, autem corporis dicta ducimus esse inventore iste libero pariatur quae repellat totam veniam vitae voluptates! Adipisci consectetur doloribus, ducimus enim expedita explicabo illum in ipsam magni maxime natus neque obcaecati pariatur quam qui temporibus ut. Eum illum modi quibusdam.</span>
                    </v-flex>
                    <v-flex xs12 text-xs-center>
                        <v-btn dark flat to="/registration" style="font-size: 18px">Sign Up</v-btn>
                        <v-btn dark flat style="font-size: 18px" @click="scrollToPoint">Learn More</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-jumbotron>

        <v-layout row id="point">
            <v-card
                    style="width: 100%"
                    class="colorBackground"
            >
                <v-layout>
                    <v-flex xs4 sm3 md2 lg1>
                        <v-card-title>
                            <v-img
                                    class="white--text"
                                    height="200px"
                                    contain
                                    :src="card1.imgSrc">
                            </v-img>
                        </v-card-title>
                    </v-flex>
                    <v-flex xs8 sm9 md10 lg11>
                        <v-card-title primary-title class="mt-5">
                            <div>
                                <div class="headline">{{ card1.head }}</div>
                                <div>{{ card1.body }}</div>
                            </div>
                        </v-card-title>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-layout>

        <v-layout row>
            <v-card
                    style="width: 100%">
                <v-layout>
                    <v-flex xs8 sm9 md10 lg11>
                        <v-card-title primary-title class="mt-5" style="float: right">
                            <div>
                                <div class="headline">{{ card2.head }}</div>
                                <div>{{ card2.body }}</div>
                            </div>
                        </v-card-title>
                    </v-flex>
                    <v-flex xs4 sm3 md2 lg1>
                        <v-card-title>
                            <v-img
                                    class="white--text"
                                    height="200px"
                                    contain
                                    :src="card2.imgSrc">
                            </v-img>
                        </v-card-title>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-layout>

        <v-layout row>
            <v-card
                    style="width: 100%">
                <v-layout>
                    <v-flex xs4 sm3 md2 lg1>
                        <v-card-title>
                            <v-img
                                    class="white--text"
                                    height="200px"
                                    contain
                                    :src="card3.imgSrc">
                            </v-img>
                        </v-card-title>
                    </v-flex>
                    <v-flex xs8 sm9 md10 lg11>
                        <v-card-title primary-title class="mt-5">
                            <div>
                                <div class="headline">{{ card3.head }}</div>
                                <div>{{ card3.body }}</div>
                            </div>
                        </v-card-title>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-layout>

        <v-layout row>
            <v-card
                style="width: 100%">
                <v-layout>
                    <v-flex xs8 sm9 md10 lg11>
                        <v-card-title primary-title class="mt-5" style="float: right">
                            <div>
                                <div class="headline">{{ card4.head }}</div>
                                <div>{{ card4.body }}</div>
                            </div>
                        </v-card-title>
                    </v-flex>
                    <v-flex xs4 sm3 md2 lg1>
                        <v-card-title>
                            <v-img
                                class="white--text"
                                height="200px"
                                contain
                                :src="card4.imgSrc">
                            </v-img>
                        </v-card-title>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-layout>
    </div>
</template>

<script>
  export default {
	data() {
	  return {
		gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
      card1: {
        imgSrc: 'https://lingvomake.ml/static/education.png',
        head: 'Manage educational courses',
        body: 'You can create up to 3 different task types: tests, sentense constructors and matchings'
      },
      card2: {
        imgSrc: 'https://lingvomake.ml/static/group.png',
        head: 'Manage groups of students',
        body: 'You can easily create groups and add students there'
      },
      card3: {
        imgSrc: 'https://lingvomake.ml/static/phone.png',
        head: 'Manage mobile application',
        body: 'You can set some parameters of mobile APP and build it with a design appropriate to your business'
      },
      card4: {
        imgSrc: 'https://lingvomake.ml/static/school.png',
        head: 'Manage all the school',
        body: 'You can register the teachers and delegate them some work'
      },
	  }
	},
    methods: {
	  scrollToPoint() {
		const el = document.getElementById('point');
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
</style>

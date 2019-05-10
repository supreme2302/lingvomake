<!--suppress ALL -->
<template>
  <v-container
      fill-height
      fluid
      grid-list-xl>
    <v-layout wrap align-center>

      <template
      v-for="course in courses">
        <v-flex
            xs12
            sm6
            md4
            class="ma-3">
          <v-hover>
            <v-card
                :to="'/course/' + course.id"
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 2}`">
              <v-layout>
                <v-flex xs5 class="pb-0 pr-0">
                  <v-img
                      :src="imgSrc + course.courseImage"
                      height="125px"
                      contain
                      class="ma-1"
                  ></v-img>
                </v-flex>
                <v-flex xs7 class="pb-0 pl-0">
                  <v-card-title primary-title class="pb-0">
                    <div>
                      <h4>{{course.name}}</h4>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 class="pt-0">
                  <v-card-title primary-title class="pt-0">
                    <div>
                      <h6>{{course.description}}</h6>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-card>
          </v-hover>
        </v-flex>
      </template>
      <v-flex
          xs12
          sm6
          class="ma-3">
        <v-btn fab icon round color="blue" @click="openDialog"><v-icon>add</v-icon></v-btn>
      </v-flex>
    </v-layout>

    <v-dialog
        v-model="dialog"
        max-width="490">
      <material-card
          color="blue"
          title="Course Form"
          text="Provide course attributes">
        <v-form
            @keyup.enter="onSubmitCreateCourse"
            v-model="valid"
            ref="form"
            validation>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                    v-model="newCourseName"
                    :rules="courseNameRules"
                    label="Course Name"/>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                    v-model="newCourseDescription"
                    :rules="courseDescriptionRules"
                    label="Course Description"/>
              </v-flex>
              <v-flex xs12 text-xs-right>
                <v-btn
                    class="mx-0 font-weight-light"
                    color="blue"
                    :disabled="!valid"
                    @click="onSubmitCreateCourse">
                  Create
                </v-btn>
              </v-flex>
              <v-flex xs12 text-xs-right>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </material-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import API from '../utils/API.js';

  export default {
	data: () => ({
	  courseNameRules: [
		v => {
		  const words = v.split(' ');
		  for (let i = 0; i < words.length; ++i) {
			if (words[i].length >= 12) {
			  return 'This field does not allow words longer than 12 characters.';
			}
		  }
		  return true;
		},
		v => !!v || 'The field must not be empty',
		v => v.length <= 24 || 'Name is too long'
	  ],
	  courseDescriptionRules: [
		v => {
		  const words = v.split(' ');
		  for (let i = 0; i < words.length; ++i) {
			if (words[i].length >= 12) {
			  return 'This field does not allow words longer than 12 characters.';
			}
		  }
		  return true;
		},
		v => !!v || 'The field must not be empty',
		v => v.length <= 48 || 'Desctiption is too long'
	  ],
	  dialog: false,
	  newCourseName: '',
	  newCourseDescription: '',
	  valid: false
	}),
	computed: {
	  courses() {
		return this.$store.getters.courses;
	  },
	  imgSrc() {
		return API.baseUrl + API.method.courseImage;
	  }
	},
	methods: {
	  openDialog() {
		this.dialog = true;
	  },
	  closeDialog() {
		this.dialog = false;
	  },
	  onSubmitCreateCourse() {
		if (this.$refs.form.validate()) {
		  const course = {
			name: this.newCourseName,
			description: this.newCourseDescription
		  };
		  this.$store.dispatch('createCourse', course)
			  .then(() => this.$store.dispatch('loadCourses'))
			  .finally(() => this.dialog = false)
		}
	  }
	}
  }
</script>
<style scoped>
  .clip {
    white-space: nowrap; /* Запрещаем перенос строк */
    overflow: hidden; /* Обрезаем все, что не помещается в область */
    text-overflow: ellipsis; /* Добавляем многоточие */
    padding: 5px;
  }
</style>

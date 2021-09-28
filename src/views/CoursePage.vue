<!--suppress ALL -->
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
              @click="triggerUpload"
          >
            <v-hover>
              <v-img slot-scope="{ hover }"
                     :src="imgSrc"
              >
                <v-expand-transition>
                  <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text font-hover"
                      style="height: 100%;"
                  >
                    Change
                  </div>
                </v-expand-transition>
              </v-img>
            </v-hover>
          </v-avatar>
          <input
              id="inputId"
              ref="fileInput"
              type="file"
              style="display: none"
              accept="image/*"
              @change="onFileChange"
          />
          <v-card-text class="text-xs-center">
            <h3 class="card-title font-weight-light">{{ course.name }}</h3>
            <p class="card-description font-weight-light">{{ course.description }}</p>
            <v-btn
                color="main"
                class="font-weight-light"
                @click="openEditCourseDialog"
            >EDIT
            </v-btn>
          </v-card-text>

          <v-btn
              flat
              icon style="position: absolute; top:2%; right:2%"
              @click="openDeleteCourseDialog"
          >
            <v-icon color="red" dark>delete</v-icon>
          </v-btn>
        </material-card>
      </v-flex>
    </v-layout>
    <hr>
    <v-layout row justify-center>
      <v-layout wrap>

        <template
            v-for="unit in units">
          <v-flex
              xs12
              sm6
              md4
              class="ma-3">
            <v-card :to="'/unit/' + unit.id">
              <v-card-title primary-title>
                <div>
                  <h4>{{ unit.unit_name }}</h4>
                  <h6>{{ unit.description }}</h6>
                </div>
              </v-card-title>
              <div class="text-xs-center">
                <v-chip v-for="(tag, i) in unit.tags"
                        :key="i"
                        outline
                        color="success">{{ tag }}
                </v-chip>
              </div>
            </v-card>
          </v-flex>
        </template>
        <v-flex
            xs12
            sm4
            class="ma-3">
          <v-btn fab icon round color="blue" @click="openCreateUnitDialog">
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>

    <v-dialog
        v-model="createUnitDialog"
        max-width="490">
      <material-card
          color="blue"
          title="Unit Form"
          text="Provide unit attributes">
        <v-form
            @keyup.enter="onSubmitCreateUnit"
            v-model="createUnitValid"
            ref="createUnitfFrm"
            validation>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                    v-model="newUnitName"
                    :rules="courseOrUnitNameRules"
                    label="Unit Name" />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                    v-model="newUnitDescription"
                    :rules="courseOrUnitDescriptionRules"
                    label="Unit Description" />
              </v-flex>
              <v-flex>
                <v-combobox
                    v-model="chipModel"
                    :items="chipItems"
                    :search-input.sync="chipSearch"
                    :rules="chipRules"
                    hide-selected
                    hint="Maximum of 3 tags"
                    label="Add some tags"
                    multiple
                    persistent-hint
                    small-chips
                >
                  <template v-slot:no-data>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          Press <kbd>enter</kbd> to create tag "<strong>{{ chipSearch }}</strong>"
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                </v-combobox>
              </v-flex>
              <v-flex xs12 text-xs-right>
                <v-btn
                    class="mx-0 font-weight-light"
                    color="blue"
                    :disabled="!createUnitValid"
                    @click="onSubmitCreateUnit">
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

    <v-dialog v-model="deleteCourseDialog" persistent max-width="440">
      <v-card>
        <v-card-title class="headline">
          Do you want to delete this course?
        </v-card-title>
        <v-card-text>
          This process is irreversible, you can't restore this course later!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" flat @click="closeDeleteCourseDialog">
            Cancel
          </v-btn>
          <v-btn color="error" flat :loading="loadingToDelete" @click="deleteCourse">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
        v-model="editCourseDialog"
        max-width="490">
      <material-card
          color="blue"
          title="Edit Course"
          text="Provide course attributes">
        <v-form
            @keyup.enter="onSubmitEditCourse"
            v-model="valid"
            ref="editForm"
            validation>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                    v-model="newCourseName"
                    :rules="courseOrUnitNameRules"
                    label="Course Name" />
              </v-flex>
              <v-flex xs12>
                <v-text-field
                    v-model="newCourseDescription"
                    :rules="courseOrUnitDescriptionRules"
                    label="Course Description" />
              </v-flex>
              <v-flex xs12 text-xs-right>
                <v-btn
                    class="mx-0 font-weight-light"
                    color="blue"
                    :disabled="!valid"
                    @click="onSubmitEditCourse">
                  Save
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
  data() {
    return {
      chipRules: [
        chips => {
          if (chips !== null) {
            for (let i = 0; i < chips.length; ++i) {
              if (chips[i].length >= 5) {
                return 'Tag name must be less than 5 symbols';
              }
            }
            return true;
          }
          return 'The field must not be empty';
        },
        chips => chips !== null ? (chips.length <= 3 || 'You can specify no more than 3 tags.') : 'The field must not be empty',
        chips => chips !== null ? (chips.length !== 0 || 'The field must not be empty') : 'The field must not be empty',
      ],
      courseOrUnitNameRules: [
        v => {
          if (v !== null) {
            const words = v.split(' ');
            for (let i = 0; i < words.length; ++i) {
              if (words[i].length >= 12) {
                return 'This field does not allow words longer than 12 characters.';
              }
            }
            return true;
          }
          return 'The field must not be empty';
        },
        v => !!v || 'The field must not be empty',
        v => v !== null ? (v.length <= 24 || 'Name is too long') : 'The field must not be empty'
      ],
      courseOrUnitDescriptionRules: [
        v => {
          if (v !== null) {
            const words = v.split(' ');
            for (let i = 0; i < words.length; ++i) {
              if (words[i].length >= 12) {
                return 'This field does not allow words longer than 12 characters.';
              }
            }
            return true;
          }
          return 'The field must not be empty';
        },
        v => !!v || 'The field must not be empty',
        v => v !== null ? (v.length <= 40 || 'Desctiption is too long') : 'The field must not be empty'
      ],
      createUnitValid: false,
      valid: false,
      editCourseDialog: false,
      createUnitDialog: false,
      deleteCourseDialog: false,
      newUnitName: '',
      newUnitDescription: '',
      loadingToDelete: false,
      newCourseName: '',
      newCourseDescription: '',
      imgSrc: API.baseUrl + API.method.courseImage + this.$store.getters.course.courseImage,
      chipModel: [],
      chipSearch: null,
      chipItems: [
        {header: 'Tags'},
      ],
      chipColors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      chipNonce: 1
    }
  },
  computed: {
    course() {
      return this.$store.getters.course;
    },

    units() {
      return this.$store.getters.units;
    }
  },
  methods: {
    openCreateUnitDialog() {
      this.newUnitName = null;
      this.newUnitDescription = null;
      this.createUnitDialog = true;
    },
    closeCreateUnitDialog() {
      this.createUnitDialog = false;
    },
    openDeleteCourseDialog() {
      this.deleteCourseDialog = true;
    },
    closeDeleteCourseDialog() {
      this.deleteCourseDialog = false;
    },
    openEditCourseDialog() {
      this.editCourseDialog = true;
    },
    closeEditCourseDialog() {
      this.editCourseDialog = false;
    },
    onSubmitCreateUnit() {
      if (this.$refs.createUnitfFrm.validate()) {
        const unit = {
          unit_name: this.newUnitName,
          description: this.newUnitDescription,
          course_id: this.course.id,
          tags: this.chipModel
        };
        console.log('unit ', unit);
        this.$store.dispatch('createUnit', unit)
            .then(() => this.$store.dispatch('loadUnitsByCourseId', this.course.id))
            .finally(() => this.createUnitDialog = false)
      }
    },
    onSubmitEditCourse() {
      if (this.$refs.editForm.validate()) {
        const editedCourse = {
          id: this.course.id,
          name: this.newCourseName,
          description: this.newCourseDescription
        }
        this.$store.dispatch('changeCourse', editedCourse)
            .then(() => this.$store.dispatch('loadSingleCourseById', this.course.id))
            .finally(() => this.editCourseDialog = false)
      }
    },
    deleteCourse() {
      this.loadingToDelete = true;
      this.$store.dispatch('deleteCourseById', {id: this.course.id})
          .then(() => {
            this.deleteCourseDialog = false;
            this.loadingToDelete = false;
            this.$router.push('/courses');
            this.$store.dispatch('loadCourses');
          })
          .catch((e) => {
            console.error('error during deleting course: ', e);
            this.deleteDialog = false;
            this.loadingToDelete = false;
          })
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      event.preventDefault();
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = event => {
        this.imgSrc = reader.result;
      };
      reader.readAsDataURL(file);
      const input = document.getElementById('inputId');
      this.image = input.files[0];
      const img = this.image;
      const id = this.course.id;
      this.$store.dispatch('changeCourseImage', {img, id})
          .then(() => {
            this.$store.dispatch('loadSingleCourseById', id);
          });
    },

    filter(item, queryText, itemText) {
      if (item.header) return false;
      const hasValue = val => val != null ? val : '';
      const text = hasValue(itemText);
      const query = hasValue(queryText);
      return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
    },
  },
  watch: {
    chipModel(val) {
      if (val !== null) {
        if (val.length > 3) {
          this.$nextTick(() => this.chipModel.pop())
        }
      }
    }
  },
  created() {
    this.newCourseName = this.course.name;
    this.newCourseDescription = this.course.description;
  }
}
</script>
<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

.font-hover {
  font-size: 1.2em !important;
}
</style>

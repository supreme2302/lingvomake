<!--suppress ALL -->
<template>
  <v-container
      fill-height
      fluid
      grid-list-xl
  >
    <v-layout
        wrap
        justify-center
    >
      <v-flex xs12>
        <v-btn class="toolbar-items" color="success" @click="quizModal = true">New Quiz</v-btn>
      </v-flex>

      <v-flex
          xs12
      >
        <material-card
            color="green"
            title="Quizes"
            text="You can sort the data by clicking the header"
        >
          <v-data-table
              :headers="headers"
              :items="quizzes"
              hide-actions
          >
            <template
                slot="headerCell"
                slot-scope="{ header }"
            >
              <span
                  class="subheading font-weight-light text-success text--darken-3"
                  v-text="header.text"
              />
            </template>

            <template
                slot="items"
                slot-scope="{ item }"
            >
              <td>{{ item.name }}</td>
              <td>
                <v-btn icon round color="teal">
                  <v-icon @click="editQuiz(item)">edit</v-icon>
                </v-btn>
              </td>
              <td>
                <v-btn icon round color="red">
                  <v-icon @click="deleteQuizModal = true; quizToDelete = item.id">delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>

      <v-dialog v-model="quizModal" max-width="390">
        <material-card
            color="blue"
            title="Quiz Form"
            text="Provide new Quiz info">
          <v-form
              @keypress.enter="onSubmit"
              v-model="quizValid"
              ref="createQuizForm"
              validation>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                      v-model="quizName"
                      type="text"
                      :rules="textRules"
                      counter="20"
                      label="Quiz Name" />
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                      :disabled="!quizValid"
                      class="mx-0 font-weight-light"
                      color="blue"
                      @click="createQuiz">
                    Create
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-dialog>

      <v-dialog v-model="deleteQuizModal" persistent max-width="440">
        <v-card>
          <v-card-title class="headline">
            Do you want to delete this quiz?
          </v-card-title>
          <v-card-text>
            This process is irreversible, you can't restore this quiz later!
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" flat @click="deleteQuizModal = false">
              Cancel
            </v-btn>
            <v-btn color="error" flat @click="deleteQuiz">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {

  data: () => ({
    headers: [
      {
        sortable: true,
        text: 'Name',
        value: 'name'
      },
      {
        sortable: false,
        text: 'Edit',
        value: null
      },
      {
        sortable: false,
        text: 'Delete',
        value: null
      },
    ],
    textRules: [
      v => !!v || "This field is required",
      v => !!v && v.length <= 20 || "too long"
    ],

    quizModal: false,
    quizValid: false,
    quizName: '',
    deleteQuizModal: false,
    quizToDelete: null,
  }),
  computed: {
    quizzes() {
      return this.$store.getters.quizzes;
    },
  },
  methods: {
    createQuiz() {
      if (this.$refs.createQuizForm.validate()) {
        const newQuiz = {
          name: this.quizName,
        };
        this.$store.dispatch('createQuiz', newQuiz)
            .then(() => this.$store.dispatch('getQuizzes'));
        this.quizModal = false;
      }
    },

    editQuiz(item) {
      this.$router.push('/admin/quizzes/' + item.id);
    },
    deleteQuiz() {
      this.$store.dispatch('deleteQuiz', this.quizToDelete)
          .then(() => {
            this.quizToDelete = null;
            this.$store.dispatch('getQuizzes')
          });
      this.deleteQuizModal = false;
    }
  },
  mounted() {
    this.$store.dispatch('getQuizzes');
  }
}
</script>

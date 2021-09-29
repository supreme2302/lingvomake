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
        <v-btn class="toolbar-items" color="success" @click="createQuestionModal = true">Add Question</v-btn>
      </v-flex>

      <v-flex
          xs12
      >
        <material-card
            color="green"
            title="Quiz"
            text="You can sort the data by clicking the header"
        >
          <v-data-table
              :headers="headers"
              :items="questions"
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
              <td>{{ item.question }}</td>
              <td>
                <v-btn icon round color="teal">
                  <v-icon @click="editQuestion(item)">edit</v-icon>
                </v-btn>
              </td>
              <td>
                <v-btn icon round color="red">
                  <v-icon @click="deleteQuestionModal = true; questionToDelete = item.id">delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>

      <v-dialog
          v-model="createQuestionModal"
          max-width="700">
        <material-card
            color="blue"
            title="Creating Question Form"
            text="Provide task attributes">
          <v-form
              @keyup.enter="onSubmitCreateQuestion"
              v-model="questionValid"
              ref="form"
              validation>
            <v-container py-0>
              <v-layout wrap>

                <v-flex xs12>
                  <v-text-field
                      label="Enter question"
                      v-model="question"
                      :rules="textRules"
                  />
                </v-flex>
                <v-flex xs12>
                  <p>Choose amount of answers</p>
                  <v-radio-group v-model="amountOfAnswers" row>
                    <v-radio label="2" value=2></v-radio>
                    <v-radio label="3" value=3></v-radio>
                    <v-radio label="4" value=4></v-radio>
                  </v-radio-group>
                </v-flex>
                <template v-for="n in Number.parseInt(amountOfAnswers) | parseIntFilter">
                  <v-flex xs12>
                    <v-text-field
                        :label="n.toString() + ' answer'"
                        v-model="answers[n]"
                        :rules="notEmptyRules"
                    />
                  </v-flex>
                </template>
                <v-flex xs12>
                  <v-overflow-btn
                      :items="enteredAnswers"
                      label="Choose a correct answer"
                      item-value="id"
                      v-model="correctAnwser"
                      :rules="notEmptyRules"
                  ></v-overflow-btn>
                </v-flex>

                <v-flex xs12 text-xs-right>
                  <v-btn
                      :disabled="!questionValid"
                      class="mx-0 font-weight-light"
                      color="blue"
                      @click="onSubmitCreateQuestion">
                    Create
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-dialog>

      <v-dialog v-model="deleteQuestionModal" persistent max-width="440">
        <v-card>
          <v-card-title class="headline">
            Do you want to delete this question?
          </v-card-title>
          <v-card-text>
            This process is irreversible, you can't restore this question later!
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" flat @click="deleteQuestionModal = false">
              Cancel
            </v-btn>
            <v-btn color="error" flat @click="deleteQuestion">
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

  data() {
    return {
      headers: [
        {
          sortable: true,
          text: 'Name',
          value: 'question'
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
      notEmptyRules: [
        v => !!v || "The field must not be empty",
      ],
      createQuestionModal: false,
      questionValid: false,
      questionName: null,
      deleteQuestionModal: false,
      questionToDelete: null,
      question: null,
      /**
       * Выбранное количество вариантов ответов
       */
      amountOfAnswers: null,
      /**
       * Варианты ответа. При отправке будут выбираться те, что не пустые
       */
      answers: {
        1: null,
        2: null,
        3: null,
        4: null,
      },
      correctAnwser: null
    }
    //todo объединить в один объект
  },
  filters: {
    parseIntFilter(num) {
      return num ? num : 1;
    }
  },
  computed: {
    questions() {
      return this.$store.getters.quiz.questions;
    },
    quiz() {
      return this.$store.getters.quiz;
    },
    /**
     * Выбираем не пустые варианты ответов перед отправкой
     */
    enteredAnswers() {
      let ans = [];
      for (let i = 1; i <= 4; ++i) {
        if (this.answers[i.toString()]) {
          ans.push(this.answers[i.toString()]);
        }
      }
      return ans;
    }
  },
  methods: {
    onSubmitCreateQuestion() {
      if (this.$refs.form.validate()) {
        const filteredAnswers = this.enteredAnswers.filter(answer => answer !== null);
        const createdQuestion = {
          quizId: this.quiz.id,
          question: this.question,
          answers: filteredAnswers,
          correctAnswer: this.correctAnwser
        }
        console.log('createdQuestion: ', createdQuestion);
        this.$store.dispatch('createQuestion', createdQuestion)
            .then(() => {
              this.$store.dispatch('getQuiz', this.quiz.id)
            })
            .finally(() => this.closeCreateQuestionModal())
      }
    },
    closeCreateQuestionModal() {
      this.createQuestionModal = false;
    },
    deleteQuestion() {
      this.$store.dispatch('deleteQuestion', this.questionToDelete)
          .then(() => {
            this.quizToDelete = null;
            this.$store.dispatch('getQuestionsByQuizId')
          });
      this.deleteQuizModal = false;
    },
    editQuestion(item) {
      this.$router.push('/quizzes/' + this.quiz.id + '/questions/' + item.id);
    }
  },
  mounted() {
    this.$store.dispatch('getQuizzes');
  }
}
</script>

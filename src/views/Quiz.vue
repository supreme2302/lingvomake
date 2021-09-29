<!--suppress ALL -->
<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="pa-1">
        <v-card>
          <v-card-title>
            <v-btn icon :to="'/quizzes'">
              <v-icon color="black">mdi-arrow-left</v-icon>
            </v-btn>
          </v-card-title>

          <template v-if="!isFinish">
            <v-card-title class="black--text pl-1 pt-1">
              <div class="font-head pl-3 pt-1">Выберите правильный вариант ответа</div>
            </v-card-title>
            <v-card-title class="ml-5">
              <div class="font-head">{{ questions[currentQuestionIdx].question }}</div>
            </v-card-title>
            <v-card-action>
              <v-radio-group
                  class="ml-5"
                  column
                  v-model="temp"
              >
                <v-radio
                    v-for="(answer, i) in questions[currentQuestionIdx].answers"
                    :label="answer"
                    :value="answer"
                    :key="i"
                    :color="answerColor"
                    @change="checkAnswer(answer)"
                >
                </v-radio>
              </v-radio-group>
            </v-card-action>
          </template>
          <template v-else>
            Вы ответили верно на {{this.correctAnswersCount}} из {{questions.length}}
          </template>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>

export default {
  data() {
    return {
      answerColor: null,
      currentQuestionIdx: null,
      correctAnswersCount: 0,
      isFinish: false,
      temp: null
    }
  },
  methods: {
    checkAnswer(answer) {
      if (this.questions[this.currentQuestionIdx].correctAnswer === answer) {
        this.answerColor = "success";
        ++this.correctAnswersCount;
      } else {
        this.answerColor = "error";
      }
      setTimeout(() => {
        if (this.currentQuestionIdx < this.questions.length - 1) {
          ++this.currentQuestionIdx;
        } else {
          this.isFinish = true;
        }
        this.temp = null;
      }, 1000);
    },
  },
  computed: {
    quiz() {
      return this.$store.getters.quiz;
    },
    questions() {
      return this.$store.getters.quiz.questions;
    }
  },
  mounted() {
    if (this.questions.length > 0) {
      this.currentQuestionIdx = 0;
    }
  }
}
</script>

<style scoped>
.font-head {
  font-size: 1.2em;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}

.font-success {
  font-size: 16px !important;
}

.ma-t12 {
  margin-top: 12px;
}

</style>

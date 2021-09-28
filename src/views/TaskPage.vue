<!--suppress ALL -->
<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6 class="pa-1">
        <v-card>
          <v-card-title>
            <v-btn icon :to="'/unit/' + task.unit_id[0]">
              <v-icon color="black">mdi-arrow-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                flat
                icon style="position: absolute; top:2%; right:2%"
                @click="openDeleteTaskDialog"
            >
              <v-icon color="red" dark>delete</v-icon>
            </v-btn>
          </v-card-title>

          <!--ОТОБРАЖЕНИЕ ПЕРВОГО ТИПА ТАСКА-->
          <template v-if="task.task_type === 1">
            <v-card-title class="black--text pl-1 pt-1">
              <div class="font-head pl-3 pt-1">Выберите правильный вариант ответа</div>
            </v-card-title>
            <v-card-title class="ml-5">
              <div class="font-head">{{ task.data.text }}</div>
            </v-card-title>
            <v-card-action>
              <v-radio-group class="ml-5" column>
                <v-radio
                    v-for="(answer, i) in task.data.answers"
                    :label="answer" :value="answer"></v-radio>
                <v-radio :value="task.data.correct">
                  <template v-slot:label>
                    <strong class="success--text font-success">{{ task.data.correct }}</strong>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-card-action>
          </template>

          <!--ОТОБРАЖЕНИЕ ВТОРОГО ТИПА ТАСКА-->
          <template v-if="task.task_type === 2">
            <v-card-title class="black--text pl-1 pt-1">
              <div class="font-head pl-3 pt-1">
                Расставьте слова в правильном порядке, чтобы перевести предложение
              </div>
            </v-card-title>
            <v-card-title class="ml-3">
              <div class="font-head">{{ task.data.text }}</div>
            </v-card-title>
            <v-card-title>
              <v-text-field
                  :placeholder="task.data.correct"
                  :value="correctT2"
                  label="Solo"
                  solo
                  clearable
                  @click:clear="clearCorrect"
                  hide-details
                  readonly
              ></v-text-field>
            </v-card-title>
            <div class="text-xs-center">
              <v-chip v-for="(word, i) in task.data.words"
                      :key="i"
                      outline
                      :value="wordChips[i]"
                      @click="chipClick(i, word)"
                      color="success">{{ word }}
              </v-chip>
            </div>
          </template>

          <!--ОТОБРАЖЕНИЕ ТРЕТЬЕГО ТИПА ТАСКА-->
          <template v-if="task.task_type === 3"></template>
        </v-card>
      </v-flex>
      <v-flex xs12 hidden-sm-and-up class="mt-2 mb-2">
        <v-divider />
      </v-flex>
      <v-flex xs12 sm6 class="pa1">
        <v-form
            @keyup.enter="onSubmitEditTask"
            v-model="valid"
            ref="form"
            validation>
          <v-container py-0>
            <v-layout wrap>
              <!--ТАСК ПЕРВОГО ТИПА-->
              <template v-if="task.task_type === 1">
                <v-flex xs12>
                  <v-text-field
                      label="Enter question for the task"
                      v-model="taskTextT1"
                      :rules="notEmptyRules"
                  />
                </v-flex>
                <v-flex xs12>
                  <p>Choose amount of answers</p>
                  <v-radio-group v-model="amountOfAnswers" row>
                    <v-radio v-for="n in 3"
                             :key="++n"
                             :label="n.toString()"
                             :value="n"></v-radio>
                  </v-radio-group>
                </v-flex>
                <template v-for="n in Number.parseInt(amountOfAnswers) | parseIntFilter">
                  <v-flex xs12>
                    <v-text-field
                        :label="n.toString() + ' answer'"
                        v-model="answersT1[n]"
                        :rules="notEmptyRules"
                    />
                  </v-flex>
                </template>
                <v-flex xs12>
                  <v-overflow-btn
                      :items="enteredAnswers"
                      label="Choose a correct answer"
                      item-value="id"
                      v-model="correctT1"
                      :rules="notEmptyRules"
                  ></v-overflow-btn>
                </v-flex>
              </template>

              <!--ТАСК ВТОРОГО ТИПА-->
              <template v-if="task.task_type === 2">
                <v-flex xs12>
                  <v-text-field
                      label="Enter sentence for translation"
                      v-model="taskTextT2"
                      :rules="notEmptyRules"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                      label="Enter the translation of the sentence"
                      v-model="editCorrectT2"
                      :rules="notEmptyRules"
                  />
                </v-flex>
              </template>
              <!--ТАСК ТРЕТЬЕГО ТИПА-->
              <template v-if="task.task_type === 3">
                <v-flex xs12>
                  <v-text-field
                      label="Type C" />
                </v-flex>
              </template>
              <v-flex xs12 text-xs-right>
                <v-btn
                    :disabled="!valid"
                    class="mx-0 font-weight-light"
                    color="blue"
                    @click="onSubmitEditTask">
                  Edit
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-flex>
    </v-layout>
    <v-dialog v-model="deleteTaskDialog" persistent max-width="440">
      <v-card>
        <v-card-title class="headline">
          Do you want to delete this task?
        </v-card-title>
        <v-card-text>
          This process is irreversible, you can't restore this task later!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" flat @click="closeDeleteTaskDialog">
            Cancel
          </v-btn>
          <v-btn color="error" flat :loading="loadingToDelete" @click="deleteTask">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<!--
{"id":7,
"name":"Серьезный вопрос",
"task_type":1,
"unit_id":[1],
"dataT1":"{
    \"text\": \"В каком году началась Великая Отечественная Война?\",
    \"answers\": [\"1812\", \"1939\", \"1914\"],
    \"correct\": \"1941\"}",
"dataT2":null,
"dataT3":null}-->
<script>
export default {
  data() {
    return {
      deleteTaskDialog: false,
      valid: false,
      taskTextT1: null,
      notEmptyRules: [
        v => !!v || "The field must not be empty",
      ],
      amountOfAnswers: null,
      answersT1: {
        1: null,
        2: null,
        3: null,
        4: null,
      },
      correctT1: null,

      taskTextT2: null,
      correctT2: '',
      editCorrectT2: '',
      wordChips: {},
      loadingToDelete: false,
    }
  },
  methods: {
    clearCorrect() {
      this.correctT2 = '';
      for (let key in this.wordChips) {
        this.wordChips[key] = true;
      }
    },

    chipClick(wordChipId, word) {
      this.wordChips[wordChipId] = false;
      this.correctT2 += word + ' ';
    },
    onSubmitEditTask() {
      if (this.$refs.form.validate()) {
        console.log('onSubmitEditTask');
        const editedTask = {
          id: this.task.id,
          unit_id: this.task.unit_id,
          task_type: this.task.task_type,
          dataT1: null,
          dataT2: null,
          dataT3: null
        }

        switch (this.task.task_type) {
          case 1:
            /**
             * По негласному соглашению Костяна правильный ответ не должен присутствовать в вариантах ответов!(
             * Поэтому убираем его от туда.
             */
            const ans = this.enteredAnswers.filter(answer => answer !== this.correctT1)
            editedTask.dataT1 = {
              text: this.taskTextT1,
              answers: ans,
              correct: this.correctT1
            }
            break;
          case 2:
            // убираем безумие, введенное пользователем
            this.taskTextT2 = this.taskTextT2
                .replace(/[.,\/#!$%\^&\*;?:{}=\-_`~()]/g, "")
                .replace(/\s{2,}/g, " ")
                .replace(/^\s*/, '')
                .replace(/\s*$/, '');
            this.editCorrectT2 = this.editCorrectT2.replace(/[.,\/#!$%\^&\*;?:{}=\-_`~()]/g, "")
                .replace(/\s{2,}/g, " ")
                .replace(/^\s*/, '')
                .replace(/\s*$/, '')
                .toLowerCase();

            const words = this.editCorrectT2.split(' ').filter(e => e !== '');
            words.sort((a, b) => Math.random() - 0.5); // перемешиваем слова в массиве
            editedTask.dataT2 = {
              text: this.taskTextT2,
              words: words,
              correct: this.editCorrectT2,
            }
            break;
        }
        console.log('editedTask ', editedTask);
        this.$store.dispatch('editTask', editedTask)
            .then(() => {
              this.$store.dispatch('loadSingleTaskById', this.task.id)
            })
      }
    },

    openDeleteTaskDialog() {
      this.deleteTaskDialog = true;
    },
    closeDeleteTaskDialog() {
      this.deleteTaskDialog = false;
    },
    deleteTask() {
      this.loadingToDelete = true;
      this.$store.dispatch('deleteTaskById', {id: this.task.id})
          .then(() => {
            this.deleteTaskDialog = false;
            this.loadingToDelete = false;
            this.$router.push('/unit/' + this.task.unit_id[0]);
          })
          .catch((e) => {
            console.error('error during deleting task: ', e);
            this.deleteTaskDialog = false;
            this.loadingToDelete = false;
          })
    },
  },
  computed: {
    task() {
      return this.$store.getters.task;
    },
    enteredAnswers() {
      let ans = [];
      for (let i = 1; i <= this.amountOfAnswers; ++i) {
        if (this.answersT1[i.toString()]) {
          ans.push(this.answersT1[i.toString()]);
        }
      }
      return ans;
    }
  },

  filters: {
    parseIntFilter(num) {
      return num ? num : 1;
    }
  },

  watch: {
    amountOfAnswers() {
      console.log('watching... amountOfAnswers');
      this.correctT1 = '';
    },
  },

  mounted() {
    const task = this.task;
    if (task.task_type === 1) {
      this.taskTextT1 = task.data.text;
      this.amountOfAnswers = task.data.answers.length + 1;
      for (let i = 0; i < task.data.answers.length; ++i) {
        this.answersT1[i + 1] = task.data.answers[i];
      }
      this.answersT1[this.amountOfAnswers] = task.data.correct;
      this.correctT1 = task.data.correct;
    }
    if (task.task_type === 2) {
      for (let i = 0; i < task.data.words.length; ++i) {
        this.wordChips[i.toString()] = true;
      }
      this.taskTextT2 = task.data.text;
      this.editCorrectT2 = task.data.correct;
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

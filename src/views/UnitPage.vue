<!--suppress ALL -->
<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex
          xs12
          md6
          sm6>
        <material-card>
            <v-card-text class="text-xs-center">
                <h2 class="card-title font-weight-light">{{ unit.unit_name }}</h2>
                <p class="card-description font-weight-light">{{ unit.description }}</p>
                <div class="text-xs-center">
                    <v-chip v-for="(tag, i) in unit.tags"
                            :key="i"
                            outline
                            color="success">{{ tag }}
                    </v-chip>
                </div>
                <v-btn color="main" class="font-weight-light" @click="openEditUnitDialog">EDIT</v-btn>
            </v-card-text>
            <v-btn
                    flat
                    icon style="position: absolute; top:2%; left:2%"
                    :to="'/course/' + unit.course_id"
            >
                <v-icon color="black">mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn
                    flat
                    icon style="position: absolute; top:2%; right:2%"
                    @click="openDeleteUnitDialog"
            >
                <v-icon color="red" dark>delete</v-icon>
            </v-btn>
        </material-card>
      </v-flex>
    </v-layout>
    <br>
    <hr>
    <br>
    <v-layout row wrap justify-center>
      <v-flex xs12>
          <v-tabs
                  centered
                  v-model="tab"
                  color="#eee"
                  grow
                  icons-and-text
          >
              <v-tabs-slider color="grey"></v-tabs-slider>
              <v-tab
                      v-for="type in taskTypes"
                      :key="type"
              >
                  {{ type }}
              </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
              <v-tab-item
                      v-for="type in taskTypes"
                      :key="type"
              >
                  <v-layout row wrap>
                      <v-flex v-for="(task, i) in tasksByType(type)" :key="i" xs12 sm6 md4>
                          <v-card hover class="ma-1"
                                  :to="'/task/' + task.id">
                              <v-card-title primary-title>
                                  <div style="width: 100%">
                                      <div class="headline clip">{{ task.name }}</div>
                                      <div class="grey--text clip">{{ task | question }}</div>
                                  </div>
                              </v-card-title>
                          </v-card>
                          <br>
                      </v-flex>
                  </v-layout>
              </v-tab-item>
          </v-tabs-items>
      </v-flex>
        <v-flex
                xs12
                sm4
                class="ma-3">
            <v-btn fab icon round color="blue" @click="openCreateTaskDialog">
                <v-icon>add</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>

      <v-dialog v-model="deleteUnitDialog" persistent max-width="440">
          <v-card>
              <v-card-title class="headline">
                  Do you want to delete this unit?
              </v-card-title>
              <v-card-text>
                  This process is irreversible, you can't restore this unit later!
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="warning" flat @click="closeDeleteUnitDialog">
                      Cancel
                  </v-btn>
                  <v-btn color="error" flat :loading="loadingToDelete" @click="deleteUnit">
                      Delete
                  </v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
      <v-dialog
              v-model="editUnitDialog"
              max-width="490">
          <material-card
                  color="blue"
                  title="Unit Form"
                  text="Provide unit attributes">
              <v-form
                      @keyup.enter="onSubmitEditUnit"
                      v-model="editUnitValid"
                      ref="editForm"
                      validation>
                  <v-container py-0>
                      <v-layout wrap>
                          <v-flex xs12>
                              <v-text-field
                                      v-model="newUnitName"
                                      :rules="unitNameRules"
                                      label="Unit Name"/>
                          </v-flex>
                          <v-flex xs12>
                              <v-text-field
                                      v-model="newUnitDescription"
                                      :rules="unitDescriptionRules"
                                      label="Unit Description"/>
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
                                      :disabled="!editUnitValid"
                                      @click="onSubmitEditUnit">
                                  Edit
                              </v-btn>
                          </v-flex>
                          <v-flex xs12 text-xs-right>
                          </v-flex>
                      </v-layout>
                  </v-container>
              </v-form>
          </material-card>
      </v-dialog>
      <v-dialog
              v-model="createTaskDialog"
              max-width="700">
          <material-card
                  color="blue"
                  title="Creating Task Form"
                  text="Provide task attributes">
              <v-form
                      @keyup.enter="onSubmitCreateTask"
                      v-model="valid"
                      ref="form"
                      validation>
                  <v-container py-0>
                      <v-layout wrap>
                          <v-flex xs12>
                              <v-overflow-btn
                                      :items="taskTypes"
                                      label="Task Type"
                                      item-value="id"
                                      v-model="taskType"
                                      :rules="notEmptyRules"
                              ></v-overflow-btn>
                          </v-flex>
                          <v-flex xs12>
                              <v-text-field
                                      label="Task Name"
                                      v-model="taskName"
                                      :rules="notEmptyRules"
                              />
                          </v-flex>
                          <!--ТАСК ПЕРВОГО ТИПА-->
                          <template v-if="taskType === taskTypes[0]">
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
                                      <v-radio label="2" value=2></v-radio>
                                      <v-radio label="3" value=3></v-radio>
                                      <v-radio label="4" value=4></v-radio>
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
                          <template v-if="taskType === taskTypes[1]">
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
                                          v-model="correctT2"
                                          :rules="notEmptyRules"
                                  />
                              </v-flex>
                          </template>
                          <!--ТАСК ТРЕТЬЕГО ТИПА-->
                          <template v-if="taskType === taskTypes[2]">
                              <v-flex xs12>
                                  <v-text-field
                                          :rules="notEmptyRules"
                                          label="Type C"/>
                              </v-flex>
                          </template>

                          <v-flex xs12 text-xs-right>
                              <v-btn
                                      :disabled="!valid"
                                      class="mx-0 font-weight-light"
                                      color="blue"
                                      @click="onSubmitCreateTask">
                                  Create
                              </v-btn>
                          </v-flex>
                      </v-layout>
                  </v-container>
              </v-form>
          </material-card>
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
		// свойство для переключения табов
		tab: null,

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
		unitNameRules: [
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
		unitDescriptionRules: [
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
		notEmptyRules: [
		  v => !!v || "The field must not be empty",
		],
		editUnitValid: false,
		valid: false,
		deleteUnitDialog: false,
		loadingToDelete: false,
		editUnitDialog: false,
		createTaskDialog: false,
		newUnitName: '',
		newUnitDescription: '',
		chipModel: [],
		chipSearch: null,
		chipItems: [],

		/**
		 * Типы тасков. Насколько я понимаю могут быть 1,2 или 3.
		 */
		taskTypes: ['Question with answers', 'Translation of a sentence', 'Coming soon...'],
		/**
		 * Выбранный тип таска
		 */
		taskType: null,
		taskName: null,
		taskTextT1: null,
		/**
		 * Выбранное количество вариантов ответов
		 */
		amountOfAnswers: null,
		/**
		 * Варианты ответа. При отправке будут выбираться те, что не пустые
		 */
		answersT1: {
		  1: null,
		  2: null,
		  3: null,
		  4: null,
		},
		correctT1: null,


		taskTextT2: null,
		correctT2: null
	  }
	},
	computed: {
	  unit() {
		return this.$store.getters.unit;
	  },

	  tasks() {
		return this.$store.getters.tasks;
	  },
	  course() {
		return this.$store.getters.course;
	  },

	  /**
	   * Выбираем не пустые варианты ответов перед отправкой
	   */
	  enteredAnswers() {
		let ans = [];
		for (let i = 1; i <= 4; ++i) {
		  if (this.answersT1[i.toString()]) {
			ans.push(this.answersT1[i.toString()]);
		  }
		}
		return ans;
	  }
	},

	methods: {
	  openDeleteUnitDialog() {
		this.deleteUnitDialog = true;
	  },
	  closeDeleteUnitDialog() {
		this.deleteUnitDialog = false;
	  },
	  openEditUnitDialog() {
		this.editUnitDialog = true;
	  },
	  closeEditUnitDialog() {
		this.editUnitDialog = false;
	  },
	  openCreateTaskDialog() {
		this.createTaskDialog = true;
	  },
	  closeCreateTaskDialog() {
		this.createTaskDialog = false;
	  },
	  deleteUnit() {
		this.loadingToDelete = true;
		this.$store.dispatch('deleteUnitById', {id: this.unit.id})
			.then(() => {
			  this.deleteUnitDialog = false;
			  this.loadingToDelete = false;
			  this.$router.push('/course/' + this.unit.course_id);
			})
			.catch((e) => {
			  console.error('error during deleting unit: ', e);
			  this.deleteUnitDialog = false;
			  this.loadingToDelete = false;
			})
	  },

	  onSubmitCreateTask() {
		if (this.$refs.form.validate()) {
		  const type = this.taskTypes.indexOf(this.taskType) + 1; // приводим тип таска к виду: 1, 2 или 3
		  const createdTask = {
			name: this.taskName,
			task_type: this.taskTypes.indexOf(this.taskType) + 1,
			unit_id: [this.unit.id], // указываем юнит, к которому таск будет прикреплен
			dataT1: null,
			dataT2: null,
			dataT3: null
		  }

		  //todo добавить третий тип
		  switch (type) {
			case 1:
			  /**
			   * По негласному соглашению Костяна правильный ответ не должен присутствовать в вариантах ответов!(
			   * Поэтому убираем его от туда.
			   */
			  const ans = this.enteredAnswers.filter(answer => answer !== this.correctT1)
			  createdTask.dataT1 = {
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
			  this.correctT2 = this.correctT2.replace(/[.,\/#!$%\^&\*;?:{}=\-_`~()]/g, "")
				  .replace(/\s{2,}/g, " ")
				  .replace(/^\s*/, '')
				  .replace(/\s*$/, '')
				  .toLowerCase();

			  const words = this.correctT2.split(' ').filter(e => e !== '');
			  words.sort((a, b) => Math.random() - 0.5); // перемешиваем слова в массиве
			  createdTask.dataT2 = {
				text: this.taskTextT2,
				words: words,
				correct: this.correctT2,
			  }
			  break;
		  }
		  console.log('createdTask ', createdTask);
		  this.$store.dispatch('createTask', createdTask)
			  .then(() => {
				this.$store.dispatch('loadTasksByUnitId', this.unit.id)
			  })
			  .finally(() => this.closeCreateTaskDialog())
		}
	  },

	  onSubmitEditUnit() {
		if (this.$refs.editForm.validate()) {
		  console.log('onSubmitEditUnitvaled');
		  const editedUnit = {
			id: this.unit.id,
			unit_name: this.newUnitName,
			description: this.newUnitDescription,
			course_id: this.unit.course_id,
			tags: this.chipModel
		  };
		  console.log('editedUnit ', editedUnit);
		  this.$store.dispatch('changeUnit', editedUnit)
			  .then(() => this.$store.dispatch('loadSingleUnitById', this.unit.id))
			  .finally(() => this.editUnitDialog = false)
		}
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
	  tasksByType(type) {
		return this.tasks.filter(task => task.task_type === this.taskTypes.indexOf(type) + 1);
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
	filters: {
	  /**
	   * Фильтр необходимый для получения текста вопроса из поля dataT{X}, X - тип таска
	   * Фильры во vue работают по типу конвееров в bash. Ничего сложного. Инфа легко гуглтся.
	   */
	  question(task) {
		switch (task.task_type) {
		  case 1:
			return JSON.parse(task.dataT1).text;
		  case 2:
			return JSON.parse(task.dataT2).text;
		  case 3:
			return JSON.parse(task.dataT3).text;
		}
	  },

	  parseIntFilter(num) {
		return num ? num : 1;
	  }
	},

	created() {
	  this.newUnitName = this.unit.unit_name;
	  this.newUnitDescription = this.unit.description;
	  this.chipModel = this.unit.tags;
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

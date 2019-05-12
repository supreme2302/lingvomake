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
        <h4>Groups</h4>
      </v-flex>

      <v-flex xs12>
          <v-card
          >
            <v-btn class="toolbar-items" color="tertiary" @click="loadAllStudents">All groups</v-btn>
            <v-divider vertical></v-divider>
            <template v-for="group in groups">
              <v-btn class="toolbar-items" color="tertiary" @click="loadStudentsByGroup(group.id)">{{group.name}}</v-btn>
            </template>
            <v-spacer></v-spacer>
            <!--<v-divider vertical></v-divider>-->
            <v-btn class="toolbar-items" color="success" @click="studentCreateModal = true">New Student</v-btn>
          </v-card>
        </v-flex>

      <v-flex
          md12
      >
        <material-card
            color="green"
            title="Students table"
            text="You can sort the data by clicking the header"
        >
          <v-data-table
              :headers="headers"
              :items="tableStudents"
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
                to="/"
            >
              <td>{{ item.surname }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.group }}</td>
              <td>{{ item.email }}</td>
              <td>
                <v-btn icon round color="teal">
                  <v-icon @click="studentToEdit = item; editStudentModal = true">edit</v-icon>
                </v-btn>
              </td>
              <td>
                <v-btn icon round color="red">
                  <v-icon @click="deleteStudentModal = true; studentToDelete = item.id">delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>

      <v-dialog max-width="390" v-model="studentCreateModal">
        <material-card
            color="blue"
            title="Student Form"
            text="Provide new student info"
        >
          <v-form
              @keypress.enter="createStudent"
              v-model="studentCreateValid"
              ref="studentCreateForm"
              validation>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                      label="Email"
                      type="email"
                      :rules="emailRules"
                      v-model="studentCreateEmail"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                      label="Name"
                      :rules="textRules"
                      v-model="studentCreateName"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                      label="Surname"
                      :rules="textRules"
                      v-model="studentCreateSurname"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-overflow-btn
                      :items="groupsForDropdown"
                      label="Group"
                      item-value="id"
                      v-model="studentCreateGroupId"
                  ></v-overflow-btn>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                      class="mx-0 font-weight-light"
                      color="blue"
                      :loading="loading"
                      :disabled="!studentCreateValid || loading"
                      @click="createStudent">
                    Create
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-dialog>

      <v-dialog max-width="390" v-model="deleteStudentModal">
        <v-card>
          <v-card-title>
            <span>You are going to delete a student!</span>
          </v-card-title>
          <v-card-text>
            <span>This process is irreversible!</span>
          </v-card-text>
          <v-card-actions>
            <v-btn color="orange" @click="deleteStudentModal = false">cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red" @click="deleteStudent">delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog lazy max-width="390" v-model="editStudentModal">
        <material-card
            color="blue"
            title="Student Form"
            text="Edit student data"
        >
          <v-form
              @keypress.enter="createStudent"
              v-model="studentEditValid"
              ref="studentEditForm"
              validation>

            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                      label="Email"
                      type="email"
                      v-model="studentToEdit.email"
                      :rules="emailRules"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                      label="Name"
                      v-model="studentToEdit.name"
                      :rules="textRules"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                      label="Surname"
                      v-model="studentToEdit.surname"
                      :rules="textRules"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-overflow-btn
                      :items="groupsForDropdown"
                      label="Group"
                      v-model="studentToEdit.group_id[0]"
                  ></v-overflow-btn>
                </v-flex>
                <v-flex xs12>
                  <v-btn
                      :disabled="!studentEditValid || loading"
                      :loading="loading"
                      block
                      color="red"
                      dark
                      @click="restorePassword"
                  >
                    Restore password
                  </v-btn>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                      class="mx-0 font-weight-light"
                      color="blue"
                      :disabled="!studentEditValid || loading"
                      :loading="loading"
                      @click="editStudent">
                    Save
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
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
		  text: 'Surname',
		  value: 'surname'
		},
		{
		  sortable: false,
		  text: 'Name',
		  value: 'name'
		},
		{
		  sortable: true,
		  text: 'Group',
		  value: 'group'
		},
		{
		  sortable: false,
		  text: 'Email',
		  value: 'email'
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

	  emailRules: [
		v => !!v || "E-mail is required",
		v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
	  ],
	  textRules: [
		v => !!v || "This field is required"
	  ],
	  groupRules: [
		v => !!v || "Group is required"
	  ],


	  studentCreateModal: false,
	  studentCreateValid: false,
	  studentCreateEmail: null,
	  studentCreateName: null,
	  studentCreateSurname: null,
	  studentCreateGroupId: null,

	  deleteStudentModal: false,
	  studentToDelete: null,

	  studentEditValid: false,
	  editStudentModal: false,
	  studentToEdit: {
      email: null,
      name: null,
      surname: null,
      group_id: [],
	  },

	}),
	computed: {
	  students() {
		return this.$store.getters.students;
	  },
    tableStudents() {
      let studs = []
      let grs = []
	    this.$store.getters.students.forEach(curr => studs.push(curr))
	    this.$store.getters.groups.forEach(curr => grs.push(curr))
      for (let i = 0; i < studs.length; i++) {
        for (let j = 0; j < grs.length; j++) {
          if (studs[i].group_id[0] == grs[j].id) {
			      studs[i].group = grs[j].name
          }
        }
      }
      return studs;
    },
	  groups() {
		return this.$store.getters.groups;
	  },
	  groupsForDropdown() {
      // return this.$store.getters.groups.map(curr => {
      //   return {text: curr.name, id: curr.id}
      // })
      let grs = []
	    this.$store.getters.groups.forEach((item) => {
	      grs.push({text: item.name, id: item.id})
      })
      return grs;
	  },
	  courses() {
		return this.$store.getters.courses.map(curr => {
		  return {text: curr.name, id: curr.id}
		})
	  },
    loading() {
	    return this.$store.getters.loading;
    }
	},
	methods: {
	  loadAllStudents() {
		this.$store.dispatch('loadStudents')
	  },
	  loadStudentsByGroup(id) {
		this.$store.dispatch('loadStudentsByGroupId', id)
	  },
	  createStudent() {
		if (this.$refs.studentCreateForm.validate()) {
		  const student = {
			email: this.studentCreateEmail,
			name: this.studentCreateName,
			surname: this.studentCreateSurname,
			group_id: [this.studentCreateGroupId],
		  };
		  this.$store.dispatch('createStudent', student)
			  .then(() => {
		      this.$store.dispatch('loadStudents')
		      this.studentCreateModal = false
        })
		}

	  },
	  deleteStudent() {
		if (this.studentToDelete !== null) {
		  this.$store.dispatch('deleteStudent', this.studentToDelete)
			  .then(() => this.$store.dispatch('loadStudents'))
			  .finally(() => this.deleteStudentModal = false);
		  this.studentToDelete = null;
		}
	  },
	  editStudent() {
		if (this.$refs.studentEditForm.validate()) {
		  const gName = this.studentToEdit.group_id[0];
		  let gId = null;
		  for (let i = 0; i < this.groups.length; i++) {
		    if (this.groups[i].name === gName) {
		      gId = this.groups[i].id;
        }
      }
	    this.studentToEdit.group_id[0] = gId;
		  this.$store.dispatch('editStudent', this.studentToEdit)
			  .then(() => this.$store.dispatch('loadStudents'))
			  .finally(() => this.editStudentModal = false);
		}
	  },
    restorePassword() {
	    this.$store.dispatch('restorePassword', this.studentToEdit)
          .then(() => {
            this.$store.dispatch('loadStudents')
                .then(() => this.$store.dispatch('setError', 'Check your new password on your email'))
          })
    }
	}
  }
</script>

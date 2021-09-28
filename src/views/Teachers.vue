<template>
  <v-container>
    <v-layout wrap justify-center>

      <v-flex xs12>
        <v-btn color="success" @click="createTeacherModal = true">New Teacher</v-btn>
      </v-flex>

      <v-flex xs12>
        <material-card
            color="green"
            title="Teachers table"
            text="You can sort the data by clicking the header"
        >
          <v-data-table
              :headers="headers"
              :items="teachers"
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
              <td>{{ item.email }}</td>
              <td>
                <v-btn icon round color="teal">
                  <v-icon @click="teacherToEdit = item; editTeacherModal = true">edit</v-icon>
                </v-btn>
              </td>
              <td>
                <v-btn icon round color="red">
                  <v-icon @click="deleteTeacherModal = true; teacherToDelete = item.id">delete</v-icon>
                </v-btn>
              </td>
            </template>

          </v-data-table>

        </material-card>
      </v-flex>

      <v-dialog v-model="createTeacherModal" max-width="390">
        <material-card
            color="blue"
            title="Teacher Form"
            text="Provide new teacher info">

          <v-form
              @keypress.enter="createTeacher"
              v-model="teacherCreateValid"
              ref="createTeacherForm"
              validation>

            <v-container py-0>
              <v-layout wrap>

                <v-flex xs12>
                  <v-text-field
                      :rules="emailRules"
                      label="Email"
                      type="email"
                      v-model="createTeacherEmail"
                  />
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                      :rules="passwordRules"
                      label="Password"
                      type="password"
                      v-model="createTeacherPassword"
                  />
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                      :rules="confirmRules"
                      label="Confirm password"
                      type="password"
                      v-model="createTeacherPasswordConfirm"
                  />
                </v-flex>

                <v-flex xs12 text-xs-right>
                  <v-btn
                      class="mx-0 font-weight-light"
                      color="blue"
                      :disabled="!teacherCreateValid || loading"
                      @click="createTeacher">
                    Save
                  </v-btn>
                </v-flex>

              </v-layout>
            </v-container>

          </v-form>

        </material-card>
      </v-dialog>

      <v-dialog v-model="editTeacherModal" max-width="390">
        <material-card
            color="orange"
            title="Editing a teacher"
            text="Provide new password">


          <v-form
              @keypress.enter="createTeacher"
              v-model="teacherEditValid"
              ref="editTeacherForm"
              validation>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                      :rules="passwordRules"
                      counter="8"
                      label="Password"
                      type="password"
                      v-model="teacherToEdit.newPassword"
                  />
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                      :rules="confirmEditRules"
                      counter="8"
                      label="Confirm password"
                      type="password"
                      v-model="confirm"
                  />
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>


          <v-card-actions>
            <v-btn color="success" @click="editTeacherModal = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue" @click="editTeacher" :disabled="!teacherEditValid || loading">Edit</v-btn>
          </v-card-actions>

        </material-card>
      </v-dialog>

      <v-dialog v-model="deleteTeacherModal" max-width="390">

        <material-card
            color="red"
            title="Deleting a teacher"
            text="This process is irreversible!">

          <v-card-actions>
            <v-btn color="success" @click="deleteTeacherModal = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red" @click="deleteTeacher">Delete</v-btn>
          </v-card-actions>

        </material-card>

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
        }
      ],
      editTeacherModal: false,
      teacherEditValid: false,
      teacherToEdit: {
        email: '',
        newPassword: ''
      },
      confirm: '',

      deleteTeacherModal: false,
      teacherToDelete: null,

      createTeacherModal: false,
      teacherCreateValid: false,
      createTeacherEmail: null,
      createTeacherPassword: null,
      createTeacherPasswordConfirm: null,

      emailRules: [
        v => !!v || "E-mail is required",
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Too short password"
      ],
      confirmRules: [
        v => !!v || "Confirmation is required",
        v => v === this.createTeacherPassword || "Passwords did not match"
      ],
      confirmEditRules: [
        v => !!v || "Confirmation is required",
        v => v === this.teacherToEdit.newPassword || "Passwords did not match"
      ],
    }


  },
  computed: {
    teachers() {
      return this.$store.getters.teachers;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    createTeacher() {
      if (this.$refs.createTeacherForm.validate()) {
        const teacher = {
          email: this.createTeacherEmail,
          password: this.createTeacherPassword,
        };
        this.$store.dispatch('addTeacher', teacher)
            .then(() => {
              this.$store.dispatch('loadTeachers');
              this.createTeacherModal = false;
            })
            .finally(() => {
              this.createTeacherEmail = null;
              this.createTeacherPassword = null;
              this.createTeacherPasswordConfirm = null;
            })
      }
    },
    editTeacher() {
      if (this.$refs.editTeacherForm.validate()) {
        this.$store.dispatch('editTeacher', this.teacherToEdit)
            .then(() => {
              this.editTeacherModal = false
            })
      }
    },
    deleteTeacher() {
      this.$store.dispatch('deleteTeacher', {id: this.teacherToDelete})
          .then(() => {
            this.$store.dispatch('loadTeachers');
            this.deleteTeacherModal = false;
          })
    }
  }
}
</script>
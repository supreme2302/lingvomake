<template>
  <v-container
      fill-height
      fluid
      grid-list-xl
  >
    <v-layout
        justify-center
        wrap
    >
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
              :items="items"
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
              <td>{{ item.surname }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.group_id }}</td>
              <td>{{ item.phone }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>

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
        text: 'Phone Number',
        value: 'phone'
      }
      ],
      // items: [
      // {
      //   name: 'Dakota Rice',
      //   country: 'Niger',
      //   city: 'Oud-Tunrhout',
      //   salary: '$35,738'
      // },
      // {
      //   name: 'Minerva Hooper',
      //   country: 'Curaçao',
      //   city: 'Sinaai-Waas',
      //   salary: '$23,738'
      // }, {
      //   name: 'Sage Rodriguez',
      //   country: 'Netherlands',
      //   city: 'Overland Park',
      //   salary: '$56,142'
      // }, {
      //   name: 'Philip Chanley',
      //   country: 'Korea, South',
      //   city: 'Gloucester',
      //   salary: '$38,735'
      // }, {
      //   name: 'Doris Greene',
      //   country: 'Malawi',
      //   city: 'Feldkirchen in Kārnten',
      //   salary: '$63,542'
      // }, {
      //   name: 'Mason Porter',
      //   country: 'Chile',
      //   city: 'Gloucester',
      //   salary: '$78,615'
      // }
      // ]
    }),
    computed: {
      items() {
        return this.$store.getters.students;
      }
    }
  }
</script>

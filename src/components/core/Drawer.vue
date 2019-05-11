<!--suppress ALL -->

<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      height="100%">
      <v-layout
        class="fill-height"
        tag="v-list"
        column>
        <v-list-tile class="v-list-item">
          <v-list-tile-title class="title ml-3">
            {{user.email}}
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="link.text"/>
        </v-list-tile>
        <v-spacer/>

        <v-divider/>
        <v-list-tile to="/help" :active-class="color" avatar class="v-list-item">
          <v-list-tile-action>
            <v-icon>help_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="'Help'"/>
        </v-list-tile>
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => ({
    links: [
      // {
      //   to: '/',
      //   icon: 'mdi-component-dashboard',
      //   text: 'Dashboard'
      // },
      // {
      //   to: '/user-profile',
      //   icon: 'mdi-account',
      //   text: 'User Profile'
      // },
      // {
      //   to: '/table-list',
      //   icon: 'mdi-clipboard-outline',
      //   text: 'Table List'
      // },
      // {
      //   to: '/typography',
      //   icon: 'mdi-format-font',
      //   text: 'Typography'
      // },
      // {
      //   to: '/notifications',
      //   icon: 'mdi-bell',
      //   text: 'Notifications'
      // },
      {
        to: '/icons',
        icon: 'mdi-chart-bubble',
        text: 'Icons'
      },
      {
        to: '/courses',
        icon: 'mdi-alpha',
        text: 'Courses'
      },
      {
        to: '/students',
        icon: 'mdi-account-group',
        text: 'Students'
      },
      {
        to: '/groups',
        icon: 'mdi-apps',
        text: 'Groups'
      },
      {
        to: '/teachers',
        icon: 'mdi-account-multiple',
        text: 'Teachers'
      },
      {
        to: '/application',
        icon: 'mdi-android',
        text: 'Application'
      },
    ],
    responsive: false
  }),
  computed: {
	...mapState('app', ['image', 'color']),
    user() {
	    return this.$store.getters.user;
    },
	inputValue: {
	  get () {
		return this.$store.state.app.drawer
	  },
	  set (val) {
		this.setDrawer(val)
	  }
	},
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
	...mapMutations('app', ['setDrawer', 'toggleDrawer']),
	onResponsiveInverted () {
	  if (window.innerWidth < 991) {
		this.responsive = true
	  } else {
		this.responsive = false
	  }
	}
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>

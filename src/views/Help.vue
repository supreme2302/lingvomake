<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 class="hidden-sm-and-up">

        <h1>hidden-sm-and-up</h1>

        <v-parallax
            dark
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            height="80"
        >
          <v-layout
              align-center
              column
              justify-center
          >
            <h1 class="display-1 font-weight-thin mb-3">Course Management</h1>
          </v-layout>
        </v-parallax>

        <v-timeline align-top>
          <v-timeline-item
              v-for="item in items"
              :key="item.header"
              :icon="item.icon"
              color="orange"
              dense
              fill-dot>
            <v-card
                dark>
              <v-card-title class="title">{{ item.header }}</v-card-title>
              <v-card-text class="white text--primary">
                <p class="black--text headline">{{ item.text }}</p>
              </v-card-text>
              <v-img
                  :src="item.imgSrc"
                  aspect-ratio="2.75"
              ></v-img>
            </v-card>
          </v-timeline-item>
        </v-timeline>

        <v-parallax
            dark
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            height="80"
        >
          <v-layout
              align-center
              column
              justify-center
          >
            <h1 class="display-1 font-weight-thin mb-3">Group Management</h1>
          </v-layout>
        </v-parallax>

        <v-timeline align-top>
          <v-timeline-item
              v-for="item in items2"
              :key="item.header"
              :icon="item.icon"
              color="orange"
              fill-dot>
            <v-card
                dark>
              <v-card-title class="title">{{ item.header }}</v-card-title>
              <v-card-text class="white text--primary">
                <p class="black--text headline">{{ item.text }}</p>
              </v-card-text>
              <v-img
                  :src="item.imgSrc"
                  aspect-ratio="2.75"
              ></v-img>
            </v-card>
          </v-timeline-item>
        </v-timeline>

        <v-parallax
            dark
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            height="80"
        >
          <v-layout
              align-center
              column
              justify-center
          >
            <h1 class="display-1 font-weight-thin mb-3">Application Managemen</h1>
          </v-layout>
        </v-parallax>

        <v-timeline align-top>
          <v-timeline-item
              v-for="item in items3"
              :key="item.header"
              :icon="item.icon"
              color="orange"
              fill-dot>
            <v-card
                dark>
              <v-card-title class="title">{{ item.header }}</v-card-title>
              <v-card-text class="white text--primary">
                <p class="black--text headline">{{ item.text }}</p>
              </v-card-text>
              <v-img
                  :src="item.imgSrc"
                  aspect-ratio="2.75"
              ></v-img>
            </v-card>
          </v-timeline-item>
        </v-timeline>

        <hr>

      </v-flex>

      <v-flex xs12 class="hidden-xs-only">

        <h1>hidden-xs-only</h1>

        <v-parallax
            dark
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            height="80"
        >
          <v-layout
              align-center
              column
              justify-center
          >
            <h1 class="display-1 font-weight-thin mb-3">Course Management</h1>
          </v-layout>
        </v-parallax>

        <v-timeline align-top>
          <v-timeline-item
              v-for="item in items"
              :key="item.header"
              :icon="item.icon"
              color="orange"
              fill-dot>
            <v-card
                dark>
              <v-card-title class="title">{{ item.header }}</v-card-title>
              <v-card-text class="white text--primary">
                <p class="black--text headline">{{ item.text }}</p>
              </v-card-text>
              <v-img
                  :src="item.imgSrc"
                  aspect-ratio="2.75"
              ></v-img>
            </v-card>
          </v-timeline-item>
        </v-timeline>

        <v-parallax
            dark
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            height="80"
        >
          <v-layout
              align-center
              column
              justify-center
          >
            <h1 class="display-1 font-weight-thin mb-3">Group Management</h1>
          </v-layout>
        </v-parallax>

        <v-timeline align-top>
          <v-timeline-item
              v-for="item in items2"
              :key="item.header"
              :icon="item.icon"
              color="orange"
              fill-dot>
            <v-card
                dark>
              <v-card-title class="title">{{ item.header }}</v-card-title>
              <v-card-text class="white text--primary">
                <p class="black--text headline">{{ item.text }}</p>
              </v-card-text>
              <v-img
                  :src="item.imgSrc"
                  aspect-ratio="2.75"
              ></v-img>
            </v-card>
          </v-timeline-item>
        </v-timeline>

        <v-parallax
            dark
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            height="80"
        >
          <v-layout
              align-center
              column
              justify-center
          >
            <h1 class="display-1 font-weight-thin mb-3">Application Managemen</h1>
          </v-layout>
        </v-parallax>

        <v-timeline align-top>
          <v-timeline-item
              v-for="item in items3"
              :key="item.header"
              :icon="item.icon"
              color="orange"
              fill-dot>
            <v-card
                dark>
              <v-card-title class="title">{{ item.header }}</v-card-title>
              <v-card-text class="white text--primary">
                <p class="black--text headline">{{ item.text }}</p>
              </v-card-text>
              <v-img
                  :src="item.imgSrc"
                  aspect-ratio="2.75"
              ></v-img>
            </v-card>
          </v-timeline-item>
        </v-timeline>

        <hr>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        icon: 'filter_1',
        header: "Step#1: Add an educational course",
        text: 'Click COURSES then «+» button',
        imgSrc: 'https://lingvomake.ml/static/tip1.jpg'
      },
      {
        icon: 'filter_2',
        header: "Step#2: Add a unit to the course",
        text: 'Click on your COURSE, then ⊕ button',
        imgSrc: 'https://lingvomake.ml/static/tip2.jpg'
      },
      {
        icon: 'filter_3',
        header: "Step#3: Add a task to the unit",
        text: 'Click on your UNIT, then ⊕ button',
        imgSrc: 'https://lingvomake.ml/static/tip3.jpg'
      },
    ],
    items2: [
      {
        icon: 'filter_1',
        header: "Step#1: Create new group",
        text: 'Click GROUPS then «NEW GROUP» button',
        imgSrc: 'https://lingvomake.ml/static/tip4.jpg'
      },
      {
        icon: 'filter_2',
        header: "Step#2: fgsdfg ",
        text: 'Click GROUPS then «NEW GROUP» button',
        imgSrc: 'https://lingvomake.ml/static/tip5.jpg'
      },
      {
        icon: 'filter_3',
        header: "Step#2: sdfgs ",
        text: 'Click GROUPS then «NEW GROUP» button',
        imgSrc: 'https://lingvomake.ml/static/tip6.jpg'
      }
    ],
    items3: [
      {
        icon: 'filter_1',
        header: "Step#1: fill the application form data",
        text: 'just do it ✔︎',
        imgSrc: 'https://lingvomake.ml/static/tip7.jpg'
      },
      {
        icon: 'filter_2',
        header: "Step#2: SAVE changes then GENERATE the app ",
        text: "The order is critical ⚠",
        imgSrc: 'https://lingvomake.ml/static/tip8.jpg'
      }
    ]
  })
}
</script>
/* eslint-disable no-console */
<template>
  <main class="container col-md-12">
    <div class="row">
      <div class="col-12 text-right mb-4">
        <div class="d-flex justify-content-between mt-2">
          <h2>Upcoming Events and Exhibitions</h2>
          <nuxt-link
            v-if="isAuthenticated"
            to="/events/add"
            class="btn btn-md btn-dark ml-2"
            >Upload Event</nuxt-link
          >
        </div>
      </div>
      <div class="row mx-auto">
        <EventCard
          v-for="event in events"
          :key="event.id"
          :event="event"
          class="bounceIn animated card-deck"
        />
      </div>
    </div>
  </main>
</template>
<script>
import { mapGetters } from 'vuex'
import EventCard from '~/components/Events/EventCard'
export default {
  components: {
    EventCard
  },
  async asyncData({ $axios, params }) {
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }
    try {
      const events = await $axios.$get(`events/`, config)
      return { events }
    } catch (e) {
      return { events: [] }
    }
  },
  data() {
    return {
      events: []
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  head() {
    return {
      title: 'Craftspace | Events and Exhibitions'
    }
  }
}
</script>
<style scoped></style>

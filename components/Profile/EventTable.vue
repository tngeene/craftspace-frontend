<template>
  <div class="products-table">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Event Price</th>
          <th scope="col">Date</th>
          <th scope="col">Description</th>
          <th scope="col">Venue</th>
          <th scope="col">Ticket Price</th>
          <th scope="col">Date Uploaded</th>
          <th scope="col"></th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody v-if="events.length > 0">
        <tr v-for="event in events" :key="event.id">
          <td>{{ event.name }}</td>
          <td>{{ event.date }}</td>
          <td>{{ event.description | truncate(15, '...') }}</td>
          <td>{{ event.venue }}</td>
          <td>{{ event.ticket_price }}</td>
          <td>
            {{ event.created_on | moment('MMMM Do YYYY h:mm a') }}
          </td>
          <td>
            <nuxt-link
              :to="`/events/${event.id}/`"
              class="btn btn-sm btn-success"
            >
              View
            </nuxt-link>
          </td>
          <td>
            <nuxt-link
              :to="`/events/${event.id}/edit/`"
              class="btn btn-sm btn-primary"
            >
              Edit
            </nuxt-link>
          </td>
          <td>
            <button
              class="btn btn-sm btn-danger"
              data-toggle="modal"
              data-target="#eventModal"
              @click="modalInfo(event)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="events.length < 1" class="text-center no-content">
      <img class="img-fluid mb-2" src="/img/painter.png" alt="craftspace" />
      <h3>
        Oops! No events uploaded yet, click the button below to add a new event.
      </h3>
    </div>
    <div class="text-center">
      <nuxt-link :to="`/events/add`" class="btn btn-sm btn-primary">
        Add New
      </nuxt-link>
    </div>
    <div
      id="eventModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="eventModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="eventModalLabel" class="modal-title">
              Delete Event
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete {{ selectedEvent.name }}?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">
              Dismiss
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
              @click="deleteEvent(selectedEvent.id)"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EventTable',
  filters: {
    truncate(text, length, suffix) {
      if (text.length > 15) {
        return text.substring(0, length) + suffix
      } else {
        return text
      }
    }
  },
  data() {
    return {
      events: '',
      selectedEvent: ''
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  mounted() {
    this.getMyEvents(this.loggedInUser.id)
  },
  methods: {
    async getMyEvents(id) {
      try {
        const events = await this.$axios.get(`events/?uploaded_by=${id}`)
        this.events = events.data
      } catch (e) {
        return { events: [] }
      }
    },
    async deleteEvent(id) {
      await this.$axios
        .delete(`events/${id}`)
        .then((response) => {
          if (response.status === 204) {
            window.location.reload(true)
            this.$toast.success('Event Successfully Deleted')
          }
        })
        .catch((error) => {
          if (error.response) this.$toast.show(`${error.response.data.detail}`)
        })
    },
    modalInfo(event) {
      this.selectedEvent = event
      // eslint-disable-next-line no-console
      console.log(`selected product is ${this.selectedEvent.id}`)
    }
  }
}
</script>

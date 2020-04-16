<template>
  <div class="card event-card">
    <div class="card-body">
      <nuxt-link
        :to="`/events/${event.id}`"
        class="text-decoration-none text-dark"
      >
        <div class="row no-gutters shadow-sm hover-shadow mb-4">
          <div class="col-md-3">
            <img :src="event.banner" :alt="event.name" class="w-100" />
          </div>
          <div class="col-md-7 p-3 bg-light">
            <h6 class="font-weight-normal text-capitalize">
              {{ event.title }}
            </h6>
            <p class="font-weight-normal text-muted text-transform-none">
              {{ event.description }}
            </p>
            <div class="col text-center bottom-align-text mb-3">
              <nuxt-link
                :to="`/events/${event.id}`"
                class="btn btn-dark text-center text-transform-none px-3"
              >
                Event Details
              </nuxt-link>
            </div>
          </div>
          <div
            class="col-md-2 d-flex align-items-center justify-content-center bg-dark uni_sec"
          >
            <div class="text-white py-4 py-md-0">
              <h3 class="font-weight-normal text-center text-uppercase">
                {{ event.date.get }}
              </h3>
              <p class="font-weight-normal text-center text-uppercase">
                {{ event.date | moment.format('MMMM Do YYYY,') }}
              </p>
              <p class="font-weight-normal text-center">
                {{ event.date }}
              </p>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['event']
}
</script>

<style>
.event-card {
  box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.6);
}
</style>

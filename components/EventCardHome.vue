<template>
  <div class="container event-card-home">
    <div class="row">
      <div class="col-md-4 col-sm-4 mx-auto">
        <img style="width:100%" :src="event.banner" />
      </div>
      <div class="col-md-8 col-sm-8 mx-auto">
        <div class="event-preview">
          <nuxt-link :to="`events/${event.id}`">
            <h2 class="event-title text-dark">
              {{ event.name }}
            </h2>
            <h3 class="event-desciption text-dark">
              <p>{{ event.description }}</p>
            </h3>
          </nuxt-link>
          <p class="post-meta">
            Posted by
            {{ event.uploaded_by.first_name }}
            will be held on {{ event.date | moment('MMMM Do YYYY') }}
          </p>
        </div>
      </div>
      <!-- <div class="col-md-2 col-sm mx-auto">
        <nuxt-link
          :to="`/events/${event.id}/edit/`"
          class="btn btn-sm btn-primary"
        >
          Edit
        </nuxt-link>
      </div> -->
    </div>
    <hr />
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['event']
}
</script>

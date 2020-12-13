<template>
  <header>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <div>
      <FeedbackUploadForm />
    </div>
  </header>
</template>

<script>
import FeedbackUploadForm from '~/components/Feedback/UploadForm'

export default {
  components: {
    FeedbackUploadForm
  },
  head() {
    return {
      title: 'Craftspace | Send Feedback'
    }
  }
}
</script>

<style scoped>
header {
  min-height: 100vh;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 0.4)
    ),
    url('/img/masai.jpg');
  background-position: center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
}
.label {
  color: #fff;
}
.signup-form {
  width: 100% !important;
  overflow: hidden;
}
</style>
<style scoped>
@import '@/assets/signup/css/style.css';
@import '~/assets/signup/fonts/material-icon/css/material-design-iconic-font.min.css';
</style>

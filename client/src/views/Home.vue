<template>
  <div>
    <button @click="showMessageForm = !showMessageForm"
    type="submit" class="btn btn-info mb-3">Create a Message</button>
    <form v-if="showMessageForm" @submit.prevent="addMessage" class="mb-1">
      <fieldset>
        <legend>Create a Message</legend>
        <div class="form-group">
          <label for="username" class="col-lg-2 control-label">Username</label>
          <div class="col-lg-10">
            <input v-model="message.username"
            type="text" class="form-control" id="username" placeholder="Anonymous" required>
          </div>
        </div>
        <div class="form-group">
          <label for="subject" class="col-lg-2 control-label">Subject</label>
          <div class="col-lg-10">
            <input v-model="message.subject" type="subject" class="form-control"
            id="subject" placeholder="Enter a subject for your message." required>
          </div>
        </div>
        <div class="form-group">
          <label for="message" class="col-lg-2 control-label">Message</label>
          <div class="col-lg-10">
            <textarea v-model="message.message" class="form-control" rows="3" id="textArea"
            placeholder="Enter your message." required></textarea>
            <span class="help-block"></span>
          </div>
        </div>
        <div class="form-group">
          <label for="imageURL" class="col-lg-2 control-label">Image URL</label>
          <div class="col-lg-10">
            <input v-model="message.imageURL" type="url" class="form-control"
            id="imageURL" placeholder="Enter an image URL to go with your post. (Optional)">
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-10 col-lg-offset-2">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </fieldset>
    </form>
    <div v-if="error" class="alert alert-dismissible alert-danger">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>Uh oh!</strong> {{error}}
    </div>
    <div class="list-unstyled" v-for="message in reversedMessages" :key="message._id">
      <li class="media">
        <img v-if="message.imageURL" :src="message.imageURL" class="mr-3" :alt="message.subject" />
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{message.username}}</h4>
          <h5 class="mt-0 mb-1">{{message.subject}}</h5>
          {{message.message}}
          <br />
          <small>{{message.created}}</small>
        </div>
      </li>
      <hr>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:3000/messages';

export default {
  name: 'home',
  data: () => ({
    error: '',
    showMessageForm: false,
    messages: [],
    message: {
      username: 'Anonymous',
      subject: '',
      message: '',
      imageURL: '',
    },
  }),
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse();
    },
  },
  mounted() {
    fetch(API_URL).then((response) => response.json().then((result) => {
      this.messages = result;
    }));
  },
  methods: {
    addMessage() {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json',
        },
      }).then((response) => response.json().then((result) => {
        if (result.details) {
          const error = result.details.map((detail) => detail.message).join(' ');
          this.error = error;
        } else {
          this.error = '';
          this.showMessageForm = false;
          this.messages.push(result);
        }
      }));
    },
  },
};
</script>

<style>
hr {
  border-top: 1px solid white;
}
img {
  max-width: 300px;
  float: left;
  padding: 0 20px 20px 0;
}
</style>

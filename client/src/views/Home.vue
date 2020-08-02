<template>
  <div>
    <h1>Full Stack Message Board</h1>
  </div>
</template>

<script>
const API_URL = 'http://localhost:3000/messages';

export default {
  name: 'home',
  mounted() {
    fetch(API_URL).then((response) => response.json().then((result) => {
      console.log(result);
    }));
  },
};
</script>

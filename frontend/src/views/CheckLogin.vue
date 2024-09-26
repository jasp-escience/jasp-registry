<template>
  <div class="profile-container">
    <h1 v-if="isLoggedIn">Welcome, {{ username }}!</h1>
    <h1 v-else>Checking login status...</h1>
    <!-- Button to redirect to /repositories if logged in -->
    <a class="repo-button" v-if="isLoggedIn" href="/repositories">
      <button>Go to Repositories</button>
    </a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isLoggedIn: false,
      username: "",
    };
  },
  mounted() {
    // Call the backend to check login status
    this.checkLoginStatus();
  },
  methods: {
    async checkLoginStatus() {
      try {
        // Send request to backend API to verify JWT in HttpOnly cookie
        const response = await axios.get("/api/v1/auth/check", {
          withCredentials: true,
        });

        if (response.status === 200) {
          this.isLoggedIn = true;
          this.username = response.data.username;
        }
      } catch (error) {
        this.isLoggedIn = false;
        this.$router.push("/"); // Redirect to login page if not authenticated
      }
    },
    goToRepositories() {
      this.$router.push("/repositories");
    },
  },
};
</script>

<style scoped>
.profile-container {
  text-align: center;
  margin-top: 100px;
}

.repo-button button {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.repo-button button:hover {
  background-color: #555;
}
</style>

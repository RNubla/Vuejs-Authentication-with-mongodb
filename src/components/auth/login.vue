<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          @submit.prevent="loginUser"
          style="margin-top: 70px; height: auto; padding-top: 100px !important"
          class="text-center border primary p-5"
        >
          <input
            id="email"
            placeholder="Email"
            v-model="login.email"
            type="text"
            class="fomr-control mb-5"
          />
          <input
            id="password"
            placeholder="Password"
            v-model="login.password"
            type="password"
            class="fomr-control mb-5"
          />
          <p>
            Dont have an account??
            <router-link to="/register">Click Here</router-link>
          </p>
          <center>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Sign In
            </button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.$http.post("/login", this.login);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          swal("Success", "Login successfully", "success");
          this.$router.push("/home");
        }
      } catch (err) {
        swal("Error", "Something went wrong", "error");
        console.log(err.response);
      }
    },
  },
};
</script>

<style>
</style>
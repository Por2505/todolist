<template>
  <div class="bg h-screen">
    <div class="h-full flex justify-center items-center">
      <div class="w-2/5 bg-white shadow rounded-sm z-50">
        <div class="flex justify-center py-8">
          <h1 class="heading-primary">login</h1>
        </div>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(login)">
            <ValidationProvider
              name="username"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="flex justify-center">
                <input
                  type="text"
                  placeholder="Username"
                  v-model="user.username"
                  class="w-10/12 mb-4 shadow px-5 p-2"
                />
              </div>
              <div
                v-if="errors.length > 0"
                class="flex justify-center text-red-500 mb-4 font-normal text-xs"
              >
                <p>{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="username"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="flex justify-center">
                <input
                  type="password"
                  placeholder="Password"
                  v-model="user.password"
                  class="w-10/12 px-5 mb-4 shadow p-2"
                />
              </div>
              <div
                v-if="errors.length > 0"
                class="flex justify-center text-red-500 mb-4 font-normal text-xs"
              >
                <p>{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
            <div class="flex justify-center mb-4">
              <button type="submit">
                <p>Login</p>
              </button>
            </div>
            <div class="flex justify-center mb-8 text-sm">
              <p>
                <span class="text-gray-500">Not registed? </span
                ><span class="text-regis"
                  ><NuxtLink to="/register">Create an account</NuxtLink></span
                >
              </p>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "unAuth",
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    isAccess() {
      return this.$store.getters["auth/getterIsAccess"];
    }
  },
  watch: {
    isAccess(value) {
      if (value) {
        this.$router.go("/");
      }
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch("auth/loginApi", this.user);

      // this.$store.commit("LOGIN", {
      //   username: this.user.username,
      //   password: this.user.password
      // });
    }
  }
};
</script>

<style scoped>
.bg {
  background-image: linear-gradient(
    to right bottom,
    rgba(82, 86, 188, 1),
    rgba(74, 177, 216, 1)
  );
}
input:focus {
  border-bottom: 2px solid #3498db;
  box-shadow: none;
}
button {
  background-color: #00539c;
  padding: 10px 20px;
  border-radius: 3px;
  color: white;
}
.text-regis {
  color: #45789d;
}
.heading-primary {
  font-size: 2.5rem;
  font-weight: 600;
  background-image: linear-gradient(
    to right bottom,
    rgba(82, 86, 188, 1),
    rgba(74, 177, 216, 1)
  );
  -webkit-background-clip: text;
  color: transparent;
  text-transform: uppercase;
}
</style>

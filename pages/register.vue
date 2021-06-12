<template>
  <div class="bg h-screen">
    <div class="h-full flex justify-center items-center">
      <div class="w-2/5 bg-white shadow rounded-sm">
        <div class="flex justify-center py-8">
          <h1 class="heading-primary">sign up</h1>
        </div>
        <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit())">
          <ValidationProvider
            name="firstname"
            rules="required"
            v-slot="{ errors }"
          >
            <div class="flex justify-center text-sm">
              <input
                type="text"
                name=""
                id="firstname"
                placeholder="Firstname"
                v-model="user.firstname"
                class="w-10/12 px-5  mb-6 shadow p-2"
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
            name="lastname"
            rules="required"
            v-slot="{ errors }"
          >
            <div class="flex justify-center text-sm">
              <input
                type="text"
                name=""
                id="lastname"
                placeholder="Lastname"
                v-model="user.lastname"
                class="w-10/12 px-5  mb-6 shadow p-2"
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
            <div class="flex justify-center text-sm">
              <input
                type="text"
                name=""
                id="username"
                placeholder="Username"
                v-model="user.username"
                class="w-10/12 px-5  mb-6 shadow p-2"
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
            rules="confirmed:confirmation"
            v-slot="{ errors }"
          >
            <div class="flex justify-center">
              <input
                type="password"
                name=""
                id=""
                placeholder="Set your password"
                v-model="user.setPassword"
                class="w-10/12 px-5 mb-6 shadow p-2"
              />
            </div>
            <div
              v-if="errors.length > 0"
              class="flex justify-center text-red-500 mb-4 font-normal text-xs"
            >
              <p>{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" vid="confirmation">
          <div class="flex justify-center">
            <input
              type="password"
              name=""
              id="password"
              v-model="user.confrimPassword"
              placeholder="Confirm your password"
              class="w-10/12 px-5 mb-6 shadow p-2"
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
              <p>Sign Up</p>
            </button>
          </div>
          <div class="flex justify-center text-sm mb-8">
            <p>
              <span class="text-gray-500">If you have an account click </span
              ><span class="text-regis"
                ><NuxtLink to="/login">Here</NuxtLink></span
              >
              <span class="text-gray-500">to login. </span>
            </p>
          </div>
        </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
import { ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationProvider
  },
  middleware: 'unAuth',
  data() {
    return {
      user: {
        firstname: "",
        lastname: "",
        username:"",
        setPassword: "",
        confrimPassword: ""
      },
      submitted: false
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("register/registerApi", this.user);
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

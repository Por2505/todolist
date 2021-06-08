<template>
  <div class="bg h-screen">
    <div class="h-full flex justify-center items-center">
      <div class="w-3/5 bg-white shadow rounded-sm">
        <div class="flex justify-center py-8">
          <h1 class="heading-primary">sign up</h1>
        </div>
        <form action="">
          <div class="flex justify-center">
            <input
              type="text"
              name=""
              id=""
              placeholder="Fullname"
              class="w-2/5 mb-8 shadow px-5 p-2 mr-5"
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="Lastname"
              class="w-2/5 mb-8 shadow px-5 p-2"
            />
          </div>
          <div class="flex justify-center">
            <input
              type="email"
              name=""
              id=""
              placeholder="Email Address"
              class="w-10/12 px-5 mb-8 shadow p-2"
            />
          </div>
          <div class="flex justify-center">
            <input
              type="password"
              name=""
              id=""
              placeholder="Set you password"
              class="w-10/12 px-5 mb-8 shadow p-2"
            />
          </div>
          <div class="flex justify-center mb-4">
            <button type="submit">
              <p>Sign Up</p>
            </button>
          </div>
          <div class="flex justify-center text-sm mb-8">
            <p>
              <span class="text-gray-500">If you have an account click </span
              ><span><a href="#" class="text-regis">Here</a></span>
              <span class="text-gray-500">to login. </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
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

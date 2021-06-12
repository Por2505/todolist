<template>
  <div>
    <div class="topnav">
      <div class="topnav-right">
        <div class="item-list">Welcome, {{ userData.firstname }}</div>
        <div class="item-list">
          <i
            @click="logout"
            class="icon fas fa-sign-out-alt cursor-pointer"
          ></i>
        </div>
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        user_id: 0,
        firstname: "-",
        lastname: "-"
      }
    };
  },
  computed: {
    username() {
      return this.$store.getters["auth/gettersUsername"];
    }
  },
  watch: {
    username(value) {
      this.userData = value;
    }
  },
  created() {
    // this.$store.dispatch("auth/getUsernameFromApi");
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.go("/login");
    }
  }
};
</script>

<style scoped>
.topnav {
  position: absolute;
  overflow: hidden;
  width: 100%;
  right: 8rem;
  top: 1.5rem;
}

.item-list {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav-right {
  float: right;
}

.icon {
  font-size: 1.5rem;
}
</style>

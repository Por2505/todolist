const accessToken = localStorage.getItem("accessToken");
console.log(accessToken)
export const state = () => ({
  is_access: false,
  username: {
    user_id: 0,
    firstname: '',
    lastname: '',
  },
});

export const mutations = {
  SET_ACCESS(state, data) {
    state.is_access = data;
  },
  SET_USERNAME_FROM_API(state, data) {
    state.username = data;
  }
};

export const actions = {
  async loginApi(state, payload) {
    await this.$axios
      .$post(
        "/api/login",
        {
          username: payload.username,
          password: payload.password
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(res => {
        console.log(res);
        if (res) {
          console.log(res.token)
          localStorage.setItem("accessToken", res.token);
          state.commit("SET_ACCESS", true);
        }
      })
      .catch(error => {
        alert("username or password Incorrect");
      });
  },
  async getUsernameFromApi(state, payload) {
    await this.$axios
      .$get("/api/account", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(res => {
        state.commit("SET_USERNAME_FROM_API", res);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
export const getters = {
  getterIsAccess: state => state.is_access,
  gettersUsername: state => state.username,
};

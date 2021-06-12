export const state = () => ({
  });
  
  export const mutations = {};
  
  export const actions = {
    registerApi(state, payload) {
      console.log(payload)
      this.$axios.$post(
        "/api/register",
        {
          username: payload.username,
          password: payload.setPassword,
          firstname: payload.firstname,
          lastname: payload.lastname
        },
        { headers: { "Content-Type": "application/json" } }
      ).then(res=>{
        //redirect
        alert("Register Successfully ")
        this.$router.replace('/login')
        console.log(res);
      })
      .catch(error=>{
        console.log(error)
        alert("There are users")
      })
      
    }
  };
  export const getters = {
    //getterLogIn: state => state.login
  };
  
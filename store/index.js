import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export const store = new Vuex.Store({
  state:{
    todos: [
      { content: "drink coffee", is_checked: true, is_edited: false },
      { content: "eat breakkie", is_checked: false, is_edited: false },
      { content: "check e-mail", is_checked: false, is_edited: false },
      { content: "eat", is_checked: false, is_edited: false },
      { content: "do some work", is_checked: false, is_edited: false }
    ]
  },
  mutations:{
    ADD_TASK(state, payload) {
      console.log("add")
      state.todos.push(payload);
    },
    REMOVE_TASK(state,payload) {
      Vue.delete(state.todos,payload.index)
    }

  },
  actions:{
    ADD_TODO(context){
      console.log("action")
      context.commit('ADD_TASK');
    }
  }
})





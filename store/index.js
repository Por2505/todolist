const accessToken = localStorage.getItem("accessToken");

export const state = () => ({
  // Store , State Variable
  todos: []
});

export const mutations = {
  // Mutate DATA berfore save as state
  SET_TASK_FROM_API(state, data) {
    let mutantData=[]
    if(data!== null){
      let mutantData = data.map(thing => {
        return (thing = {
          task_id: thing.task_id,
          content: thing.content,
          is_checked: thing.is_checked,
          is_edited: false
        });
    
    });
    state.todos = mutantData;
    }
  },

  TOGGLE_EDIT_TASK(state, payload) {
    let status = state.todos[payload].is_edited;
    if (status) {
      state.todos[payload].is_edited = false;
    } else {
      state.todos[payload].is_edited = true;
    }
  },

  INPUT_EDIT_TASK(state, payload) {
    state.todos.map((thing, index) => {
      if (!payload.status_check) {
        if (payload.task_index === index) {
          thing.is_edited = true;
        } else {
          thing.is_edited = false;
        }
      } else {
        thing.is_edited = false;
      }
    });
  },
  CLOSE_TASK(state, payload) {
    state.todos[payload].is_edited = false;
  }
};

export const actions = {
  // Create Function of Methods for Business Logic
  getToDoListFromAPI(state, payload) {
    
    this.$axios
      .$get(`/api/dashboard/${payload.user_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(res => {
        state.commit("SET_TASK_FROM_API", res.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  async addTodoToApi(state, payload) {
    console.log(payload.newtodos)
    let newTodos = payload.newtodos.map(todo => {
      return {
        content: todo.content,
        is_checked: todo.is_checked
      };
    });

    await this.$axios.$post(`/api/dashboard/${payload.user_id}`,
      {
        data: newTodos
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
  },
  async deleteTodoToApi(state, payload) {
    console.log(payload)
    await this.$axios.$delete("api/dashboard/" + payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  },
};

export const getters = {
  // Get Value & Secure Data on State
  getterToDoList: state => state.todos
};

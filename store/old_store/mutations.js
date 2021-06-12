export default {
  ADD_TASK(state, payload) {
    console.log(payload);
    state.todos.push(payload);
  },
  REMOVE_TASK(state, payload) {
    state.todos.splice(payload, 1);
  },
  TOGGLE_CHECK_TASK(state, payload) {
    let status = state.todos[payload].is_checked;
    if (status) {
      state.todos[payload].is_checked = false;
    } else {
      state.todos[payload].is_checked = true;
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
  EDIT_TASK(state, payload) {
    state.todos.splice(payload.index, 1, payload.newEdit);
  },
  INPUT_EDIT_TASK(state, payload) {
    state.todos.map((thing, index) => {
      if (payload.task_index === index) {
        thing.is_edited = true;
      } else {
        thing.is_edited = false;
      }
    });
  },
  CLOSE_TASK(state, payload) {
    state.todos[payload].is_edited = false;
  }
}

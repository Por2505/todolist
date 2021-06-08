<template>
  <div class="bg h-screen">
    <div class="h-full flex justify-center">
      <div class="w-2/5">
        <!-- Title -->
        <div class="text-center">
          <h1 class="p-20 text-white text-5xl">To Do List</h1>
        </div>

        <!-- Input -->
        <form class="pb-10 flex" action="" @submit.prevent="addTodo">
          <input
            class="w-full p-3 shadow rounded-full px-10"
            type="text"
            name=""
            id=""
            v-model="todo"
          />
          <button type="submit" class="ml-2">
            <i class="icon fas fa-plus"></i>
          </button>
        </form>

        <!-- Output List : Task -->
        <div
          v-for="(todo, index) in todos"
          :key="index"
          class="mt-4 text-center"
        >
          <div
            class="flex justify-between items-center bg-white leading-none rounded-full p-3 shadow text-teal text-base"
          >
            <div class="w-full flex items-center">
              <div v-if="!todo.is_edited">
                <div
                  @click="toggleCheckTask(index)"
                  class="cursor-pointer bg-green-600 text-white rounded-full h-6 px-2 flex justify-center items-center"
                >
                  <i class="fas fa-check"></i>
                </div>
              </div>
              <div v-else>
                <div
                  @click="editTask(index)"
                  class="cursor-pointer bg-green-600 text-white rounded-full h-6 px-2 flex justify-center items-center"
                >
                  <i class="fas fa-check-double"></i>
                </div>
              </div>

              <div>
                <div v-if="!todo.is_edited">
                  <input
                    type="text"
                    :class="
                      `${todo.is_checked ? 'text-completed' : ''} mx-5 task`
                    "
                    @click="inputEditTodo(index)"
                    v-model="todo.content"
                    @keypress.enter="editTask(index)"
                  />
                </div>
                <div v-else>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="mx-5"
                    v-bind:placeholder="todo.content"
                    v-model="edit"
                    @keypress.enter="editTask(index)"
                  />
                </div>
              </div>
            </div>
            <div v-if="todo.is_edited">
              <div
                class="cursor-pointer bg-red-600 text-white rounded-full h-6 px-2 flex justify-center items-center"
                @click="closeTodo(index)"
              >
                <i class="fas fa-times"></i>
              </div>
            </div>
            <div v-else>
              <div
                class="cursor-pointer bg-red-600 text-white rounded-full h-6 px-2 flex justify-center items-center"
                @click="removeTodo(index)"
              >
                <i class="fas fa-trash-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Workspace -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      todo: "",
      edit: "",
      todos: [
      { content: "drink coffee", is_checked: true, is_edited: false },
      { content: "eat breakkie", is_checked: false, is_edited: false },
      { content: "check e-mail", is_checked: false, is_edited: false },
      { content: "eat", is_checked: false, is_edited: false },
      { content: "do some work", is_checked: false, is_edited: false }
    ]

    };
  },

  // computed: {
  //   todos(){
  //       return this.$store.state.todos
  //     } 
  // },
  watch: {
    todos(value) {
      console.log(value);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.inputEdit;
    });
  },
  methods: {
    // State Management
    inputEditTodo(task_index) {
      return this.todos.map((thing, index) => {
        if (task_index === index) {
          thing.is_edited = true;
        } else {
          thing.is_edited = false;
        }
      });
    },
    addTodo() {
      this.$store.dispatch('ADD_TODO');
      let newtodo = {
        content: this.todo,
        is_checked: false,
        is_edited: false
      };
      if (this.todo) {
        this.todos.push(newtodo);
        console.log(this.newtodo);
        this.todo = "";
      }
    },
    // Controller
    closeTodo(index){
      this.todos[index].is_edited =false;

    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleCheckTask(index) {
      console.log("check : " + this.todos[index].is_checked);
      let status = this.todos[index].is_checked;
      if (status) {
        this.todos[index].is_checked = false;
      } else {
        this.todos[index].is_checked = true;
      }
    },
    toggleEdit(index) {
      console.log("edit : " + this.todos[index].is_edited);
      let status = this.todos[index].is_edited;
      if (status) {
        this.todos[index].is_edited = false;
      } else {
        this.todos[index].is_edited = true;
      }
    },
    editTask(task_index) {
      let newEdit = {
        content: this.edit,
        is_checked: false,
        is_edited: false
      };
      if (this.edit !== '') {
        this.todos.splice(task_index, 1, newEdit)
        this.edit = "";
      }
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

input {
  border: none;
}
button {
  background-color: #64c5eb;
  padding: 10px 15px;
  border-radius: 50%;
  color: white;
}

.icon {
  font-size: 1.5rem;
}

.text-completed {
  text-decoration: line-through;
  color: #808080;
}

input:focus {
  outline: none;
}
</style>

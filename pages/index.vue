<template>
  <div class="bg">
    <!-- Finish Loading -->
    <div>
      <div class="h-full flex justify-center pb-20">
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

          <div class="calc-height overflow-auto">
            <div
            v-for="(todo, todo_index) in todos"
            :key="todo.task_id"
            class="mt-4 text-center"
          >
            <div v-if="todo.is_checked"></div>
            <div
              class="flex justify-between items-center bg-white leading-none rounded-full p-3 shadow text-teal text-base"
            >
              <div class="w-full flex items-center ">
                <div v-if="!todo.is_edited">
                  <div
                    @click="toggleCheckTask(todo_index)"
                    class="cursor-pointer bg-green-600 text-white rounded-full h-6 px-2 flex justify-center items-center"
                  >
                    <i class="fas fa-check"></i>
                  </div>
                </div>
                <div v-else>
                  <div
                    @click="editTask(todo_index)"
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
                      @click="inputEditTodo(todo_index)"
                      v-model="todo.content"
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
                      @keypress.enter="editTask(todo_index)"
                    />
                  </div>
                </div>
              </div>
              <div v-if="todo.is_edited">
                <div
                  class="cursor-pointer bg-red-600 text-white rounded-full h-6 px-2 flex justify-center items-center"
                  @click="closeTodo(todo_index)"
                >
                  <i class="fas fa-times"></i>
                </div>
              </div>
              <div v-else>
                <div v-if="!todo.is_checked">
                  <div
                    class="cursor-pointer bg-red-600 text-white rounded-full h-6 px-2 flex justify-center items-center"
                    @click="removeTodo(todo.task_id)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </div>
                </div>
                <div v-else>
                    <div
                    class=" bg-red-600 text-white rounded-full h-6 px-2 flex justify-center items-center"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>


          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: "navLayout",
  middleware: "isAuth",
  data() {
    return {
      // MODEL
      todo: "",
      edit: ""
    };
  },

  computed: {
    todos() {
      return this.$store.getters["getterToDoList"];
    }
  },
  async created() {
    this.isPageLoading = true;
    await this.getUserID();
    await this.getToDoList();
  },
  methods: {
    async getUserID() {
      await this.$store.dispatch("auth/getUsernameFromApi");
    },
    // State Management
    async getToDoList() {
      await this.$store.dispatch("getToDoListFromAPI", {
        user_id: this.$store.getters["auth/gettersUsername"].user_id
      });
    },
    async inputEditTodo(task_index) {
      let status_check = this.todos.is_checked;
      return await this.$store.commit("INPUT_EDIT_TASK", {
        task_index: task_index,
        status_check: status_check
      });
    },
    async addTodo(mode) {
      let newtodo = {
        content: this.todo,
        is_checked: false,
        is_edited: false
      };
      let newtodos = [...this.todos, newtodo];
      if (this.todo) {
        await this.$store.dispatch("addTodoToApi", { newtodos: newtodos,user_id: this.$store.getters["auth/gettersUsername"].user_id });
        await this.getToDoList();
      }
      this.todo = "";
    },
    // Controller
    async closeTodo(index) {
      await this.$store.commit("CLOSE_TASK", index);
    },
    async removeTodo(task_id) {
      await this.$store.dispatch("deleteTodoToApi", task_id);
      await this.getToDoList();
    },

    async toggleCheckTask(task_index) {
      let newToDoList = this.todos.map((thing, index) => {
        if (index == task_index) {
          return (thing = {
            content: thing.content,
            is_checked: !thing.is_checked
          });
        } else {
          return thing;
        }
      });

      await this.$store.dispatch("addTodoToApi", { newtodos: newToDoList ,user_id: this.$store.getters["auth/gettersUsername"].user_id});
      await this.getToDoList();
    },
    async toggleEdit(index) {
      await this.$store.commit("TOGGLE_EDIT_TASK", index);
    },
    async editTask(task_index) {
      let editToDoList = this.todos.map((thing, index) => {
        if (index == task_index) {
          return (thing = {
            content: this.edit,
            is_checked: thing.is_checked
          });
        } else {
          return thing;
        }
      });

      if (this.edit) {
        await this.$store.dispatch("addTodoToApi", { newtodos: editToDoList,user_id: this.$store.getters["auth/gettersUsername"].user_id });
        await this.getToDoList();
      }

      this.edit = "";
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
  height: 100vh;
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
.last-item:last-child {
  margin-bottom: 10rem;
}

.calc-height {
  height: 500px;
}
</style>

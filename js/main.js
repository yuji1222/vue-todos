(function() {
  'use strict';



  var vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: [],
      days: '',
    },
    watch: {
      todos: {
        handler: function() {
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
      }
    },
    mounted: function() {
     this.todos = JSON.parse(localStorage.getItem('todos')) || [];
     let now = new Date();
     let year = now.getFullYear();
     let month = now.getMonth()+1;
     let day = now.getDate();
     this.days = year + "/" + month + "/" + day;
   },
    methods: {
      addItem: function() {
        var item = {
          title: this.newItem,
          isDone: false
        };
        this.todos.push(item);
        this.newItem = '';
      },
      deleteItem: function(index) {
        if (confirm('このタスクを消しますか?')){
            this.todos.splice(index, 1);
        }
      },
      purge: function() {
        if (!confirm('完了したタスクを消しますか?')) {
          return;
        }
        this.todos = this.remaining;
      }
    },
    computed: {
      remaining: function() {
          return this.todos.filter(function(todo) {
          return !todo.isDone;
        });
      }
    }
  });
})();

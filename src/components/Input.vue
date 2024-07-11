<script>
import players from "@/players/players.js";
import debounce from "lodash/debounce";

export default {
  name: "Input",
  data() {
    return {
      players,
      searchTerm: "",
      filteredPlayers: [],
      selectedIndex: -1,
      possibleNames: [
        "Alfa",
        "Beta",
        "Charlie",
        "Delta",
        "Echo",
        "Foxtrot",
        "Golf",
        "India",
      ],
      validInput: true,
    };
  },
  created() {
    this.debouncedFilterPlayers = debounce(this.filterPlayers, 300);
  },
  methods: {
    onInputChange() {
      if (this.searchTerm.length >= 3 || this.searchTerm.length === 0) {
        this.debouncedFilterPlayers();
      } else {
        this.filteredPlayers = [];
      }
    },
    async filterPlayers() {
      if (!/^[a-zA-Z]*$/.test(this.searchTerm)) {
        this.validInput = false;
        this.filteredPlayers = [];
        return;
      }
      this.validInput = true;

      this.filteredPlayers = this.players
        .filter((player) =>
          player.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
        .slice(0, 10);

      this.selectedIndex = -1;
    },
    handleKeyDown(event) {
      if (event.key === "ArrowDown") {
        this.selectedIndex =
          (this.selectedIndex + 1) % this.filteredPlayers.length;
      } else if (event.key === "ArrowUp") {
        this.selectedIndex =
          (this.selectedIndex - 1 + this.filteredPlayers.length) %
          this.filteredPlayers.length;
      } else if (event.key === "Enter" && this.selectedIndex >= 0) {
        this.selectPlayer(this.filteredPlayers[this.selectedIndex]);
      }
    },
    selectPlayer(player) {
      const currentRoute = this.$route;
      const newRoute = { name: "player", params: { name: player } };

      if (
        currentRoute.name !== newRoute.name ||
        currentRoute.params.name !== newRoute.params.name
      ) {
        this.$router.push(newRoute);
      }
    },
  },
  watch: {
    searchTerm() {
      this.onInputChange();
    },
  },
};
</script>

<template>
  <div class="page">
    <div class="input">
      <input
        class="input-search"
        type="search"
        placeholder="Введите имя игрока"
        v-model="searchTerm"
        @keydown="handleKeyDown"
        @input="onInputChange"
      />
    </div>

    <ul v-if="filteredPlayers.length && validInput" class="suggestions">
      <li
        v-for="(player, index) in filteredPlayers"
        :key="index"
        :class="{ selected: index === selectedIndex }"
        @click="selectPlayer(player)"
      >
        {{ player }}
      </li>
    </ul>
    <div class="suggestions-box">
      <h3>Возможные имена:</h3>
      <ul>
        <li v-for="(name, index) in possibleNames" :key="index">{{ name }}</li>
      </ul>
    </div>
    <div v-if="!validInput" class="error-message">
      Введите только буквы английского алфавита.
    </div>
  </div>
</template>

<style scoped>
.input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-search {
  width: 30%;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-search:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.6);
}

.suggestions {
  list-style-type: none;
  padding: 0;
  margin: 10px 0 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 30%;
}

.suggestions li {
  padding: 10px;
  cursor: pointer;
}

.suggestions li.selected {
  background-color: #007bff;
  color: white;
}

.suggestions-box {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  position: absolute;
  right: 20px;
  top: 0;
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.suggestions-box h3 {
  margin-top: 0;
  font-size: 14px;
}

.suggestions-box ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.suggestions-box li {
  padding: 5px 0;
  font-size: 14px;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>

import React, { useState } from 'react';
import AddToList from './components/AddToList';
import List from "./components/List"

export interface IState {
  people: {
    name: string,
    age: number,
    url: string,
    note?: string
  }[]
}

function App() {

  const [people, setPeople] = useState<IState["people"]>([
    {
      name: "LeBron James",
      url: "https://imgr.search.brave.com/5nnX3EWNTgeiWrRnNW5ELb4LiyhMk25JGb1TBqJUskQ/fit/1200/1200/no/1/aHR0cHM6Ly9jZWxl/YnJpdHlpbnNpZGVy/Lm9yZy93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMS8wMi8xOTEw/MTgtbGVicm9uLWph/bWVzLWV3LTUzOHBf/OTg2OGMxNmE4Y2E5/ZWY0M2RmN2M0MDE0/ZjJkYTEzMGYuanBn",
      age: 36,
      note: "This is a note about a player"
    }
  ])

  return (
    <div>
      <h1>People Invited to my Party</h1>      
      <List people={people} />
      <AddToList setPeople={setPeople} />
    </div>
  );
}

export default App;

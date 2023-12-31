import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Header from './components/Header.jsx';
import TodoItem from './components/TodoItem.jsx';
import AddTodo from './components/AddTodo.jsx';

export default function App () {
  const [text, setText] = useState ('');
  const [todos, setTodos] = useState ([
    {
      text: 'Watch football',
      id: '1',
    },
    {
      text: 'Play video games',
      id: '2',
    },
    {
      text: 'Code using RN language',
      id: '3',
    },
  ]);
  const [error, setError] = useState ('');

  // Add text function
  const addTodoHandler = text => {
    setText (text);
  };

  // Handle delete function
  const handleDelete = id => {
    setTodos (prevTodos => prevTodos.filter (todo => todo.id != id));
  };

  // submit new todo function
  const submitHandler = text => {
    if (text.length < 4) {
      setError ("Characters can't be less than 4");
      Alert.alert ('Oops!', "Characters can't be less than 4", [{text: 'OK'}]);
    } else {
      setTodos (prevTodos => [
        ...prevTodos,
        {text: text, id: Math.random ().toString ()},
      ]);
      setError ('');
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss ();
      }}
    >
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo
            submitHandler={submitHandler}
            addTodoHandler={addTodoHandler}
            text={text}
          />
          <Text style={styles.error}>{error}</Text>
          <View style={styles.list}>
            <Text style={styles.title}>Todo Items</Text>
            <FlatList
              data={todos}
              renderItem={({item}) => (
                <TodoItem item={item} handleDelete={handleDelete} />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 25,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  list: {
    flex: 1,
    paddingVertical: 10,
    marginBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
});

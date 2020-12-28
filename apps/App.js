import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, StatusBar, StyleSheet, View} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

var db = openDatabase({name: 'TodoList.db'});

const App = () => {
  // todos: {id: 1, textValue: 'todoitem', checked: true/false }
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    tableSet();
    listView();
  }, []);

  function tableSet() {
    db.transaction(function (txn) {
      txn.executeSql(
        `SELECT name
           FROM sqlite_master
          WHERE type='table' AND name='table_todo'`,
        [],
        function (tx, res) {
          console.log(`table: ${res.rows.length}`);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_todo');
            txn.executeSql(
              `CREATE TABLE table_todo (
                id	INTEGER PRIMARY KEY AUTOINCREMENT,
                content	TEXT NOT NULL,
                checked	INTEGER NOT NULL
              )`,
              [],
            );
            console.log('table regen');
          }
        },
      );
    });
  }

  function listView() {
    console.log('SELECT * 문 수행');
    db.transaction((txn) => {
      txn.executeSql('SELECT * FROM table_todo', [], (tx, res) => {
        console.log(`record number : ${res.rows.length}`);
        var temp = [];
        for (var i = 0; i < res.rows.length; ++i) {
          temp.push(res.rows.item(i));
        }
        setTodos(temp);
      });
    });
  }

  // 할일 목록 추가
  const addTodo = (text) => {
    db.transaction(function (txn) {
      txn.executeSql(
        `INSERT INTO table_todo
                (content, checked)
         VALUES (?, 0)`,
        [text],
        function (tx, res) {
          console.log(`res : ${res.rowsAffected}`);
          if (res.rowsAffected) {
            console.log('INSERT 성공');
          } else {
            console.log('INSERT 성공');
          }
        },
      );
    }, []);
    listView();
  };

  function onRemove(id) {
    console.log(`App / delete id => ${id}`);
    db.transaction(function (txn) {
      txn.executeSql('DELETE FROM table_todo WHERE id = ?', [id], (tx, res) => {
        console.log(`res : ${res.rowsAffected}`);
        if (res.rowsAffected) {
          console.log('DELETE 성공');
        } else {
          console.log('DELETE 실패');
        }
      });
    });
    listView();
  }

  const onToggle = (id, checked) => {
    console.log(`App / toggle id => ${id}`);
    console.log(`App / toggle checked => ${checked}`);

    db.transaction(function (txn) {
      if (checked === 1) {
        txn.executeSql(
          'UPDATE table_todo SET checked = 0 WHERE id = ?',
          [id],
          function (tx, res) {
            console.log(`res: ${res.rowsAffected}`);
            if (res.rowsAffected) {
              console.log('UPDATE 성공');
            } else {
              console.log('UPDATE 실패');
            }
          },
        );
      } else {
        txn.executeSql(
          'UPDATE table_todo SET checked = 1 WHERE id = ?',
          [id],
          function (tx, res) {
            console.log(`res: ${res.rowsAffected}`);
            if (res.rowsAffected) {
              console.log('UPDATE 성공');
            } else {
              console.log('UPDATE 실패');
            }
          },
        );
      }
    });
    listView();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text children="Todo List" style={styles.appTitle} />
        <View style={styles.card}>
          <TodoInsert onAddTodo={addTodo} />
          <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b3b3',
  },
  appTitle: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
});

export default App;

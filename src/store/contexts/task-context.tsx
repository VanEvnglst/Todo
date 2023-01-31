import React, { createContext, useContext, useState } from 'react';


const TaskContext = createContext({
  tasks: {},
  updateTaskCount: () => {},
});

export const ToDoContext = ({ children }) => {
  const [tasks, setTasks] = useState(
    {
      totalTasks: 0,
      totalPriority: 0,
      totalCompleted: 0,
    }
  );

  const updateTaskCount = () => {
    console.log('update task count called');

  }

  return (
    <TaskContext.Provider 
      value={{ tasks, updateTaskCount}}>
        {children}
    </TaskContext.Provider>
  )
}

export const useTaskCount = () => {
  const ctx = useContext(TaskContext);

  console.log('ctx', ctx)
  return ctx;
}
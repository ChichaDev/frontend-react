import { useCallback, useEffect, useState } from "react";
import { useIsMounted } from "./use-is-mounted";

//  Оболочка над useState, которая внутри проверяет находится ли user на странице
//  и решает обновлять стейт или нет

export function useSafeState<S>(initialValue: (() => S) | S) {
  const [value, setValue] = useState(initialValue);

  const isMounted = useIsMounted();

  const setState = useCallback((newValue: React.SetStateAction<S>) => {
    if (!isMounted.current) {
      return;
    }
    setValue(newValue);
  }, []);

  return [value, setState] as const;
}

interface TodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export function UseSafeStateExample() {
  const [items, setItems] = useSafeState<TodoItem[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((items) => {
        setItems(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}

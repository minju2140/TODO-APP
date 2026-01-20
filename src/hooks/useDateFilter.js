import { useMemo } from 'react';
import { 
  isToday, 
  isThisWeek, 
  isFuture, 
  parseISO, 
  startOfWeek, 
  endOfWeek,
  isAfter,
  isBefore,
  startOfDay
} from 'date-fns';

export function useDateFilter(todos, category, selectedFolderId) {
  const filteredTodos = useMemo(() => {
    let filtered = [...todos];

    // Filter by folder if selected
    if (selectedFolderId && selectedFolderId !== 'all') {
      filtered = filtered.filter(todo => todo.folderId === selectedFolderId);
    }

    // Filter by category (date)
    if (category === 'today') {
      filtered = filtered.filter(todo => {
        if (!todo.dueDate) return false;
        try {
          const dueDate = parseISO(todo.dueDate);
          return isToday(dueDate);
        } catch {
          return false;
        }
      });
    } else if (category === 'week') {
      filtered = filtered.filter(todo => {
        if (!todo.dueDate) return false;
        try {
          const dueDate = parseISO(todo.dueDate);
          const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
          const weekEnd = endOfWeek(new Date(), { weekStartsOn: 0 });
          return isAfter(dueDate, weekStart) && isBefore(dueDate, weekEnd);
        } catch {
          return false;
        }
      });
    } else if (category === 'later') {
      filtered = filtered.filter(todo => {
        if (!todo.dueDate) return true; // No due date = later
        try {
          const dueDate = parseISO(todo.dueDate);
          const weekEnd = endOfWeek(new Date(), { weekStartsOn: 0 });
          return isAfter(dueDate, weekEnd);
        } catch {
          return true;
        }
      });
    }
    // 'all' category shows everything (no additional filtering)

    // Sort by due date (earliest first), then by creation date
    filtered.sort((a, b) => {
      // Completed todos go to the bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      // If both have due dates, sort by date
      if (a.dueDate && b.dueDate) {
        const dateA = new Date(a.dueDate + (a.dueTime ? `T${a.dueTime}` : 'T00:00'));
        const dateB = new Date(b.dueDate + (b.dueTime ? `T${b.dueTime}` : 'T00:00'));
        return dateA - dateB;
      }

      // Items with due dates come before items without
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;

      // If neither has a due date, sort by creation date (newest first)
      return b.createdAt - a.createdAt;
    });

    return filtered;
  }, [todos, category, selectedFolderId]);

  return filteredTodos;
}

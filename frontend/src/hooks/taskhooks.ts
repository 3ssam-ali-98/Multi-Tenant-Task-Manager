"use client";

import { useCallback, useEffect, useState} from "react";
import { extractErrorMessage } from "@/lib/extractErrorMessage";
import { getTaskDetails, getTasks,  } from "@/services/taskService";
import { Task } from "@/types/task";

export function useTasks(organizationId: number) {

  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {

      try {

        setLoading(true);

        setError("");

        const data = await getTasks(organizationId);

        setTasks(data);

      } catch (error) {

        setError(extractErrorMessage(error));

      } finally {

        setLoading(false);
      }

    }, [organizationId]);

  useEffect(() => {
// eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();

  }, [fetchTasks]);

  return {
    tasks,

    loading,

    error,

    refetch: fetchTasks
  };
}

export function useTask(organizationId: number, taskId: number) {

    const [task, setTask] = useState<Task | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const fetchTask = useCallback(async () => {
        if (!organizationId || !taskId) return;
        try {

          setLoading(true);

          setError("");

          const data = await getTaskDetails(organizationId, taskId);

          setTask(data);

        } catch (error) {

          setError(extractErrorMessage(error));

        } finally {

          setLoading(false);
        }

      }, [organizationId, taskId]);
      

    useEffect(() => {
// eslint-disable-next-line react-hooks/set-state-in-effect
      fetchTask();
    }, [fetchTask]);

    return {
      task,

      loading,

      error,

      refetch: fetchTask,
    };
  }
import type {
  AssignmentJson,
  GroupingJson,
  PairingJson,
  ShortAnswerJson,
} from '@/types/tasks';
import { apiClient } from '../clients';
export interface Assignment {
  classroom_id: number;
  password?: string;
}

export interface Task {
  task_type_id: number;
  task_title: string;
  task_description?: string;
  // ide jöhetnek a specifikus mezők:
  assignment?: AssignmentJson;
  short_answer?: ShortAnswerJson;
  pairing?: PairingJson;
  grouping?: GroupingJson;
  [key: string]: any;
}

export interface WorksheetInfo {
  title: string | null;
  subject_id: number |null;
  lifetime_minutes: number|null;
  max_time_to_resolve_minutes: number |null;
  max_points: number |null;
  is_public: number |null;
  assignments: Assignment[] |null;
  tasks: Task[];
}
export const uploadWorksheet = async (worksheet: WorksheetInfo) => {
  try {
    const response = await apiClient.post('/worksheets', worksheet, {
      _authRequired: true,
    } as any);

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

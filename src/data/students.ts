import type { StudentRecord } from '../types/student'
import records from './students.json'

/** Raw graduate roster — portrait URLs built from `studentPortraitUrl` (GitHub synthesis repo). */
export const studentData: StudentRecord[] = records as StudentRecord[]

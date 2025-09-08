// export type Json =
//   | string
//   | number
//   | boolean
//   | null
//   | { [key: string]: Json }
//   | Json[]

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          id: number
          task: string | null
          is_complete: boolean | null
          inserted_at: string
        }
        Insert: {
          id?: never
          inserted_at?: never
          is_complete?: boolean | null
          task?: string | null
        }
        Update: {
          id?: never
          inserted_at?: never
          is_complete?: boolean | null
          task?: string | null
        }
      }
    }
  }
}
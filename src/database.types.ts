export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      heroes: {
        Row: {
          age: string | null
          alter_ego: string
          backstory: string | null
          color: string
          description: string | null
          gender: string
          id: number
          name: string
          power: string
        }
        Insert: {
          age?: string | null
          alter_ego?: string
          backstory?: string | null
          color?: string
          description?: string | null
          gender?: string
          id?: number
          name?: string
          power?: string
        }
        Update: {
          age?: string | null
          alter_ego?: string
          backstory?: string | null
          color?: string
          description?: string | null
          gender?: string
          id?: number
          name?: string
          power?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


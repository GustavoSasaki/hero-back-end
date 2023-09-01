export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      heroes: {
        Row: {
          alter_ego: string
          gender: string
          id: number
          name: string
          power: string
        }
        Insert: {
          alter_ego?: string
          gender?: string
          id?: number
          name?: string
          power?: string
        }
        Update: {
          alter_ego?: string
          gender?: string
          id?: number
          name?: string
          power?: string
        }
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


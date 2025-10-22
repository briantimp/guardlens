export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Functions: {
      acknowledge_alert: {
        Args: {
          alert_id: string;
          actor_id: string;
          note?: string;
        };
        Returns: {
          id: string;
          status: string;
          acknowledged_at: string;
        };
      };
      detect_guard_anomalies: {
        Args: {
          target_org_id?: string;
        };
        Returns: {
          alert_id: string;
          alert_type: Database["public"]["Enums"]["alert_type"];
        }[];
      };
      get_org_security_summary: {
        Args: {
          target_org_id: string;
        };
        Returns: {
          open_alerts: number;
          users_without_mfa: number;
          stale_accounts: number;
          security_score: number;
          last_ingested_at: string | null;
        };
      };
      refresh_security_scores: {
        Args: {
          target_org_id?: string;
        };
        Returns: {
          org_id: string;
          security_score: number;
        }[];
      };
    };
    Enums: {
      alert_status: "open" | "acknowledged" | "resolved";
      alert_type:
        | "new_country_login"
        | "new_device_login"
        | "failed_login_spike"
        | "mfa_disabled";
      event_type: "login_success" | "login_failure";
      member_risk_tier: "low" | "medium" | "high";
    };
    Tables: {
      alerts: {
        Row: {
          acknowledged_at: string | null;
          acknowledged_by: string | null;
          alert_type: Database["public"]["Enums"]["alert_type"];
          created_at: string;
          detected_at: string;
          id: string;
          metadata: Json | null;
          org_id: string;
          org_member_id: string | null;
          resolved_at: string | null;
          resolution_note: string | null;
          status: Database["public"]["Enums"]["alert_status"];
        };
        Insert: {
          acknowledged_at?: string | null;
          acknowledged_by?: string | null;
          alert_type: Database["public"]["Enums"]["alert_type"];
          created_at?: string;
          detected_at?: string;
          id?: string;
          metadata?: Json | null;
          org_id: string;
          org_member_id?: string | null;
          resolved_at?: string | null;
          resolution_note?: string | null;
          status?: Database["public"]["Enums"]["alert_status"];
        };
        Update: {
          acknowledged_at?: string | null;
          acknowledged_by?: string | null;
          alert_type?: Database["public"]["Enums"]["alert_type"];
          created_at?: string;
          detected_at?: string;
          id?: string;
          metadata?: Json | null;
          org_id?: string;
          org_member_id?: string | null;
          resolved_at?: string | null;
          resolution_note?: string | null;
          status?: Database["public"]["Enums"]["alert_status"];
        };
        Relationships: [
          {
            columns: ["org_member_id"];
            referencedColumns: ["id"];
            referencedRelation: "org_members";
          },
          {
            columns: ["org_id"];
            referencedColumns: ["id"];
            referencedRelation: "orgs";
          }
        ];
      };
      device_fingerprints: {
        Row: {
          created_at: string;
          fingerprint: string;
          id: string;
          label: string | null;
          org_id: string;
          org_member_id: string;
          trusted: boolean;
        };
        Insert: {
          created_at?: string;
          fingerprint: string;
          id?: string;
          label?: string | null;
          org_id: string;
          org_member_id: string;
          trusted?: boolean;
        };
        Update: {
          created_at?: string;
          fingerprint?: string;
          id?: string;
          label?: string | null;
          org_id?: string;
          org_member_id?: string;
          trusted?: boolean;
        };
        Relationships: [
          {
            columns: ["org_member_id"];
            referencedColumns: ["id"];
            referencedRelation: "org_members";
          },
          {
            columns: ["org_id"];
            referencedColumns: ["id"];
            referencedRelation: "orgs";
          }
        ];
      };
      login_events: {
        Row: {
          client_ip: string | null;
          country_code: string | null;
          created_at: string;
          device_fingerprint: string | null;
          event_type: Database["public"]["Enums"]["event_type"];
          id: number;
          metadata: Json | null;
          org_id: string;
          org_member_id: string | null;
          raw_event_id: string | null;
          source: string | null;
        };
        Insert: {
          client_ip?: string | null;
          country_code?: string | null;
          created_at?: string;
          device_fingerprint?: string | null;
          event_type: Database["public"]["Enums"]["event_type"];
          id?: number;
          metadata?: Json | null;
          org_id: string;
          org_member_id?: string | null;
          raw_event_id?: string | null;
          source?: string | null;
        };
        Update: {
          client_ip?: string | null;
          country_code?: string | null;
          created_at?: string;
          device_fingerprint?: string | null;
          event_type?: Database["public"]["Enums"]["event_type"];
          id?: number;
          metadata?: Json | null;
          org_id?: string;
          org_member_id?: string | null;
          raw_event_id?: string | null;
          source?: string | null;
        };
        Relationships: [
          {
            columns: ["org_member_id"];
            referencedColumns: ["id"];
            referencedRelation: "org_members";
          },
          {
            columns: ["org_id"];
            referencedColumns: ["id"];
            referencedRelation: "orgs";
          }
        ];
      };
      org_members: {
        Row: {
          active: boolean;
          created_at: string;
          email: string;
          external_id: string | null;
          id: string;
          last_login_at: string | null;
          last_login_ip: string | null;
          last_login_location: string | null;
          mfa_state: "enabled" | "disabled" | "pending";
          org_id: string;
          primary_role: string | null;
          risk_tier: Database["public"]["Enums"]["member_risk_tier"];
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          email: string;
          external_id?: string | null;
          id?: string;
          last_login_at?: string | null;
          last_login_ip?: string | null;
          last_login_location?: string | null;
          mfa_state?: "enabled" | "disabled" | "pending";
          org_id: string;
          primary_role?: string | null;
          risk_tier?: Database["public"]["Enums"]["member_risk_tier"];
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          email?: string;
          external_id?: string | null;
          id?: string;
          last_login_at?: string | null;
          last_login_ip?: string | null;
          last_login_location?: string | null;
          mfa_state?: "enabled" | "disabled" | "pending";
          org_id?: string;
          primary_role?: string | null;
          risk_tier?: Database["public"]["Enums"]["member_risk_tier"];
          updated_at?: string;
        };
        Relationships: [
          {
            columns: ["org_id"];
            referencedColumns: ["id"];
            referencedRelation: "orgs";
          }
        ];
      };
      orgs: {
        Row: {
          created_at: string;
          google_customer_id: string | null;
          id: string;
          last_ingested_at: string | null;
          name: string;
          security_score: number;
          slack_channel: string | null;
          status: "trial" | "active" | "suspended";
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          google_customer_id?: string | null;
          id?: string;
          last_ingested_at?: string | null;
          name: string;
          security_score?: number;
          slack_channel?: string | null;
          status?: "trial" | "active" | "suspended";
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          google_customer_id?: string | null;
          id?: string;
          last_ingested_at?: string | null;
          name?: string;
          security_score?: number;
          slack_channel?: string | null;
          status?: "trial" | "active" | "suspended";
          updated_at?: string;
        };
        Relationships: [];
      };
      slack_webhooks: {
        Row: {
          channel_label: string;
          created_at: string;
          id: string;
          is_active: boolean;
          org_id: string;
          webhook_url: string;
        };
        Insert: {
          channel_label: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          org_id: string;
          webhook_url: string;
        };
        Update: {
          channel_label?: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          org_id?: string;
          webhook_url?: string;
        };
        Relationships: [
          {
            columns: ["org_id"];
            referencedColumns: ["id"];
            referencedRelation: "orgs";
          }
        ];
      };
    };
    Views: {
      org_security_overview: {
        Row: {
          mfa_coverage: number | null;
          monthly_failed_logins: number | null;
          open_alerts: number | null;
          org_id: string | null;
          security_score: number | null;
          total_active_users: number | null;
          users_without_mfa: number | null;
        };
        Relationships: [];
      };
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName]["Row"]
  : Database["public"]["Tables"][PublicTableNameOrOptions]["Row"];

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName]["Insert"]
  : Database["public"]["Tables"][PublicTableNameOrOptions]["Insert"];

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName]["Update"]
  : Database["public"]["Tables"][PublicTableNameOrOptions]["Update"];

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : Database["public"]["Enums"][PublicEnumNameOrOptions];

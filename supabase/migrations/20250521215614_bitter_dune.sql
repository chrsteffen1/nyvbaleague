/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `role` (text)
      - `created_at` (timestamp)
    - `standings`
      - `id` (uuid, primary key)
      - `division` (text)
      - `team_name` (text)
      - `wins` (integer)
      - `losses` (integer)
      - `points_for` (integer)
      - `points_against` (integer)
      - `updated_at` (timestamp)
    - `scores`
      - `id` (uuid, primary key)
      - `match_date` (date)
      - `division` (text)
      - `team1_name` (text)
      - `team2_name` (text)
      - `team1_score` (integer)
      - `team2_score` (integer)
      - `created_at` (timestamp)
      - `created_by` (uuid, references users.id)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on role
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

-- Create standings table
CREATE TABLE IF NOT EXISTS standings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  division text NOT NULL,
  team_name text NOT NULL,
  wins integer DEFAULT 0,
  losses integer DEFAULT 0,
  points_for integer DEFAULT 0,
  points_against integer DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(division, team_name)
);

-- Create scores table
CREATE TABLE IF NOT EXISTS scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_date date NOT NULL,
  division text NOT NULL,
  team1_name text NOT NULL,
  team2_name text NOT NULL,
  team1_score integer NOT NULL,
  team2_score integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for standings table
CREATE POLICY "Anyone can read standings"
  ON standings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only admins can modify standings"
  ON standings
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create policies for scores table
CREATE POLICY "Anyone can read scores"
  ON scores
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only admins can create scores"
  ON scores
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Only admins can modify scores"
  ON scores
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );
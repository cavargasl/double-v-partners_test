import { type UserDTO } from "./userDTO"

export type RepoDTO = {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: UserDTO
  html_url: string
  description: string | null
  fork: boolean
  url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  forks_count: number
  archived: boolean
  disabled: boolean
  open_issues_count: number
  allow_forking: boolean
  visibility: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  topics: string[]
}

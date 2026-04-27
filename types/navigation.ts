export interface NavItem {
  label: string
  href: string
  external?: boolean
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterGroup {
  title: string
  links: FooterLink[]
}

export interface LegalLink {
  label: string
  href: string
  description?: string
}

import type { FooterGroup } from '@/types/navigation'

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: 'Plans',
    links: [
      { label: 'Starter — $35/mo',    href: '/plans/starter' },
      { label: 'Core — $42/mo',       href: '/plans/core' },
      { label: 'Unlimited — $55/mo',  href: '/plans/unlimited' },
      { label: 'Ultra — $70/mo',      href: '/plans/ultra' },
      { label: 'Compare all plans',   href: '/plans' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Recharge',      href: '/recharge' },
      { label: 'Activate eSIM', href: '/activate' },
      { label: 'Sign in',       href: '/login' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Centre',          href: '/support' },
      { label: 'Getting Started',      href: '/support/sign-up-and-activation' },
      { label: 'eSIM and Devices',     href: '/support/esim-and-devices' },
      { label: 'Billing and Payments', href: '/support/plans-billing-and-payments' },
      { label: 'Troubleshooting',      href: '/support/troubleshooting-and-service-recovery' },
      { label: 'Coverage',             href: '/support/network-coverage-and-speeds' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy',        href: '/legal/privacy' },
      { label: 'Terms of Service',      href: '/legal/terms' },
      { label: 'Fair Use Policy',       href: '/legal/fair-use' },
      { label: 'Complaints Policy',     href: '/legal/complaints' },
      { label: 'Critical Info Summary', href: '/legal/cis' },
    ],
  },
]

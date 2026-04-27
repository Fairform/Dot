import type { NavItem, QuickLink } from '@/types/navigation'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Plans',    href: '/plans' },
  { label: 'Coverage', href: '/coverage' },
  { label: 'Support',  href: '/support' },
]

export const NAV_ACTION_ITEMS: NavItem[] = [
  { label: 'Recharge', href: '/recharge' },
  { label: 'Activate', href: '/activate' },
]

export const SUPPORT_QUICK_LINKS: QuickLink[] = [
  { label: 'Get started',             href: '/support/sign-up-and-activation/how-to-sign-up' },
  { label: 'Install your eSIM',       href: '/support/esim-and-devices/how-to-install-your-esim' },
  { label: 'Transfer your number',    href: '/support/sign-up-and-activation/keep-your-number' },
  { label: 'Troubleshoot activation', href: '/support/troubleshooting-and-service-recovery/esim-not-activating' },
  { label: 'Billing help',            href: '/support/plans-billing-and-payments/how-billing-works' },
  { label: 'Coverage help',           href: '/support/network-coverage-and-speeds/check-coverage-in-your-area' },
]

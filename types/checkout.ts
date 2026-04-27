export type OrderStatus = 'pending' | 'processing' | 'esim_provisioning' | 'active' | 'failed'
export type PortStatus  = 'not_requested' | 'pending' | 'complete' | 'failed'

export interface Order {
  id: string
  created_at: string
  stripe_session_id: string
  stripe_subscription_id: string | null
  plan_key: string
  first_name: string
  last_name: string
  email: string
  date_of_birth: string
  address: string
  keep_number: boolean
  current_number: string | null
  current_provider: string | null
  status: OrderStatus
  port_status: PortStatus
  port_id: string | null
  esim_qr_url: string | null
  esim_activation_code: string | null
  error_message: string | null
}

export interface CheckoutFormState {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  address: string
  keepNumber: boolean
  currentNumber: string
  currentProvider: string
  esimConfirmed: boolean
  termsConfirmed: boolean
}

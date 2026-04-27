/**
 * lib/carrier.ts — Abstracts all MVNE/carrier API calls.
 * Update BASE_URL and auth once Telcoinabox or PWN credentials are confirmed.
 */
const BASE_URL = process.env.TELCOINABOX_API_URL ?? 'https://api.telcoinabox.com.au/v1'
const API_KEY  = process.env.TELCOINABOX_API_KEY ?? ''

function headers() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
    'X-Api-Version': '2024-01',
  }
}

export interface ProvisionESIMResult {
  iccid: string; qrCodeUrl: string; activationCode: string; status: 'active' | 'pending'
}
export interface PortNumberResult {
  portId: string; status: 'pending' | 'processing' | 'complete' | 'failed'; estimatedCompletionDate: string | null
}

export async function provisionESIM(params: {
  orderId: string; planKey: string; firstName: string; lastName: string
  email: string; dateOfBirth: string; address: string
}): Promise<ProvisionESIMResult> {
  const res = await fetch(`${BASE_URL}/esim/provision`, {
    method: 'POST', headers: headers(),
    body: JSON.stringify({
      external_id: params.orderId, plan: params.planKey,
      subscriber: { first_name: params.firstName, last_name: params.lastName, email: params.email, dob: params.dateOfBirth, address: params.address },
    }),
  })
  if (!res.ok) throw new Error(`Carrier provisioning failed: ${res.status}`)
  const d = await res.json()
  return { iccid: d.iccid, qrCodeUrl: d.qr_code_url, activationCode: d.activation_code, status: d.status }
}

export async function requestNumberPort(params: {
  orderId: string; currentNumber: string; currentProvider: string
  firstName: string; lastName: string; dateOfBirth: string
}): Promise<PortNumberResult> {
  const res = await fetch(`${BASE_URL}/porting/request`, {
    method: 'POST', headers: headers(),
    body: JSON.stringify({
      external_id: params.orderId, donor_number: params.currentNumber,
      donor_provider: params.currentProvider,
      subscriber: { first_name: params.firstName, last_name: params.lastName, dob: params.dateOfBirth },
    }),
  })
  if (!res.ok) throw new Error(`Port request failed: ${res.status}`)
  const d = await res.json()
  return { portId: d.port_id, status: d.status, estimatedCompletionDate: d.estimated_completion ?? null }
}

import type { PlanDefinition, FeatureRow } from '@/types/plans'
import Icon from '@/components/ui/Icon'

interface Props { plans: PlanDefinition[]; features: FeatureRow[] }

function Cell({ value }: { value: string | boolean | null }) {
  if (value === true)  return <Icon name="check" size={16} className="text-dot-black mx-auto" />
  if (value === false) return <span className="text-dot-grey-300 text-lg leading-none block">—</span>
  if (value === null)  return <span className="text-dot-grey-300 text-sm">—</span>
  return <span className="text-sm text-dot-black">{value}</span>
}

export default function PlanComparisonTable({ plans, features }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-sm border-collapse">
        <thead>
          <tr className="border-b border-dot-grey-150">
            <th className="text-left py-3 px-4 text-dot-grey-400 font-medium w-[36%]" />
            {plans.map(plan => (
              <th key={plan.key} className="py-3 px-4 text-center">
                <span className={`font-semibold ${plan.featured ? 'text-dot-black' : 'text-dot-grey-500'}`}>
                  {plan.name}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((row, i) => (
            <tr key={row.feature}
              className={`border-b border-dot-grey-150 ${i % 2 === 0 ? '' : 'bg-dot-grey-100'}`}>
              <td className="py-3 px-4 text-dot-black font-medium">{row.feature}</td>
              {plans.map(plan => (
                <td key={plan.key} className={`py-3 px-4 text-center ${
                  plan.featured ? 'bg-dot-blue-light/30' : ''
                }`}>
                  <div className="flex justify-center">
                    <Cell value={row[plan.key as keyof typeof row] as string | boolean | null} />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

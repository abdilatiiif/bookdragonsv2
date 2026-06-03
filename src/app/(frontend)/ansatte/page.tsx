import Reservasjoner from '@/components/admin/Reservasjoner'
import LeggTilBok from '@/components/admin/LeggTilBok'

function AnsattSiden() {
  return (
    <div className="px-4 py-24">
      <section className="flex w-full mx-auto justify-between rounded-xl border border-black/10 bg-white p-6 shadow-sm">
        <Reservasjoner />
        <LeggTilBok />
      </section>
    </div>
  )
}

export default AnsattSiden

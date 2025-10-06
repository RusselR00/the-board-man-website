import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Services | THE BOARD MAN',
  description: 'Professional tax services in Dubai, UAE. VAT registration, corporate tax, and tax compliance solutions.',
}

export default function TaxPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Tax Services</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Comprehensive tax services to ensure compliance with UAE tax regulations and optimize your tax position.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">VAT Registration</h3>
                <p>Complete VAT registration services and ongoing compliance support.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Corporate Tax</h3>
                <p>Corporate tax planning, preparation, and compliance services.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Tax Planning</h3>
                <p>Strategic tax planning to minimize tax liabilities and maximize savings.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Tax Compliance</h3>
                <p>Ensuring full compliance with all UAE federal and emirate-level tax requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
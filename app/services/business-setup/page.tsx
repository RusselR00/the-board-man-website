import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Setup Services | THE BOARD MAN',
  description: 'Professional business setup services in Dubai, UAE. Company formation, licensing, and business registration.',
}

export default function BusinessSetupPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Business Setup Services</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Complete business setup and company formation services in Dubai and across the UAE.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Company Formation</h3>
                <p>Comprehensive company formation services including LLC, FZE, and FZCO setup.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Trade License</h3>
                <p>Assistance with obtaining commercial, professional, and industrial trade licenses.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Free Zone Setup</h3>
                <p>Expert guidance for setting up businesses in UAE free zones.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Bank Account Opening</h3>
                <p>Support with corporate bank account opening and documentation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
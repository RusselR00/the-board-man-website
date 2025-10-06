import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | THE BOARD MAN',
  description: 'Common questions about our accounting, auditing, tax, and business setup services in Dubai, UAE.',
}

export default function FAQPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
          
          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">What services do you offer?</h3>
              <p>We provide comprehensive accounting, auditing, tax, and business setup services in Dubai and across the UAE.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">Do you assist with VAT registration?</h3>
              <p>Yes, we provide complete VAT registration services and ongoing compliance support for businesses in the UAE.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">How long does company formation take?</h3>
              <p>Company formation typically takes 3-7 business days depending on the type of company and jurisdiction chosen.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold mb-4">What is your experience in the UAE market?</h3>
              <p>We have extensive experience serving businesses across various sectors in the UAE, ensuring compliance with local regulations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
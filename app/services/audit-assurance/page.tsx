import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Audit & Assurance Services | THE BOARD MAN',
  description: 'Professional audit and assurance services in Dubai, UAE. Independent auditing, compliance, and risk assessment.',
}

export default function AuditAssurancePage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Audit & Assurance Services</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Independent audit and assurance services to enhance the credibility of your financial information.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">External Audit</h3>
                <p>Independent examination of financial statements in accordance with international standards.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Internal Audit</h3>
                <p>Comprehensive review of internal controls and operational processes.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Risk Assessment</h3>
                <p>Identification and evaluation of business risks and control weaknesses.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Compliance Review</h3>
                <p>Ensuring adherence to regulatory requirements and industry standards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
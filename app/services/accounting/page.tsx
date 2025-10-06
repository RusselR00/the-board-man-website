import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accounting Services | THE BOARD MAN',
  description: 'Professional accounting services in Dubai, UAE. Bookkeeping, financial statements, and accounting solutions for businesses.',
}

export default function AccountingPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Accounting Services</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Professional accounting services tailored to your business needs in Dubai, UAE.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Bookkeeping</h3>
                <p>Accurate and timely recording of financial transactions for your business.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Financial Statements</h3>
                <p>Professional preparation of balance sheets, income statements, and cash flow statements.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Management Reporting</h3>
                <p>Detailed financial reports to help you make informed business decisions.</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Financial Analysis</h3>
                <p>In-depth analysis of your financial performance and recommendations for improvement.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
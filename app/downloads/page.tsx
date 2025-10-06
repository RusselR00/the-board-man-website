import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Downloads | THE BOARD MAN',
  description: 'Download important forms, guides, and resources for accounting and business services in Dubai, UAE.',
}

export default function DownloadsPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Downloads</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-muted-foreground mb-8">
              Download important forms, guides, and resources to help with your business needs.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">VAT Registration Guide</h3>
                <p className="mb-4">Complete guide to VAT registration in the UAE.</p>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Download PDF</button>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Company Formation Checklist</h3>
                <p className="mb-4">Essential checklist for setting up your business in Dubai.</p>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Download PDF</button>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Financial Statement Template</h3>
                <p className="mb-4">Professional template for preparing financial statements.</p>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Download Excel</button>
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Tax Compliance Calendar</h3>
                <p className="mb-4">Important tax dates and deadlines for UAE businesses.</p>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
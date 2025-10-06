Project Requirements (Next.js + ShadCN + TailwindCSS)
1. General & Technical Requirements
Framework: Next.js (using App Router for modern features and performance).

Styling: TailwindCSS with ShadCN components for UI.

Theme: Professional color scheme (Blue: hsl(210, 40%, 96.1%), Grey: hsl(215.4, 16.3%, 46.9%), White: hsl(0, 0%, 100%)). Theme to be configured in tailwind.config.js.

Typography: Use @tailwindcss/typography plugin. Font: Inter (or similar clean sans-serif).

State Management: Use React's built-in state (useState, useContext) primarily. No complex state library is needed unless the scope expands.

Forms: React Hook Form with Zod for validation for all forms (Contact, Booking).

Responsiveness: Mobile-first approach, fully responsive across all standard breakpoints (sm, md, lg, xl).

SEO:

Static metadata for core pages (Home, About, Services).

Dynamic metadata for blog posts and service pages (e.g., "{Post Title} | THE BOARD MAN").

Implement next-sitemap for automatic sitemap generation.

Accessibility: WCAG 2.1 AA compliance. Ensure all ShadCN components have proper focus states, all images have alt text, and ARIA roles are used where necessary.

Assets:

Provided: Favicon, Company Logo (SVG/PNG).

Placeholders: Dummy images (using a service like picsum.photos or local placeholders) for team, services, and blog posts.

2. Company Information (Global Content)
Full Name: THE BOARD MAN ACCOUNTING AND AUDITORS L.L.C

Registration No: 1486369

Tagline: "Empowering Growth, Beyond Borders."

Address: 12A01, DAMAC XL Tower, Business Bay, Dubai

Phone: +971557477855, +9710523985587

Email: info@board-man.com

Social Media: Instagram (live link), Placeholders for YouTube, Facebook, X, WhatsApp.

Business Hours: Placeholder text (e.g., "Monday - Friday: 9:00 AM - 6:00 PM").

3. Page Structure & Content
Home
Hero Section: Full-width banner with a compelling background image. Includes tagline, a concise firm description, and a primary CTA button (<Button>) linking to the Contact Us page.

Key Services: A grid of <Card> components, each representing a main service category with an icon, title, and a short description.

About Us
Structure: Sections for Company History, Mission & Vision.

Team Section: A grid of team member profiles (<Avatar>, Name, Title). Clicking a profile can open a <Dialog> with a detailed bio.

Services (Parent & Child Pages)
Main Services Page: A grid layout listing all service categories.

Individual Service Pages (e.g., /services/audit-assurance):

Content: 1-2 paragraph description.

CTA: A clear note: "Documents & pricing available on request."

Audience Note: A small section stating: "Available for individuals & businesses."

Client Types
Dedicated sections or tabs (<Tabs>) describing engagement with Individuals, MSMEs, Startups, and Large Firms.

Appointment Booking
Form Fields: Name (<Input>), Email (<Input>), Service Type (<Select>), Preferred Date (<Calendar> within a <Popover>), Consultation Mode (<RadioGroup>: Online, Phone, In-Person).

User Flow:

User fills and submits the form.

On successful submission, display a Success Toast notification (<Toast>).

Form fields are cleared.

Backend: The form data is sent to a Next.js API route (/api/booking). This route validates the data and sends a confirmation email to both the admin and the user using Resend.

Client Resource Center
Layout: A filterable list of resources. Use <Badge> for tags (Service area, User level).

Content: Rendered from local Markdown/MDX files.

Search: A search bar (<Input>) to filter resources by title or tag.

Blog / News
Listing Page (/blog): A grid of blog post <Card> components, showing image, title, excerpt, and publication date.

Individual Post Page (/blog/[slug]):

Renders content from Markdown/MDX files.

MDX Schema: Each file should have frontmatter: title, date, author, excerpt, coverImage, tags.

Downloads
Layout: Use a <Table> component to list downloadable files with columns for Title, Category, and a Download button.

Security: Files will be stored in a non-public directory. An API route (/api/download/[filename]) will handle secure file serving by verifying user session/permissions if needed in the future (for now, direct but controlled access).

Contact Us
Map: Embed Google Maps showing the office location.

Form: Similar to the booking form. On submission, sends an email to info@board-man.com via an API route.

Info Display: Clearly list Address, Phone, Email, and Social Links.

Legal
Pages: Static pages for Privacy Policy and Terms of Service.

Cookie Consent: A simple, non-intrusive banner (<Alert>) with an "Accept" button.

4. Admin Panel (/admin)
Authentication: NextAuth.js with a credential provider (email/password).

Database: Vercel Postgres for storing user credentials and potentially booking data.

User Roles & Permissions:

Superuser (2): Full CRUD access to all content modules.

Staff (2): Can only access and manage Downloads, Blog, and Client Resources.

UI/UX:

Dashboard: A simple dashboard layout.

Content Management: Use a DataTable component for listing content (blog posts, FAQs).

Editing: Forms will use a Markdown editor (e.g., react-markdown) for content creation/editing.

5. Hosting & Deployment
Platform: Vercel.

Process: The project should be configured for CI/CD via a Git repository (e.g., GitHub). Environment variables must be used for all sensitive keys (API keys, database URLs).

6. Deliverables
Full Next.js project source code.

Sample .mdx content for blog posts and resources.

Placeholder PDFs for the Downloads section.

A README.md file with:

Clear setup instructions (npm install).

Instructions for running the development server (npm run dev).

A list of all required environment variables (.env.example).

Deployment instructions for Vercel.
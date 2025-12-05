import { Metadata } from 'next';

interface Props {
  params: { org: string; repo: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { org, repo } = params;
  
  return {
    title: `${org} - ${repo} - Giteria`,
    description: `Repository ${repo} from ${org} organization - Code, issues, pull requests and more`,
  };
}

export default async function RepositoryLayout({ params, children }: Props) {
  const { org, repo } = params;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header du repository */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href={`/${org}`} className="flex items-center text-gray-700 hover:text-gray-900">
                <span className="font-semibold">{org}</span>
                <span className="mx-2 text-gray-400">-</span>
                <span className="font-normal">{repo}</span>
              </a>
            </div>
            
            {/* Navigation des tabs */}
            <nav className="flex space-x-1">
              <a 
                href={`/${org}/${repo}`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Code
              </a>
              <a 
                href={`/${org}/${repo}/issues`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Issues
              </a>
              <a 
                href={`/${org}/${repo}/pulls`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Pull Requests
              </a>
              <a 
                href={`/${org}/${repo}/projects`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Projects
              </a>
              <a 
                href={`/${org}/${repo}/wiki`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Wiki
              </a>
              <a 
                href={`/${org}/${repo}/security`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Security
              </a>
              <a 
                href={`/${org}/${repo}/insights`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Insights
              </a>
              <a 
                href={`/${org}/${repo}/settings`}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Settings
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Contenu principal */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}